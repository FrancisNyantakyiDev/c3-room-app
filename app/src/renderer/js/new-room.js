const activeRoomModal = document.getElementById("active-room-modal");
const startbtn = document.getElementById("start-btn");
const settingsContainer = document.getElementById("settings-container");
const showSettingsbtn = document.getElementById("show-settings-btn");
const hideSettingsbtn = document.getElementById("hide-settings-btn");
const exitRoom = document.getElementById("exit-room");

const ipAddress = document.getElementById("ip-address");
const roomId = document.getElementById("room-id");

let roomActive = false;

// Start the room server.
startbtn.addEventListener("click", async () => {
  if (roomActive) {
    return;
  }

  startbtn.disabled = true;
  startbtn.textContent = "Starting...";

  try {
    // Add validated room settings here when implemented.
    const roomSettings = {};

    const room = await window.c3room.startRoom(roomSettings);

    ipAddress.textContent = room.urls.join(" | ");
    roomId.textContent = room.roomId;

    roomActive = true;
    activeRoomModal.classList.add("modal-active");
  } catch (error) {
    console.error("Failed to start room:", error);

    alert(`Could not start the room server: ${error.message}`);
  } finally {
    startbtn.disabled = false;
    startbtn.textContent = "Start";
  }
});

// Show settings.
showSettingsbtn.addEventListener("click", () => {
  settingsContainer.classList.add("show-settings");
  showSettingsbtn.style.display = "none";
  hideSettingsbtn.style.display = "flex";
});

// Hide settings.
hideSettingsbtn.addEventListener("click", () => {
  settingsContainer.classList.add("hide-settings");

  setTimeout(() => {
    settingsContainer.classList.remove("show-settings");
    settingsContainer.classList.remove("hide-settings");

    hideSettingsbtn.style.display = "none";
    showSettingsbtn.style.display = "flex";
  }, 200);
});

// Stop the server and exit the room.
exitRoom.addEventListener("click", async () => {
  exitRoom.disabled = true;

  try {
    await window.c3room.exitRoom();

    roomActive = false;
    activeRoomModal.classList.remove("modal-active");

    window.location.href = "select-room.html";
  } catch (error) {
    console.error("Failed to stop room:", error);

    alert(`Could not stop the room server: ${error.message}`);
  } finally {
    exitRoom.disabled = false;
  }
});
