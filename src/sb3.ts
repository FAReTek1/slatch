// sb3 runner
// a lot of code based on this, but now using tw scaffolding:
// https://github.com/DavidBuchanan314/scratch-vscode/blob/main/src/scratchViewer.ts

import * as vscode from 'vscode';

/**
 * Tracks all webviews.
 * https://github.com/microsoft/vscode-extension-samples/blob/main/custom-editor-sample/src/pawDrawEditor.ts
 */
class WebviewCollection {
	private readonly _webviews = new Set<{
		readonly resource: string;
		readonly webviewPanel: vscode.WebviewPanel;
	}>();

	/**
	 * Get all known webviews for a given uri.
	 */
	public *get(uri: vscode.Uri): Iterable<vscode.WebviewPanel> {
		const key = uri.toString();
		for (const entry of this._webviews) {
			if (entry.resource === key) {
				yield entry.webviewPanel;
			}
		}
	}

	/**
	 * Add a new webview to the collection.
	 */
	public add(uri: vscode.Uri, webviewPanel: vscode.WebviewPanel) {
		const entry = { resource: uri.toString(), webviewPanel };
		this._webviews.add(entry);

		webviewPanel.onDidDispose(() => {
			this._webviews.delete(entry);
		});
	}
}



export class Provider implements vscode.CustomReadonlyEditorProvider {
	private static readonly viewType = 'slatch.sb3';
	private readonly webviews = new WebviewCollection();

	public static register(context: vscode.ExtensionContext): vscode.Disposable {
		return vscode.window.registerCustomEditorProvider(
			Provider.viewType,
			new Provider(context),
			{
				// For this demo extension, we enable `retainContextWhenHidden` which keeps the
				// webview alive even when it is not visible. You should avoid using this setting
				// unless is absolutely required as it does have memory overhead.
				webviewOptions: {
					retainContextWhenHidden: true,
				},
				supportsMultipleEditorsPerDocument: false,
			});
	}

	constructor(
		private readonly _context: vscode.ExtensionContext
	) { }

	async openCustomDocument(uri: vscode.Uri) {
		return { uri, dispose: () => { } };
	}


	async resolveCustomEditor(
		document: vscode.CustomDocument,
		webviewPanel: vscode.WebviewPanel,
		_token: vscode.CancellationToken
	): Promise<void> {
		const webview = webviewPanel.webview;

		// Add the webview to our internal set of active webviews
		this.webviews.add(document.uri, webviewPanel);

		// Setup initial content for the webview
		webviewPanel.webview.options = {
			enableScripts: true,
		};

		async function postData(name: string, data: any) {
			return await webview.postMessage({ name, data });
		}

		webview.html = /*html*/`<h1>Loading</h1>`;

		// const filedata = await vscode.workspace.fs.readFile(document.uri);

		const greenFlagUri = webview.asWebviewUri(vscode.Uri.joinPath(
			this._context.extensionUri, 'media', 'greenFlag.svg'
		));
		const stopUri = webview.asWebviewUri(vscode.Uri.joinPath(
			this._context.extensionUri, 'media', 'stop.svg'
		));
		const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(
			this._context.extensionUri, 'media', 'main.css'
		));
		const scaffoldingUri = webview.asWebviewUri(vscode.Uri.joinPath(
			this._context.extensionUri, 'js', 'scaffolding-with-music.js'
		));
		webview.html = /*html*/`
		<!DOCTYPE html>
		<html>
			<head>
				<link href="${styleMainUri}" rel="stylesheet" />
			</head>
			<div id=project-container>
				<div class="controls">
        			<img src="${greenFlagUri}" class="green-flag" title="Go">
        			<img src="${stopUri}" class="stop" title="Stop">
				</div>
				<div id="project"></div>
			</div>
			<script>
    			const project = document.querySelector("#project");
    			const container = document.querySelector("#project-container");

    			let width = 480;
    			let height = 360;

    			const maxWidth = container.clientWidth;
    			const maxHeight = container.clientHeight;

				const wRatio = maxWidth / width;
				const hRatio = maxHeight / height;

				const scaleAmt = Math.min(wRatio, hRatio);
				width *= scaleAmt;
				height *= scaleAmt;

				project.style.width = width + "px";
				project.style.height = height + "px";
			</script>
			<script src="${scaffoldingUri}"></script>
			<script>
				console.log("Setting up scaffolding");

				const vscode = acquireVsCodeApi();
				console.log("slatch code vsc api");

    			// Then scaffolding is exported as a global variable
    			const scaffolding = new Scaffolding.Scaffolding();
				console.log("inited scaffolding");

				scaffolding.width = 480;
				scaffolding.height = 360;
				scaffolding.resizeMode = 'preserve-ratio'; // or 'dynamic-resize' or 'stretch' or 'preserve-ratio'
				scaffolding.editableLists = false;
				scaffolding.shouldConnectPeripherals = true;
				scaffolding.usePackagedRuntime = false;

				console.log("Setup scaffolding")

				// const project = document.getElementById('project');
				const greenFlag = document.querySelector('.green-flag');
				const stop = document.querySelector('.stop');
			
				scaffolding.setup();
				scaffolding.appendTo(project);

				console.log("ready almost");

				async function init(data) {
					console.log("got init");
					await scaffolding.loadProject(data);
					console.log("inited");

					greenFlag.onclick = async (e) => {
						scaffolding.greenFlag();
					}

					stop.onclick = async (e) => {
						scaffolding.stopAll();
					}
				}

				window.addEventListener("message", async (event) => {
					const message = event.data;
					const name = message.name;
					const data = message.data;
					
					switch (name) {
						case "init":
							init(data);
							break;
					}
				});
				console.log("slatch ready");
				vscode.postMessage("ready");  // this is used by the extension to know when to send the project binary data
			</script>
        </html>
		`;

		// Wait for the webview to be properly ready before we init
		webview.onDidReceiveMessage(async e => {
			console.log(`Vscode got message ${e}`);

			switch (e) {
				case "ready":
					console.log("Sending init");
					await postData("init", new Uint8Array(await vscode.workspace.fs.readFile(document.uri)));
					break;
			}
		});
	}
}
