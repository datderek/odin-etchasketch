const screenGrid = document.querySelector("#screen");
let currentSize = screenGrid.childElementCount;
let gridSize = 16;
let cellSize;

/* Initial generation of grid */
resizeGrid();

function resizeGrid() {
    while(currentSize !== gridSize) {
        addCell();
    }
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.classList.remove("hovered");
        cell.addEventListener( "mouseover", e => e.target.classList.add("hovered"))
    });
}

/* Resize the grid by adding/subtracting  cells */
function addCell() {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let i = 0; i < gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell")
        row.appendChild(cell);
    }
    screenGrid.appendChild(row);
    currentSize = screenGrid.childElementCount;
}

/* Deletes all cells from the grid */
function clearGrid() {
    while (screenGrid.firstChild) {
        screenGrid.removeChild(screenGrid.firstChild);
    }
    currentSize = 0;
}

/* Detects if the user pressed spacebar */
const body = document.querySelector('body');
body.addEventListener('keydown', (e) => {
    if (e.code == "Space") {
        const etchasketch = document.querySelector("#etchasketch");
        etchasketch.addEventListener("animationend", () => {
            etchasketch.classList.remove("shake");
        });
        etchasketch.classList.add("shake");
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => cell.classList.remove("hovered"));
    }
});

/* Detects changes in slider value and updates grid size*/
const slider = document.querySelector(".slider");
slider.addEventListener("change", e => {
gridSize = parseInt(e.currentTarget.value)
clearGrid();
resizeGrid();
});

