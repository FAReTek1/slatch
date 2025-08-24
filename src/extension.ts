import * as vscode from 'vscode';
import * as tree from './tree';
import * as sa from './sa/src/index';
import * as bcv from './baseSiteComponentView';

import jsdom from 'jsdom';
import path from 'path';

export function activate(context: vscode.ExtensionContext) {
	vscode.commands.registerCommand("slatch.Tree.selectNode", (arg: tree.Item) => { arg.onClick(); });

	vscode.window.registerTreeDataProvider('slatch.commandView', new tree.DataProvider(context, [
			new tree.Item('Home ---v', [
				new tree.Item('Feed', (ti) => {
					vscode.window.showInformationMessage('Loading feed...');

					const panel = vscode.window.createWebviewPanel(
						'slatchFeed',
						'Slatch: Feed',
						vscode.ViewColumn.One,
						{}
					);
					panel.webview.html = bcv.getSiteFile('feed.html');
					let dom = new jsdom.JSDOM(panel.webview.html);
					dom.window.document.querySelectorAll('.preprocess-include').forEach((elem) => {
							console.log("yess");
							const src = elem.getAttribute('src');
							if (src) {
								elem.textContent = bcv.getSiteFile(src);
							}
						});
					
					panel.webview.html = dom.serialize();

					console.log(panel.webview.html);

					sa.getFeatured().then((data) => {
						dom = new jsdom.JSDOM(panel.webview.html);						

						function gendom(id: string) {
							const div = dom.window.document.querySelector(`div[id=${id}]`);
							if (div) {
								div.innerHTML = bcv.generateBscHTML(Object(data)[id], '120', 'height="90"');
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
				new tree.Item('Featured Projects'),
				new tree.Item('Featured Studios'),
				new tree.Item('Turbowarp Featured Projects'),
				new tree.Item('Scratch Design Studio'),
				new tree.Item('Projects Loved by Scratchers I\'m Following'),
				new tree.Item('Top Remixed'),
				new tree.Item('Top Loved'),
			])
		]));
}
