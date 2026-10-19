const { startRoomServer, stopRoomServer } = require("./server");

async function main() {
  try {
    const room = await startRoomServer();

    console.log("\nC3 Room development server started!");
    console.log(`Room ID: ${room.roomId}`);
    console.log(`Port: ${room.port}`);
    console.log("Access URLs:");

    room.urls.forEach((url) => console.log(`  ${url}`));
    console.log("\nPress Ctrl+C to stop the server.\n");
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exitCode = 1;
  }
}

main();

async function shutdown() {
  try {
    await stopRoomServer();
    process.exit(0);
  } catch (error) {
    console.error("Failed to stop server:", error);
    process.exit(1);
  }
}

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
