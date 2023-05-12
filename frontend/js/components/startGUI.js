import { startMovement } from './input.js';
import { toggleMenuVisibility, setNameDisplayValue } from './interface.js';
import { startGameMusic, startGameSound } from './interface.js';
// import { pointsSetup } from './points.js';

const startButton = document.querySelector('[data-start-game-btn]');
const nameInput = document.querySelector('[data-input-player-name]');

export function showStartGUI() {

  startButton.addEventListener("pointerdown", startGame);
}

function startGame() {
  setPlayerName();
  startMovement();
  toggleMenuVisibility({ elem: this });

  startGameSound();
  startGameMusic();
  // pointsSetup.currentPoints = 2_200_200;
}

function setPlayerName() {
  let name = nameInput.value;

  setNameDisplayValue({ name });

  nameInput.value = "";
}

