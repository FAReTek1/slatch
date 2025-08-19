import * as vscode from 'vscode';

class TreeItem extends vscode.TreeItem {
	children: TreeItem[] | undefined;

	constructor(label: string, children?: TreeItem[]) {
		// if you add ' ---v' to the end of the label, it will be expanded by default. This will be trimmed from the label in all cases
		// The arrow will have no effect if there are no children anyway
		const arrow = " ---v";
		const expanded = label.endsWith(" ---v");

		if (expanded) {
			label = label.slice(0, -arrow.length);
		}

		let cstate = vscode.TreeItemCollapsibleState.None;
		if (children !== undefined) {
			cstate = expanded? vscode.TreeItemCollapsibleState.Expanded : 
							    vscode.TreeItemCollapsibleState.Collapsed;
		}

		super(label, cstate);

		this.children = children;
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
					new TreeItem('Hello james ---v')]),
			new TreeItem('BMW', [
				new TreeItem('320'), 
				new TreeItem('X3'), 
				new TreeItem('X5')])
		])];
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
	vscode.window.registerTreeDataProvider('exampleView', new TreeDataProvider());
}