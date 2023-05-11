const gameBoard = document.querySelector("[data-game-board]");

let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };
let lockedPosition = { x: null, y: null };

let gameIsRunning = false;
// TODO: moveSnake false, überprüfe ob spiel läuft 

export function startMovement() {
  inputDirection = { x: 0, y: -1 };
  gameIsRunning = true;
  addMovementListener();
}

export function stopMovement() {
  inputDirection = { x: 0, y: 0 };
  gameIsRunning = false;
  removeMovementListener()
}

export function getInputDirection() {
  lastInputDirection = inputDirection;
  return lastInputDirection;
}

export function movement(e) {
  e.preventDefault();
  switch(getInput(e)) {
    case "ArrowUp":
    case "KeyW":
    case "UP":
      if(lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: -1 };
      break;
    case "ArrowDown":
    case "KeyS":
    case "DOWN":
      if(lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
    case "KeyA":
    case "LEFT":
      if(lastInputDirection.x !== 0) break;
      inputDirection = { x: -1, y: 0 };
      break;
    case "ArrowRight":
    case "KeyD":
    case "RIGHT":
      if(lastInputDirection.x !== 0) break;
      inputDirection = { x: 1, y: 0 };
      break;
  }
}

function lockFirstClick(e) {
  lockedPosition = {
    x: e.clientX,
    y: e.clientY,
  }
}

function calcDistance(e) {
  const xDis = lockedPosition.x - e.clientX;
  const yDis = lockedPosition.y - e.clientY;
  return {
    x: xDis,
    y: yDis,
  }
}

function getDirection({ x, y } = {}) {
  if(Math.abs(x) > Math.abs(y)) {
    return directionRightOrLeft(x);
  }
  else {
    return directionUpOrDown(y);
  }
}

function directionRightOrLeft(x) {
  if( x > 0) {
    return "LEFT";
  }
  else {
    return "RIGHT";
  }
}

function directionUpOrDown(y) {
  if( y > 0) {
    return "UP";
  }
  else {
    return "DOWN";
  }
}

function getInput(e) {
  let code = e.code;
  if( code ) return code;
  
  const direction = getDirection(calcDistance(e));
  const move = {
    up: direction === "UP",
    right: direction === "RIGHT",
    down: direction === "DOWN",
    left: direction === "LEFT",
  }

  if(
    move.up &&
    lastInputDirection.y !== 1 &&
    lastInputDirection.x !== 0
  ) {
    return direction;
  }

  if(
    move.left && 
    lastInputDirection.x !== 1 && 
    lastInputDirection.y !== 0
  ) {
    return direction;
  }

  if( 
    move.right && 
    lastInputDirection.x !== -1 &&
    lastInputDirection.y !== 0
  ) {
    return direction;
  }

  if(
    move.down &&
    lastInputDirection.y !== -1 &&
    lastInputDirection.x !== 0
  ) {
    return direction;
  }
}

export function isGameRunning() {
  return gameIsRunning;
}


function pointerdownListener(e) {
  lockFirstClick(e);
  gameBoard?.addEventListener("pointermove", movement);
}

function addMovementListener() {
  window.addEventListener("keydown", movement);
  setTimeout(() => {
    gameBoard?.addEventListener("pointerdown", pointerdownListener);
  }, 200);

}

function removeMovementListener() {
  window.removeEventListener("keydown", movement);
  gameBoard?.removeEventListener("pointerdown", pointerdownListener);
  gameBoard?.removeEventListener("pointermove", movement);
}

gameBoard?.addEventListener("pointerup", () => {
  gameBoard?.removeEventListener("pointermove", movement);
});