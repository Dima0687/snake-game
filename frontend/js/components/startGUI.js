import { startMovement } from './input.js';
import { 
  toggleMenuVisibility, 
  setNameDisplayValue,
  playMusic
} from './interface.js';
import { toggleFullscreen } from './changeFullscreen.js';
import { resetFood } from './food.js';

// import { pointsSetup } from './points.js';

const startButton = document.querySelector('[data-start-game-btn]');
const nameInput = document.querySelector('[data-input-player-name]');

export function showStartGUI() {

  startButton.addEventListener("pointerdown", startGame);
}

function startGame() {
  setPlayerName();
  toggleMenuVisibility({ elem: this });

  playMusic();
  toggleFullscreen({ clickOnStartBtn: true });
  setTimeout(() => startMovement(), 200);
  // pointsSetup.currentPoints = 2_200_200;
}

function setPlayerName() {
  let name = nameInput.value;

  setNameDisplayValue({ name });

  nameInput.value = "";
}

