import { SNAKE_SPEED } from "./components/snake.js";

let lastRender;
let snakeSpeedMultiplier = 0.2;

requestAnimationFrame(main);
function main(currentTime) {
  if(!lastRender) {
    lastRender = currentTime;
    requestAnimationFrame(main);
  }

  const secondsSinceLastRender = (currentTime - lastRender) / 1000;
  // snakeSpeedMultiplier = getSpeedMultiplier();

  requestAnimationFrame(main);
  if(secondsSinceLastRender < (1 / (SNAKE_SPEED * snakeSpeedMultiplier))) return;

  lastRender = currentTime;

  update();
  draw();
}


function update() {
  console.log("UPDATE");
}

function draw() {
  console.log("DRAW");
}