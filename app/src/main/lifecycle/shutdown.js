const { app } = require("electron");

// Ensure the server stops before Electron exits.
function shutdownHandler({ stopRoomServer }) {
  let allowAppQuit = false;
  let cleanupStarted = false;

  app.on("before-quit", (event) => {
    if (allowAppQuit) {
      return;
    }

    event.preventDefault();

    if (cleanupStarted) {
      return;
    }

    cleanupStarted = true;

    stopRoomServer()
      .catch((error) => {
        console.error("Failed to stop C3 Room server:", error);
      })
      .finally(() => {
        allowAppQuit = true;
        app.quit();
      });
  });
}

module.exports = {
  shutdownHandler,
};
