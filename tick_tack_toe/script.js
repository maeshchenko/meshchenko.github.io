const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const GRID_SIDE = 100;
const MARGIN = 50;
const CELL_PADDING = 10;
const TABLE_SIZE = 3;

const canvasSide = GRID_SIDE * TABLE_SIZE + MARGIN * 2;

let player = "X"; // X - tick, O - tack
let isEnd = false;

canvas.width = canvasSide;
canvas.height = canvasSide;

let filledCells = new Array(TABLE_SIZE ** 2); // Make empty array for all cells
let cellsCoord = []; // [[50,50], [150,50],...]
let cellsNumbers = []; // [[0,0], [0,1], [0,2]...]

const drawGrid = () => {
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#000";
  ctx.beginPath();

  for(let i = 0; i < TABLE_SIZE; i++) {
    for(let j = 0; j < TABLE_SIZE; j++) {
      ctx.rect(MARGIN + GRID_SIDE * j, MARGIN + GRID_SIDE * i, GRID_SIDE, GRID_SIDE);
      cellsCoord.push([MARGIN + GRID_SIDE * j, MARGIN + GRID_SIDE * i]);
      cellsNumbers.push([i,j]);
    }
  }
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "#fff";
  ctx.rect(MARGIN, MARGIN, GRID_SIDE * TABLE_SIZE, GRID_SIDE * TABLE_SIZE);
  ctx.stroke();
};

const whichCellIsClicked = ({x,y}) => {
  //  0|1|2
  //  3|4|5
  //  6|7|8

  // Checking we are inside canvas
  if (x < MARGIN || x > canvasSide - MARGIN || y < MARGIN || y > canvasSide - MARGIN) {
    return null;
  }

  for (const [cellNumber, [xCell, yCell]] of cellsCoord.entries()){
    const cellCoord = {x0: xCell, y0: yCell, x1: xCell + GRID_SIDE, y1: yCell + GRID_SIDE};
    if (x > cellCoord.x0 && y > cellCoord.y0 && x < cellCoord.x1 && y < cellCoord.y1) {
      return {cellNumber, cellPosition: cellsNumbers[cellNumber], cellCoord};
    }
  }

};

const getMouseCoord = (canvas, evt) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  }
};

const getPlayerColor = (player) => player === "X" ? "blue" : "green";

const drawCross = (cellNumber, cellCoord, markerType) => {
  ctx.strokeStyle = getPlayerColor(player);
  ctx.beginPath();
  if (player === "X"){
    ctx.moveTo(cellCoord.x0 + CELL_PADDING, cellCoord.y0 + CELL_PADDING);
    ctx.lineTo(cellCoord.x1 - CELL_PADDING,cellCoord.y1 - CELL_PADDING);

    ctx.moveTo(cellCoord.x0 + CELL_PADDING, cellCoord.y1 - CELL_PADDING);
    ctx.lineTo(cellCoord.x1 - CELL_PADDING, cellCoord.y0 + CELL_PADDING);
  } else if (player === "O") {
    ctx.arc(cellCoord.x0 + GRID_SIDE / 2, cellCoord.y0 + GRID_SIDE / 2, GRID_SIDE / 2 - CELL_PADDING / 2 , 0, 2 * Math.PI)
  }
  ctx.stroke();
};

const changePlayer = () => player = player === "O" ? "X" : "O";

const checkIsWin = () => {
  //  0|1|2
  //  3|4|5
  //  6|7|8
  const winnCombinations = [
    [0,1,2],[3,4,5],[6,7,8], // horizontal lines
    [0,3,6],[1,4,7],[2,5,8], // vertical lines
    [0,4,8],[2,4,6] // diagonal lines
  ];

  const checkWinPositions = (a0,a1,a2) => {
    if (!!filledCells[a0] && filledCells[a0] === filledCells[a1] && filledCells[a0] === filledCells[a2]) {
      return { player: filledCells[a0], combination: [a0,a1,a2] };
    }
  };

  for (let [a0, a1,a2] of winnCombinations) {
    let winner = checkWinPositions(a0,a1,a2);
    if (winner) {
      return winner;
    }
  }
};

const drawWinPopup = (winner) => {
  ctx.beginPath();
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(0, 0, canvasSide + MARGIN * 2, canvasSide + MARGIN * 2 );
  ctx.fillStyle = "#fff";
  const fontSize = 30;
  ctx.font = `${fontSize}px Arial`;
  ctx.fillText(`Winner is ${winner}! Play again?`, MARGIN, (canvasSide + MARGIN) / 2 - fontSize / 2);
};

const drawWinCombination = ([a0,a1,a2]) => {
  // [a0,a1,a2] -> [0, 1, 2] (numbers of cells)
  const startCell = cellsCoord[a0];
  const finishCell = cellsCoord[a2];
  ctx.beginPath();
  ctx.lineWidth = 20;
  // ctx.strokeStyle = "#000";
  ctx.moveTo(startCell[0] + GRID_SIDE / 2, startCell[1] + GRID_SIDE / 2);
  ctx.lineTo(finishCell[0] + GRID_SIDE / 2, finishCell[1] + GRID_SIDE / 2);
  ctx.stroke()
};

const reset = () => {
  filledCells = new Array(TABLE_SIZE ** 2);
  cellsCoord = [];
  cellsNumbers = [];
  isEnd = false;
  player = "X";

  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvasSide + MARGIN * 2, canvasSide + MARGIN * 2 );

  drawGrid();
};

canvas.addEventListener('click', (evt) => {
  if (isEnd) {
    reset();
    return;
  }
  const coords = getMouseCoord(canvas, evt);
  const cellData = whichCellIsClicked(coords);
  const cellNumber = cellData?.cellNumber;

  if (!isEnd && cellNumber !== undefined && !Object.keys(filledCells).includes(cellNumber.toString())){
    filledCells[cellNumber] = player;
    drawCross(cellNumber, cellData.cellCoord, player);
    let winner = checkIsWin();
    if (!!winner){
      drawWinCombination(winner.combination);
      drawWinPopup(winner.player);
      isEnd = true;
    }
    changePlayer();
  } else {
    return null;
  }
});

drawGrid();
