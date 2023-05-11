import { 
  SNAKE_SPEED, 
  update as snakeUpdate,
  draw as snakeDraw 
} from "./components/snake.js";
import { update as gridUpdate } from "./components/grid.js";
import { update as pointsColorUpdate, getSpeedMultiplier } from "./components/points.js";
import { update as foodUpdate, draw as foodDraw } from "./components/food.js";
import { checkDeath, checkWin } from "./components/end.js";
import { isGameRunning } from "./components/input.js";
import { draw as fullscreenBtnDraw } from "./components/changeFullscreen.js";

const gameBoard = document.querySelector("[data-game-board]");

let lastRender;

requestAnimationFrame(main);
function main(currentTime) {
  if(!lastRender) {
    lastRender = currentTime;
    requestAnimationFrame(main);
  }

  const secondsSinceLastRender = (currentTime - lastRender) / 1000;

  requestAnimationFrame(main);
  if(secondsSinceLastRender < (1 / (SNAKE_SPEED * getSpeedMultiplier()))) return;

  lastRender = currentTime;

  update();
  draw();
}


function update() {
  gridUpdate(gameBoard);
  snakeUpdate();
  foodUpdate();
  pointsColorUpdate();
}

function draw() {
  if(isGameRunning()) {
    gameBoard.innerHTML = "";
  }
  snakeDraw(gameBoard);
  foodDraw(gameBoard);
  fullscreenBtnDraw();

  checkDeath();
  checkWin();
}