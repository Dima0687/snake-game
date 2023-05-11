import { isGameRunning, stopMovement } from "./input.js";
import { 
  gameEndMenu as gameOverGUI,
  toggleMenuVisibility,
  roundEnded,
} from "./interface.js";

const gameOverTitle = document.querySelector('[data-game-over-title]');

export function showGameOverGUI() {
  if(isGameRunning()) {
    toggleMenuVisibility({
      elem: gameOverGUI
    });
    toggleMenuVisibility({
      elem: gameOverTitle,
      title: true,
    });
  }
  roundEnded({ gameOver: true });
  stopMovement();
}