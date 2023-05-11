import { showStartGUI } from './startGUI.js';
import { isGameRunning, startMovement } from './input.js';
import { resetSnakeBody } from './snake.js';
import { resetPoints } from './points.js';
import { resetFood } from './food.js';
import { 
  playSound,
  playGameMusic,
  stopMusicObj,
} from './sound.js';
import './changeFullscreen.js';
import { getHighscores } from './savement.js';

let soundPlayTimeDelayMs = 600;
let tempGUITitle = null;
let tempGUIElem = null;

const playAgainButton = document.querySelector("[data-play-again-btn]");
const gameResetButton = document.querySelector("[data-reset-game-btn]");
export const gameEndMenu = document.querySelector('[data-game-end-menu]');

// add event listener for the very first time
showStartGUI();

await getHighscores();

export function toggleMenuVisibility({ elem, title = false } = {}) {
  if(title) {
    elem?.classList.toggle("show");
    tempGUITitle = elem;
    return;
  } 

  tempGUIElem = elem;
  elem?.closest("section").classList.toggle("show");
}

function resetGameValues() {
  if(tempGUIElem) {
    toggleMenuVisibility({
      elem: tempGUIElem,
      title: false,
    })
  }

  if(tempGUITitle) {
    toggleMenuVisibility({
      elem: tempGUITitle,
      title: true,
    })
  }

  resetSnakeBody();
  resetPoints();
  resetFood();

  startGameSound();
  startGameMusic();
}

export function roundEnded({ gameOver = false} = {}) {
  if(gameOver && isGameRunning()) {
    playSound("snake-crash-sound"); 
    setTimeout(() => {
      playSound("game-over-sound"); 
    }, soundPlayTimeDelayMs + 300);
  }
  else if( !gameOver && isGameRunning()) {
    playSound("game-win-sound");
  }
  // saveHighscore();
  stopMusicObj();
}


export function startGameMusic() {
  setTimeout(() => {
    playGameMusic("during-game-music");    
  }, soundPlayTimeDelayMs);
}

export function startGameSound() {
  playSound("game-start-sound");
}

// reset everything for the next round
playAgainButton.addEventListener("pointerdown", resetGameValues);
playAgainButton.addEventListener("pointerdown", startMovement);
playAgainButton.removeEventListener("pointerup", resetGameValues);


function reloadPage() {
  location.reload();
}

gameResetButton.addEventListener("pointerdown", reloadPage);
gameResetButton.addEventListener("pointerup", reloadPage);