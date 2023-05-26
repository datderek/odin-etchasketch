const screenGrid = document.querySelector("#screen");
let currentSize = screenGrid.childElementCount;
let gridSize = 64;
let cellSize;

/* Checks if the grid needs to be resized */
while(currentSize !== gridSize) {
    if (currentSize < gridSize) {
        addCell();
    } else {
        removeCell();
    }
}
const cells = document.querySelectorAll(".cell");
cells.forEach( 
    cell => cell.addEventListener( "mouseover", e => e.target.classList.add("hovered"))
);


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

function removeCell() {
    screenGrid.removeChild(screenGrid.firstChild);
    const rows = document.querySelectorAll(".row");
    rows.forEach(
        row => row.removeChild(row.firstChild)
    )
}
