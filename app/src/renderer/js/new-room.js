const activeRoomModal = document.getElementById("active-room-modal");
const startbtn = document.getElementById("start-btn");
const settingsContainer = document.getElementById("settings-container");
const showSettingsbtn = document.getElementById("show-settings-btn");
const hideSettingsbtn = document.getElementById("hide-settings-btn");
const exitRoom = document.getElementById("exit-room");

// Active Room Modal
startbtn.addEventListener("click", () => {
  activeRoomModal.classList.add("modal-active");
});

// Settings
// Show Settings
showSettingsbtn.addEventListener("click", () => {
  settingsContainer.classList.add("show-settings");
  showSettingsbtn.style.display = "none";
  hideSettingsbtn.style.display = "flex";
});

// Hide Settings
hideSettingsbtn.addEventListener("click", () => {
  settingsContainer.classList.add("hide-settings");

  setTimeout(() => {
    settingsContainer.classList.remove("show-settings");
    settingsContainer.classList.remove("hide-settings");
    hideSettingsbtn.style.display = "none";
    showSettingsbtn.style.display = "flex";
  }, 200);
});

// Active Room Options
exitRoom.addEventListener("click", () => {
  window.location.href = "select-room.html";
});
