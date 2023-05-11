
let gameBoard;

const computedRootElement = getComputedStyle(document.documentElement);
let computedColumns = computedRootElement.getPropertyValue("--columns");
let computedRows = computedRootElement.getPropertyValue("--rows");

export function update(gameBoardElem) {
  gameBoard = gameBoardElem;
}

export function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * computedColumns) + 1,
    y: Math.floor(Math.random() * computedRows) + 1,
  }
}

export function outsideGrid(position) {
  return (
    position.x < 1 || position.x > computedColumns || 
    position.y < 1 || position.y > computedRows
  )
}

function changeGridDynamically() {
  const { height, width } = gameBoard.getBoundingClientRect();
  const snakeWidthAndHeightOffset = 20;

  const columns = Math.floor(width / snakeWidthAndHeightOffset);
  const rows = Math.floor(height / snakeWidthAndHeightOffset);

  document.documentElement.style.setProperty("--columns", columns);
  document.documentElement.style.setProperty("--rows", rows);

  computedColumns = computedRootElement.getPropertyValue("--columns");
  computedRows = computedRootElement.getPropertyValue("--rows");
}

export function getComputedGrid() {
  return {
    x: computedColumns,
    y: computedRows,
  }
}

window.addEventListener("resize", changeGridDynamically);