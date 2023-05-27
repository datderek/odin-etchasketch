const screenGrid = document.querySelector("#screen");
let currentSize = screenGrid.childElementCount;
let gridSize = 16;
let cellSize;
let cells;
let color = 0;

/* Initial generation of grid */
createGrid();

/* Detects if the user pressed spacebar to erase the grid */
const body = document.querySelector('body');
body.addEventListener('keydown', eraseGrid);

/* Detects changes in slider value and updates grid size*/
const slider = document.querySelector(".slider");
slider.addEventListener("change", e => {
gridSize = parseInt(e.currentTarget.value);
deleteGrid();
createGrid();
});

/* Detects if user selected a color */
const colorButtons = document.querySelectorAll("#penchoice > div");
colorButtons.forEach(button => {
    button.addEventListener("click", changeColor);
});

/* Adds cells till desired grid size is reached */
function createGrid() {
    while(currentSize !== gridSize) {
        addCell();
    }
    setColorMode();
}

/* Add cells to grid */
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
function deleteGrid() {
    while (screenGrid.firstChild) {
        screenGrid.removeChild(screenGrid.firstChild);
    }
    currentSize = 0;
}

/* Erases the user's drawing from the grid */
function eraseGrid(e) {
    if (e.code == "Space") {
        const etchasketch = document.querySelector("#etchasketch");
        etchasketch.addEventListener("animationend", () => {
            etchasketch.classList.remove("shake");
        });
        etchasketch.classList.add("shake");
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.classList.remove("hovered");
            cell.removeAttribute("style");
        }); 
    }
}

/* Changes the color based on which button was clicked*/
function changeColor(e) {
    if (e.target.id == "rainbow") {
        color = 1;
        setColorMode();
        colorButtons[1].classList.add("selected");
        colorButtons[0].classList.remove("selected");
    } else {
        color = 0;
        setColorMode();
        colorButtons[0].classList.add("selected");
        colorButtons[1].classList.remove("selected");
    }
}

/* Sets the color mode */
function setColorMode() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.classList.remove("hovered");
        cell.removeAttribute("style");
        if (color == 0) {
            cell.removeEventListener("mouseover", rainbowMode)
            cell.addEventListener("mouseover", grayMode);
        } else {
            cell.removeEventListener("mouseover", grayMode);
            cell.addEventListener("mouseover", rainbowMode);
        }
    });
}

/* Gray mode */
function grayMode(e) {
    e.target.classList.add("hovered");
}

function rainbowMode(e) {
    e.target.setAttribute("style",`background-color: ${randomColor()}`);
}

/* Generates a random color */
function randomColor() {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor;
}

