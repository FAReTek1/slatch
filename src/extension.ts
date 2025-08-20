import * as vscode from 'vscode';
import * as sa from "./sa/src/index";

class TreeItem extends vscode.TreeItem {
	children: TreeItem[] | undefined;
	parent?: TreeItem;
	opcode?: string;

	constructor(label: string, children_or_opcode?: TreeItem[] | string) {
		let children: TreeItem[] | undefined;
		let opcode: string | undefined;

		if (children_or_opcode instanceof Array) {
			children = children_or_opcode;
			opcode = undefined;
		} else {
			children = undefined;
			opcode = children_or_opcode;
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
		this.opcode = opcode;
		this.parent = undefined; // This is set by parent nodes, when they are initialised

		////////////////////////////////////////
		// registers a hidden command to run when this node is clicked. This command calls this.onClick()
		this.command = {
			command: "slatch.Tree.selectNode",
			title: "Select node",
			arguments: [this]
		};
	}

	getXpath() {
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

	onClick() {
		console.log(`Slatch.TreeItem: selected ${this.label}, path=${this.getXpath().join('/')}`);
		console.log(`You just ran ${this.opcode}`);
	}
}

class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
	onDidChangeTreeData?: vscode.Event<TreeItem | null | undefined> | undefined;

	data: TreeItem[];

	constructor() {
		this.data = [
			new TreeItem('cars ---v', [
				new TreeItem('Ford ---v', [
					new TreeItem('Fiesta'),
					new TreeItem('Focus'),
					new TreeItem('Mustang'),
					new TreeItem('Hello james ---v')
				]),
				new TreeItem('BMW', [
					new TreeItem('320'),
					new TreeItem('X3'),
					new TreeItem('X5')
				])
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

	vscode.window.registerTreeDataProvider('slatch.commandView', new TreeDataProvider());
}
