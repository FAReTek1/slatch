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

console.log("Setup scaffolding");

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
    scaffolding.relayout();

    greenFlag.onclick = async (e) => {
        scaffolding.greenFlag();
    };

    stop.onclick = async (e) => {
        scaffolding.stopAll();
    };
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