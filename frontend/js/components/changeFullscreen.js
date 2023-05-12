import { isGameRunning } from "./input.js";

const toggleFullscreenBtn = document.querySelector("[data-fullscreen-toggle]");
const gameBoardContainer = document.querySelector("[data-game-board-container]");

function toggleFullscreen() {
  let orientation = screen.orientation.type;

  if(document.fullscreenElement && isGameRunning())
  {
    showMessageBox({
      text1: "You shouldn't do that while the game is running!",
      text2: "But you can press escape or device defaults for leaving the fullscreen!",
    });
  }
  else if(document.fullscreenElement && !isGameRunning()) {
    document.exitFullscreen();
    screen.orientation.unlock();
  }
  else {
    gameBoardContainer.requestFullscreen();
    
    if(
      screen.orientation.type === "portrait-primary"   ||
      screen.orientation.type === "landscape-secondary" 
      ) {
        screen.orientation.lock(orientation);
      }
  }
}

function showMessageBox(obj) {
  createMessageBox(obj);
}

function createMessageBox({ text1 = "", text2 = "" } = {}) {
  const messageBox = document.createElement("div");
  messageBox.className = "msg-box";

  const triangle = document.createElement("span");
  triangle.id = "triangle";

  messageBox.append(triangle);

  if(text1 !== "") {
    const msg1 = document.createElement("p");
    msg1.textContent = text1;
    messageBox.append(msg1);
  }

  if(text2 !== "") {
    const msg2 = document.createElement("p");
    msg2.textContent = text2;
    messageBox.append(msg2);
  }

  gameBoardContainer.append(messageBox);

  removeMessageBox(messageBox);
}

function removeMessageBox(msgBox) {
  if(!msgBox) return;

  setTimeout(() => {
    msgBox.remove();
  }, 2000);
}

function toggleColorOfFullscreenBtn() {
  if(isGameRunning() && document.fullscreenElement) {
    toggleFullscreenBtn.classList.add("game-is-running");
    return;
  }

  toggleFullscreenBtn.classList.remove("game-is-running")
}

export function draw() {
  toggleColorOfFullscreenBtn();
}


toggleFullscreenBtn.addEventListener("pointerup", toggleFullscreen);