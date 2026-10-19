// Native Imports
const { app, Menu, BrowserWindow } = require("electron");

// Main Imports
const { createWindow } = require("./lifecycle/main-window");
const { roomhandlers } = require("./ipc/room-handlers");
const { shutdownHandler } = require("./lifecycle/shutdown");

// Server Imports
const { startRoomServer, stopRoomServer } = require("../server/server");

// Windows installer events.
if (require("electron-squirrel-startup")) {
  app.quit();
}

// Remove default application menu (File/Edit/View etc.)
Menu.setApplicationMenu(null);

// Initialize IPC Handlers
roomhandlers({ startRoomServer, stopRoomServer });

// Initialize Shutdown Handler
shutdownHandler({ stopRoomServer });

// App Initialize
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
