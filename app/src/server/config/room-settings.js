const { createRoomId } = require("./config");

function prepareRoomSettings(input = {}) {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("Room settings must be an object.");
  }

  return {
    roomId: createRoomId(),

    // Add room settings and validation here later.
    options: { ...input },
  };
}

module.exports = {
  prepareRoomSettings,
};
