import { isGameRunning } from "./input.js";

const toggleFullscreenBtn = document.querySelector("[data-fullscreen-toggle]");
const gameBoardContainer = document.querySelector("[data-game-board-container]");
const TIME_TILL_MSG_REMOVE_IN_MS = 5000;

function toggleFullscreen() {
  let orientation = screen.orientation.type;

  if(document.fullscreenElement && isGameRunning())
  {
    showMessageBox(
      "You shouldn't do that while the game is running!",
      "Anyway you can press escape or device defaults for leaving the fullscreen!"
    );
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

function showMessageBox(...messages) {
  createMessageBox(messages);
}

function createMessageBox(messages) {
  const messageBox = document.createElement("div");
  messageBox.className = "msg-box";

  const triangle = document.createElement("span");
  triangle.id = "triangle";

  if(!messages.length) return;
  messages = messages.map((msg) => {
    if(msg === "") return;

    const msgElem = document.createElement("p");
    msgElem.textContent = msg;
    
    return msgElem;
  });

  messageBox.append(triangle, ...messages);

  gameBoardContainer.append(messageBox);

  removeMessageBox(messageBox);
}

function removeMessageBox(msgBox) {
  if(!msgBox) return;

  setTimeout(() => {
    msgBox.remove();
  }, TIME_TILL_MSG_REMOVE_IN_MS );
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