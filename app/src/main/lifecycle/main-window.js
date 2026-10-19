const { BrowserWindow, dialog } = require("electron");
const path = require("node:path");

// App Window
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 700,
    height: 500,

    resizable: false,
    maximizable: false,
    fullscreenable: false,

    backgroundColor: "#F5F5F5",

    webPreferences: {
      preload: path.join(__dirname, "..", "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  // App Quit Confimation
  let allowClose = false;

  mainWindow.on("close", (event) => {
    if (allowClose) {
      return;
    }

    event.preventDefault();

    const response = dialog.showMessageBoxSync(mainWindow, {
      type: "question",
      title: "Quit C3 Room",
      message: "Are you sure you want to quit",
      detail: "Any activity will be interrupted",
      buttons: ["Cancel", "Quit"],
      defaultId: 0,
      cancelId: 0,
      noLink: true,
    });

    if (response === 1) {
      allowClose = true;
      mainWindow.close();
    }
  });

  mainWindow.loadFile(path.join(__dirname, "../..", "renderer", "index.html"));

  return mainWindow;
}

module.exports = {
  createWindow,
};
