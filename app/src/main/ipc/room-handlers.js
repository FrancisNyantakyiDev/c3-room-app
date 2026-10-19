const { ipcMain } = require("electron");

// Secure bridge between app UI and server
function roomhandlers({ startRoomServer, stopRoomServer }) {
  ipcMain.handle("c3room:start-room", async (_event, settings) => {
    return await startRoomServer(settings);
  });

  ipcMain.handle("c3room:exit-room", async () => {
    return await stopRoomServer();
  });
}

module.exports = {
  roomhandlers,
};
