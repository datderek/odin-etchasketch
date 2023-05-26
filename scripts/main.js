const screenGrid = document.querySelector("#screen");
const screenWidth = screenGrid.clientWidth;
let gridSize = 16;
let currentSize = screenGrid.childElementCount;
let resize = false;

/* Checks if the grid needs to be resized */
while(currentSize !== gridSize * gridSize) {
    if (currentSize < gridSize * gridSize) {
        addCell();
    } else {
        removeCell();
    }
}
resizeCells();


/* Resize the grid by adding/subtracting  cells */
function addCell() {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    screenGrid.appendChild(cell);
    currentSize = screenGrid.childElementCount;
}

function removeCell() {
    screenGrid.removeChild(screenGrid.firstChild);
    currentSize = screenGrid.childElementCount;
}

/* Resize individual cells my calculating the flex basis */
function resizeCells() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.setAttribute('style', `flex-basis: ${screenWidth / gridSize}px`);
    });
}