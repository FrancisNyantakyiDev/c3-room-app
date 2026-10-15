const newRoomBtn = document.getElementById("new-room-btn");
const joinRoomBtn = document.getElementById("join-room-btn");

newRoomBtn.addEventListener("click", () => {
  window.location.href = "new-room.html";
});

joinRoomBtn.addEventListener("click", () => {
  window.location.href = "join-room.html";
});
