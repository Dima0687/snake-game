import { getComputedGrid } from "./grid.js";
import { isGameRunning, getInputDirection } from "./input.js";

export const SNAKE_SPEED = 5;

let startSnake = [
  { x: 12, y: 12 },
  { x: 12, y: 13 },
  { x: 12, y: 14 },
];

let snakeBody = createDeepClone(startSnake);
let newSegments = 0;

export function resetSnakeBody() {
  snakeBody = setNewCoordsWhileResize();
}

function createDeepClone(snake) {
  return structuredClone(snake);
}

export function update() {
  if(!isGameRunning()) return;

  addSegments();

  const inputDirection = getInputDirection();

  for(let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }
  }
  snakeBody[0].y += inputDirection.y;
  snakeBody[0].x += inputDirection.x;
}

export function draw(gameBoard) {
  if(!isGameRunning()) return 
  snakeBody.forEach( (segment, index) => {
    const snakeElement = document.createElement("div");
    if(index === 0) {
      snakeElement.id = "snake-head"; // TODO: CHECK ob dies wirklich nötig ist, evtl. onSnake ausreichend
    }
    snakeElement.className = "snake";
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.style.gridRowStart = segment.y;
    gameBoard.append(snakeElement);
  });
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, { ignoreHead = false} = {}) {
  return snakeBody.some((segment, index) => {
    if(ignoreHead && index === 0) return false;
    return equalPosition(segment, position);
  });
}

export function getSnakeHead() {
  return snakeBody[0]
}

export function snakeIntersection() {
  return onSnake(getSnakeHead(), { ignoreHead: true });
}

function equalPosition(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
  for(let i = 0; i < newSegments; i++) {
    snakeBody.push({...snakeBody.at(-1)})
  }
  newSegments = 0;
}

export function setNewCoordsWhileResize() {
  if(isGameRunning()) return;
  snakeBody = [
    { x: Math.ceil(getComputedGrid().x / 2), y: Math.ceil(getComputedGrid().y / 2) },
     {x: Math.ceil(getComputedGrid().x / 2), y: Math.ceil(getComputedGrid().y / 2 + 1) },
    { x: Math.ceil(getComputedGrid().x / 2), y: Math.ceil(getComputedGrid().y / 2 + 2) },
  ];

  return snakeBody
}


window.addEventListener("resize", setNewCoordsWhileResize);