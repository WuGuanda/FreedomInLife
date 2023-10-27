const gameContainer = document.getElementById("game-container");
const WINNING_TILE = 2048;

function initializeGame() {
    for (let i = 0; i < 16; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        gameContainer.appendChild(tile);
    }

    addRandomTile();
    addRandomTile();
}


// Function to add a random tile
function addRandomTile() {
    const tiles = document.querySelectorAll(".tile");
    const emptyTiles = Array.from(tiles).filter(tile => !tile.textContent);
    if (emptyTiles.length === 0) {
        return;
    }

    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    randomTile.textContent = Math.random() < 0.9 ? 2 : 4;
}

// Function to move tiles up
function moveUp() {
    let moved = false;

    for (let col = 0; col < 4; col++) {
        for (let row = 1; row < 4; row++) {
            const currentTile = getTile(row, col);
            if (currentTile) {
                for (let i = row - 1; i >= 0; i--) {
                    const targetTile = getTile(i, col);
                    if (!targetTile) {
                        setTile(i, col, currentTile.textContent);
                        setTile(row, col, "");
                        row = i + 1;
                        moved = true;
                    } else if (targetTile.textContent === currentTile.textContent) {
                        const newValue = parseInt(targetTile.textContent) * 2;
                        setTile(i, col, newValue);
                        setTile(row, col, "");
                        // Update score or check for winning condition here if needed
                        moved = true;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }

    return moved;
}

// Implement moveDown(), moveLeft(), and moveRight() functions similarly to moveUp()

// Function to move tiles down
function moveDown() {
    let moved = false;

    for (let col = 0; col < 4; col++) {
        for (let row = 2; row >= 0; row--) {
            const currentTile = getTile(row, col);
            if (currentTile) {
                for (let i = row + 1; i < 4; i++) {
                    const targetTile = getTile(i, col);
                    if (!targetTile) {
                        setTile(i, col, currentTile.textContent);
                        setTile(row, col, "");
                        row = i - 1;
                        moved = true;
                    } else if (targetTile.textContent === currentTile.textContent) {
                        const newValue = parseInt(targetTile.textContent) * 2;
                        setTile(i, col, newValue);
                        setTile(row, col, "");
                        // Update score or check for winning condition here if needed
                        moved = true;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }

    return moved;
}

// Function to move tiles left
function moveLeft() {
    let moved = false;

    for (let row = 0; row < 4; row++) {
        for (let col = 1; col < 4; col++) {
            const currentTile = getTile(row, col);
            if (currentTile) {
                for (let i = col - 1; i >= 0; i--) {
                    const targetTile = getTile(row, i);
                    if (!targetTile) {
                        setTile(row, i, currentTile.textContent);
                        setTile(row, col, "");
                        col = i + 1;
                        moved = true;
                    } else if (targetTile.textContent === currentTile.textContent) {
                        const newValue = parseInt(targetTile.textContent) * 2;
                        setTile(row, i, newValue);
                        setTile(row, col, "");
                        // Update score or check for winning condition here if needed
                        moved = true;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }

    return moved;
}

// Function to move tiles right
function moveRight() {
    let moved = false;

    for (let row = 0; row < 4; row++) {
        for (let col = 2; col >= 0; col--) {
            const currentTile = getTile(row, col);
            if (currentTile) {
                for (let i = col + 1; i < 4; i++) {
                    const targetTile = getTile(row, i);
                    if (!targetTile) {
                        setTile(row, i, currentTile.textContent);
                        setTile(row, col, "");
                        col = i - 1;
                        moved = true;
                    } else if (targetTile.textContent === currentTile.textContent) {
                        const newValue = parseInt(targetTile.textContent) * 2;
                        setTile(row, i, newValue);
                        setTile(row, col, "");
                        // Update score or check for winning condition here if needed
                        moved = true;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }

    return moved;
}

function getTile(row, col) {
    const index = row * 4 + col;
    return gameContainer.children[index];
}

function setTile(row, col, value) {
    const index = row * 4 + col;
    gameContainer.children[index].textContent = value;
}

// Check for win condition
function checkWin() {
    const tiles = Array.from(gameContainer.children);
    return tiles.some(tile => tile.textContent == WINNING_TILE);
}

// Check for lose condition
function checkLose() {
    const tiles = Array.from(gameContainer.children);
    const adjacentTiles = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ];

    return tiles.every((tile, index) => {
        if (tile.textContent === "") return false;
        const row = Math.floor(index / 4);
        const col = index % 4;
        return adjacentTiles.some(([rowOffset, colOffset]) => {
            const newRow = row + rowOffset;
            const newCol = col + colOffset;
            if (newRow >= 0 && newRow < 4 && newCol >= 0 && newCol < 4) {
                const adjacentTile = getTile(newRow, newCol);
                return adjacentTile.textContent === "" || adjacentTile.textContent === tile.textContent;
            }
            return false;
        });
    });
}

initializeGame();
