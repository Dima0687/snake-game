import { isGameRunning } from "./input.js";
import { showMessageBox } from './messageBox.js';

const toggleFullscreenBtn = document.querySelector("[data-fullscreen-toggle]");
const gameBoardContainer = document.querySelector("[data-game-board-container]");


export function toggleFullscreen( { clickOnStartBtn = false } = {} ) {
  let orientation = screen.orientation.type;

  if( isFullscreenAndGameIsRunning() )
  {
    showMessageBox(
      gameBoardContainer,
      "You shouldn't do that while the game is running!",
      "Anyway you can press escape or device defaults for leaving the fullscreen!"
    );

    return 
  }
  else if( isFullscreenAndGameIsNotRunning() ) {  
    if(clickOnStartBtn) return;  
    
    document.exitFullscreen();
    screen.orientation.unlock();
  }
  else {

    gameBoardContainer.requestFullscreen();
    
    if( isMobile(orientation) ) {
      screen.orientation.lock(orientation);
    }
  }
}


function toggleColorOfFullscreenBtn() {

  if( isFullscreenAndGameIsRunning() ) {
    // toggle fullscreen button is "color"
    toggleFullscreenBtn.classList.add("game-is-running");
    return;
  }
  // toggle fullscreen button is standard "color"
  toggleFullscreenBtn.classList.remove("game-is-running");
}

export function toggleFullscreenBtnClass() {
  if( isNotInFullscreen() ) {
    // compress icon is display: initial;
    toggleFullscreenBtn.classList.remove("fullscreen");
    return;
  }
  // expand icon is display: initial;
  toggleFullscreenBtn.classList.add("fullscreen");
}

export function draw() {
  toggleColorOfFullscreenBtn();
  toggleFullscreenBtnClass();
}


function isFullscreenAndGameIsRunning() {
  return (
    (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement ||
      document.webkitFullscreenElement
    ) && 
    isGameRunning()
  )
}

function isFullscreenAndGameIsNotRunning() {
  return (
    (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement ||
      document.webkitFullscreenElement
    ) && 
    !isGameRunning()
  )
}

function isNotInFullscreen() {
  return (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.msFullscreenElement &&
    !document.webkitFullscreenElement
  )
}

function isMobile(orientation) {
  return (
    orientation === "portrait-primary"   ||
    orientation === "landscape-secondary" 
  )
}

toggleFullscreenBtn.addEventListener("pointerup", toggleFullscreen);
toggleFullscreenBtn.addEventListener("fullscreenchange", toggleFullscreenBtnClass);