
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
  
  let snakeWidthAndHeightOffset = fixSnakeDimensionsOnResize(height, width);
  
  
  const columns = Math.floor(width / snakeWidthAndHeightOffset);
  const rows = Math.floor(height / snakeWidthAndHeightOffset);

  document.documentElement.style.setProperty("--columns", columns);
  document.documentElement.style.setProperty("--rows", rows);

  computedColumns = columns;
  computedRows = rows;
}

function fixSnakeDimensionsOnResize(height, width) {
  let snakeWidthAndHeightOffset = 20;
  
  if(height >= 800 || width >= 800) {
    snakeWidthAndHeightOffset = 30
  }

  if(height >= 1000 || width >= 1000) {
    snakeWidthAndHeightOffset = 40;
  }

  if(height >= 1500 || width >= 1500) {
    snakeWidthAndHeightOffset = 60;
  }
  
  if(height >= 2000 || width >= 2000) {
    snakeWidthAndHeightOffset = 100;
  }
  
  if(height >= 3000 || width >= 3000) {
    snakeWidthAndHeightOffset = 120;
  }


  return snakeWidthAndHeightOffset;
}

export function getComputedGrid() {
  return {
    x: computedColumns,
    y: computedRows,
  }
}

window.addEventListener("resize", changeGridDynamically);