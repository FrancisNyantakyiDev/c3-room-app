// Top Bar
const topBarHTML = `
    <!-- Top Bar -->
      <div class="top-bar">
        <div>
          <img
            class="top-bar-logo"
            src="../assets/images/c3-room-logo-md.svg"
            alt="logo"
          />
        </div>
        <div>
          <div class="open-about-btn" id="open-about-btn">
            <i class="bi bi-info-circle-fill"></i> 
          </div>
        </div>
      </div>
  `;

// About Modal
const aboutModalHTML = `
    <div id="about-modal" class="modal">
      <div id ="modal-container" class="modal-container">

        <!-- Modal Header -->
        <div class="modal-header">
          <div><h4>About</h4></div>
          <div id = "close-about-btn"><i class="bi bi-x-circle"></i></div>
        </div>
     
        <!-- Modal Content -->
        <div class="about-modal-content">

          <!-- Brand Display -->
          <div class="brand">
            <img src="../assets/images/c3-room-logo-lg.svg" alt="logo" />

            <div class="brand-info">
              <h1>C3 ROOM</h1>
              <p>Connect · Collaborate · Construct</p>
            </div>
          </div>

          <!-- Description  -->
          <div class="description">
           <h4>An Open-Source Offline Collaboration Platform</h4>
            <p>C3 Room is a cross-platform
              desktop application designed to facilitate real-time collaboration
              over a local network without requiring an internet connection.
             </p>
          </div>          
         
          <!-- Author -->
          <div class="author-info">
            <h4>Author: Francis Nyantakyi</h4>
            <div class = "author-contact">
            <a href="mailto:francis.nyantakyi.dev@gmail.com">francis.nyantakyi.dev@gmail.com</a>                    
          </div>

          <!-- More Info -->
          <div class= "more-info">
          <h4>Version 1.0.0 </h4>

          <div>
          <p><a href="https://github.com/FrancisNyantakyiDev/c3-room-app/blob/main/LICENSE" target="_blank">License</a></p>
          <p><a href="https://github.com/FrancisNyantakyiDev/c3-room-app" target="_blank">Source Code</a></p>
          </div>

          </div>

          </div>
        </div>
      </div>
    </div>`;

document.body.insertAdjacentHTML("beforebegin", topBarHTML);
document.body.insertAdjacentHTML("beforeend", aboutModalHTML);

const aboutModal = document.getElementById("about-modal");
const openAboutBtn = document.getElementById("open-about-btn");
const closeAboutBtn = document.getElementById("close-about-btn");
const isClosing = document.getElementById("modal-container");

openAboutBtn.addEventListener("click", () => {
  aboutModal.classList.add("modal-active");
});

closeAboutBtn.addEventListener("click", () => {
  isClosing.classList.add("is-closing");

  setTimeout(() => {
    aboutModal.classList.remove("modal-active");
    isClosing.classList.remove("is-closing");
  }, 200);
});

// Home Button
const homeBtn = document.getElementById("home-btn");

homeBtn.addEventListener("click", () => {
  window.location.href = "select-room.html";
});
