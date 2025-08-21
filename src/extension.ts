import * as vscode from 'vscode';
import * as sa from './sa/src/index';
import {generateBscHTML} from './baseSiteComponentView';

import jsdom from 'jsdom';

class TreeItem extends vscode.TreeItem {
	children: TreeItem[] | undefined;
	parent?: TreeItem;
	operation?: (ti: TreeItem) => void;

	constructor(label: string, children_or_operation?: TreeItem[] | ((ti: TreeItem) => void)) {
		let children: TreeItem[] | undefined;
		let operation: ((ti: TreeItem) => void) | undefined;

		if (children_or_operation instanceof Array) {
			children = children_or_operation;
			operation = undefined;
		} else {
			children = undefined;
			operation = children_or_operation;
		}

		// if you add ' ---v' to the end of the label, it will be expanded by default. This will be trimmed from the label in all cases
		// The arrow will have no effect if there are no children anyway
		const arrow = " ---v";
		const expanded = label.endsWith(" ---v");

		if (expanded) {
			label = label.slice(0, -arrow.length);
		}

		let cstate = vscode.TreeItemCollapsibleState.None;
		if (children !== undefined) {
			cstate = expanded ? vscode.TreeItemCollapsibleState.Expanded :
				vscode.TreeItemCollapsibleState.Collapsed;
		}

		super(label, cstate);

		////////////////////////////////////////

		children?.forEach((child) => {
			child.parent = this;
		});

		////////////////////////////////////////
		this.children = children;
		this.operation = operation;
		this.parent = undefined; // This is set by parent nodes, when they are initialised

		////////////////////////////////////////
		// registers a hidden command to run when this node is clicked. This command calls this.onClick()
		this.command = {
			command: "slatch.Tree.selectNode",
			title: "Select node",
			arguments: [this]
		};
	}

	get xpath_arr() {
		// Go through parents until u get a toplevel node. Give the path as an array
		const path = [];
		let node: TreeItem = this;

		while (node.parent !== undefined) {
			path.push(node.label);
			node = node.parent;
		}
		path.push(node.label);

		return path.reverse();
	}

	get xpath() {
		return this.xpath_arr.join('/');
	}

	onClick() {
		// console.log(`Slatch.TreeItem: selected ${this.label}, path=${this.xpath}`);
		this.operation && this.operation(this);
	}
}

class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
	onDidChangeTreeData?: vscode.Event<TreeItem | null | undefined> | undefined;

	data: TreeItem[];

	constructor(context: vscode.ExtensionContext) {
		this.data = [
			new TreeItem('Home ---v', [
				new TreeItem('Feed', (ti) => {
					vscode.window.showInformationMessage('Loading feed...');

					const panel = vscode.window.createWebviewPanel(
						'slatchFeed',
						'Slatch: Feed',
						vscode.ViewColumn.One,
						{}
					);
					panel.webview.html = `
						<!DOCTYPE html>
						<h1>Featured projects</h1>
						<div id="community_featured_projects"></div>
						<h1>Featured studios</h1>
						<div id="community_featured_studios"></div>
						<h1>Scratch design studio</h1>
						<div id="scratch_design_studio"></div>
						<h1>Curated projects</h1>
						<div id="curator_top_projects"></div>
						<h1>Top loved</h1>
						<div id="community_most_loved_projects"></div>
						<h1>Top remixed</h1>
						<div id="community_most_remixed_projects"></div>
						<h1>New</h1>
						<div id="community_newest_projects"></div>
					`;

					sa.featured((data) => {
						const dom = new jsdom.JSDOM(panel.webview.html); 

						function gendom(id: string) {
							const div = dom.window.document.querySelector(`div[id=${id}]`);
							if (div) {
								div.innerHTML = generateBscHTML(Object(data)[id], 'width="120" height="90"');
							}
						}

						gendom('community_newest_projects');
						gendom('community_most_remixed_projects');
						gendom('scratch_design_studio');
						gendom('curator_top_projects');
						gendom('community_most_loved_projects');
						gendom('community_featured_projects');
						gendom('community_featured_studios');

						panel.webview.html = dom.serialize();
					});

					
				}),
				new TreeItem('Featured Projects'),
				new TreeItem('Featured Studios'),
				new TreeItem('Turbowarp Featured Projects'),
				new TreeItem('Scratch Design Studio'),
				new TreeItem('Projects Loved by Scratchers I\'m Following'),
				new TreeItem('Top Remixed'),
				new TreeItem('Top Loved'),
			])
		];
	}

	getTreeItem(element: TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}

	getChildren(element?: TreeItem | undefined): vscode.ProviderResult<TreeItem[]> {
		if (element === undefined) {
			return this.data;
		}
		return element.children;
	}
}

export function activate(context: vscode.ExtensionContext) {
	vscode.commands.registerCommand("slatch.Tree.selectNode", (arg: TreeItem) => { arg.onClick(); });

	vscode.window.registerTreeDataProvider('slatch.commandView', new TreeDataProvider(context));
}
