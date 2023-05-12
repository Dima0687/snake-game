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
import { createHighscore, getHighscores } from './savement.js';
import { pointsSetup } from './points.js';

let soundPlayTimeDelayMs = 600;
let tempGUITitle = null;
let tempGUIElem = null;

const nameDisplay = document.querySelector('[data-display-player-name]');
const playAgainButton = document.querySelector("[data-play-again-btn]");
const gameResetButton = document.querySelector("[data-reset-game-btn]");
const startGameGUI = document.querySelector("[data-start-game]");
export const gameEndMenu = document.querySelector('[data-game-end-menu]');
// add event listener for the very first time
showStartGUI();

getHighscores();

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
}

export function roundEnded({ gameOver = false} = {}) {
  const { currentPoints, newColor } = pointsSetup;

  if(gameOver && isGameRunning()) {
    playSound("snake-crash-sound"); 
    setTimeout(() => {
      playSound("game-over-sound"); 
    }, soundPlayTimeDelayMs + 300);
  }
  else if( !gameOver && isGameRunning()) {
    playSound("game-win-sound");
  }
  
  if(isGameRunning()) {
    createHighscore({
      name: nameDisplay.textContent,
      points: currentPoints,
      color: newColor,
      date: getDate()
    });
    getHighscores();
  }
  stopMusicObj();
}

export function setNameDisplayValue({ name, reset = false } = {}) {
  let placeholder = "Anonymous";
  name?.length < 3 || reset ? nameDisplay.textContent = placeholder : nameDisplay.textContent = name;
}

function playMusic() {
  startGameSound();
  startGameMusic();
}

function playAgain() {
  resetGameValues();
  playMusic();
  startMovement()
}

function newPlayer() {
  resetGameValues();
  setTimeout(() => {
    toggleMenuVisibility({
      elem: startGameGUI,
    });
  }, 500)
  setNameDisplayValue({ reset: true });
}

function getDate() {
  return new Date().toLocaleDateString("de-DE", { 
    year: "2-digit",
    day: "2-digit",
    month: "2-digit",
  })
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
playAgainButton.addEventListener("pointerdown", playAgain);
gameResetButton.addEventListener("pointerdown", newPlayer);