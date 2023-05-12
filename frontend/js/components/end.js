import { getSnakeHead, snakeIntersection } from "./snake.js";
import { outsideGrid } from "./grid.js";
import { stopMovement } from "./input.js";
import { getCurrentPoints } from "./points.js";
import { showGameOverGUI } from "./gameOverGUI.js";
import { showWinGUI } from "./gameWinGUI.js";
import { WIN_CONDITION_SCORE } from './points.js';
// GAME OVER
export function checkDeath() {
  let gameOver = outsideGrid( getSnakeHead()) || snakeIntersection();

  if(gameOver) {
    showGameOverGUI();
  }
}


// WIN

export function checkWin() {
  let gameWon = getCurrentPoints() >= WIN_CONDITION_SCORE;
  
  if(gameWon) {
    showWinGUI();
  }
}