const { app, BrowserWindow, Menu } = require("electron");
const path = require("node:path");

if (require("electron-squirrel-startup")) {
  app.quit();
}

Menu.setApplicationMenu(null);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 700,
    height: 500,

    resizable: false,
    maximizable: false,
    fullscreenable: false,

    backgroundColor: "#F5F5F5",

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "renderer", "index.html"));
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
