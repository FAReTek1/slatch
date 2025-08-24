import * as vscode from 'vscode';



export class Item extends vscode.TreeItem {
	children: Item[] | undefined;
	parent?: Item;
	operation?: (ti: Item) => void;

	constructor(label: string, children_or_operation?: Item[] | ((ti: Item) => void)) {
		let children: Item[] | undefined;
		let operation: ((ti: Item) => void) | undefined;

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
		let node: Item = this;

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

export class DataProvider implements vscode.TreeDataProvider<Item> {
	onDidChangeTreeData?: vscode.Event<Item | null | undefined> | undefined;

	data: Item[];

	constructor(context: vscode.ExtensionContext, data: Item[]) {
		this.data = data;
	}

	getTreeItem(element: Item): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}

	getChildren(element?: Item | undefined): vscode.ProviderResult<Item[]> {
		if (element === undefined) {
			return this.data;
		}
		return element.children;
	}
}