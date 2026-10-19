const express = require("express");
const http = require("node:http");
const path = require("node:path");

const { getLanAddresses } = require("./config/config");
const { prepareRoomSettings } = require("./config/room-settings");

const PUBLIC_DIRECTORY = path.join(__dirname, "public");
const PUBLIC_INDEX = path.join(PUBLIC_DIRECTORY, "index.html");

const START_PORT = 8000;
const END_PORT = 8999;

let httpServer = null;
let activeRoom = null;
let startPromise = null;

function listenOnAvailablePort(server) {
  return new Promise((resolve, reject) => {
    let port = START_PORT;

    function tryNextPort() {
      if (port > END_PORT) {
        reject(
          new Error(
            `No available port found between ${START_PORT} and ${END_PORT}.`,
          ),
        );
        return;
      }

      const currentPort = port++;

      const onListening = () => {
        server.removeListener("error", onError);
        resolve(currentPort);
      };

      const onError = (error) => {
        server.removeListener("listening", onListening);

        if (error.code === "EADDRINUSE") {
          tryNextPort();
          return;
        }

        reject(error);
      };

      server.once("listening", onListening);
      server.once("error", onError);
      server.listen(currentPort, "0.0.0.0");
    }

    tryNextPort();
  });
}

async function startRoomServer(input = {}) {
  if (activeRoom) {
    return activeRoom;
  }

  if (startPromise) {
    return startPromise;
  }

  startPromise = (async () => {
    const room = prepareRoomSettings(input);
    const serverApp = express();

    serverApp.get("/api/health", (_request, response) => {
      response.json({
        status: "running",
        roomId: room.roomId,
      });
    });

    serverApp.use(express.static(PUBLIC_DIRECTORY));

    serverApp.get("/", (_request, response) => {
      response.sendFile(PUBLIC_INDEX);
    });

    const server = http.createServer(serverApp);
    httpServer = server;

    try {
      const port = await listenOnAvailablePort(server);
      const addresses = getLanAddresses();

      const urls = addresses.map((address) => `http://${address}:${port}`);

      if (urls.length === 0) {
        urls.push(`http://127.0.0.1:${port}`);
      }

      activeRoom = {
        roomId: room.roomId,
        port,
        urls,
        primaryUrl: urls[0],
      };

      return activeRoom;
    } catch (error) {
      httpServer = null;
      throw error;
    }
  })();

  try {
    return await startPromise;
  } finally {
    startPromise = null;
  }
}

async function stopRoomServer() {
  if (startPromise) {
    try {
      await startPromise;
    } catch {
      return { stopped: true };
    }
  }

  const server = httpServer;

  if (!server) {
    activeRoom = null;
    return { stopped: true };
  }

  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error && error.code !== "ERR_SERVER_NOT_RUNNING") {
        reject(error);
      } else {
        resolve();
      }
    });

    // Close active HTTP connections so shutdown does not wait
    // indefinitely for connected browsers.
    if (typeof server.closeAllConnections === "function") {
      server.closeAllConnections();
    }
  });

  if (httpServer === server) {
    httpServer = null;
    activeRoom = null;
  }

  return { stopped: true };
}

module.exports = {
  startRoomServer,
  stopRoomServer,
};
