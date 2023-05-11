import { onSnake, expandSnake } from "./snake.js";
import { isGameRunning } from "./input.js";
import { increaseCurrentPoints } from "./points.js";
import { randomGridPosition } from "./grid.js";

let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;
export function update() {
  if(onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    increaseCurrentPoints();

    food = getRandomFoodPosition();
  }
}

export function draw(gameBoard) {
  if(!isGameRunning()) return; 
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.id = "food";
  gameBoard.append(foodElement);
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while(newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}

export function resetFood() {
  if(isGameRunning()) return;
  food = getRandomFoodPosition();
}

window.addEventListener("fullscreenchange", resetFood);
window.addEventListener("resize", resetFood);