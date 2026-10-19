const os = require("node:os");
const { randomInt } = require("node:crypto");

function getLanAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const networkInterfaces of Object.values(interfaces)) {
    for (const network of networkInterfaces || []) {
      const isIPv4 = network.family === "IPv4" || network.family === 4;

      if (isIPv4 && !network.internal && !addresses.includes(network.address)) {
        addresses.push(network.address);
      }
    }
  }

  return addresses;
}

function createRoomId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const firstLetter = letters[randomInt(letters.length)];
  const secondLetter = letters[randomInt(letters.length)];
  const firstDigit = randomInt(10);
  const secondDigit = randomInt(10);

  return `${firstLetter}${secondLetter}${firstDigit}${secondDigit}`;
}

module.exports = {
  getLanAddresses,
  createRoomId,
};
