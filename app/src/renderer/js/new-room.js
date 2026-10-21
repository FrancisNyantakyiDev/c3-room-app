const activeRoomModal = document.getElementById("active-room-modal");
const activeRoomContainer = document.getElementById("active-room-container");
const startBtn = document.getElementById("start-btn");

const settingsContainer = document.getElementById("settings-container");
const showSettingsbtn = document.getElementById("show-settings-btn");
const hideSettingsbtn = document.getElementById("hide-settings-btn");

const confirmQuitModal = document.getElementById("confirm-quit-modal");
const openRoomBtn = document.getElementById("open-room-btn");
const quitRoomBtn = document.getElementById("quit-room-btn");

const cancelQuitBtn = document.getElementById("cancel-quit-btn");
const confirmQuitBtn = document.getElementById("confirm-quit-btn");

const ipAddress = document.getElementById("ip-address");
const roomId = document.getElementById("room-id");
const qrContainer = document.getElementById("qr-code");

const chatSetting = document.getElementById("chat");
const presentSetting = document.getElementById("present");
const fileUploadSetings = document.getElementById("file-upload");
const maxFileSizeSetting = document.getElementById("file-size");

// Show settings
showSettingsbtn.addEventListener("click", () => {
  settingsContainer.classList.add("show-settings");
  showSettingsbtn.style.display = "none";
  hideSettingsbtn.style.display = "flex";
});

// Hide settings
hideSettingsbtn.addEventListener("click", () => {
  settingsContainer.classList.add("hide-settings");

  setTimeout(() => {
    settingsContainer.classList.remove("show-settings");
    settingsContainer.classList.remove("hide-settings");

    hideSettingsbtn.style.display = "none";
    showSettingsbtn.style.display = "flex";
  }, 200);
});

// Collect and validate room settings
function getRoomSettings() {
  const chat = chatSetting.value;
  const present = presentSetting.value;
  const fileUpload = fileUploadSetings.value;
  const maxFileSize = maxFileSizeSetting.value;

  return {
    chat,
    present,
    fileUpload,
    maxFileSize,
  };
}

// Generate the room QR code
function generateRoomQRCode(url, id) {
  const joinUrl = new URL(url);
  joinUrl.searchParams.set("roomId", id);

  qrContainer.innerHTML = "";

  // Generate a new QR code
  new QRCode(qrContainer, {
    text: joinUrl.toString(),
    width: 150,
    height: 150,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.M,
  });
}

// Start the room server
startBtn.addEventListener("click", async () => {
  try {
    const roomSettings = getRoomSettings();

    const room = await window.c3room.startRoom(roomSettings);

    ipAddress.textContent = room.urls.join(" | ");
    roomId.textContent = room.roomId;

    generateRoomQRCode(room.urls[0], room.roomId);

    activeRoomModal.classList.add("modal-active");
  } catch (error) {
    alert(`Could not start the room server: ${error.message}`);
  }
});

// Show Comfirm Quit Modal
quitRoomBtn.addEventListener("click", () => {
  confirmQuitModal.classList.add("modal-active");
});

// Hide Confirm Quit Modal
cancelQuitBtn.addEventListener("click", () => {
  confirmQuitModal.classList.remove("modal-active");
});

// Stop the server and exit the room.
confirmQuitBtn.addEventListener("click", async () => {
  try {
    await window.c3room.exitRoom();
  } catch (error) {
    alert(`Could not stop the room server: ${error.message}`);
  }

  confirmQuitModal.classList.remove("modal-active");
  activeRoomContainer.classList.add("is-closing");

  setTimeout(() => {
    activeRoomContainer.classList.remove("is-closing");
    activeRoomModal.classList.remove("modal-active");
  }, 400);
});
