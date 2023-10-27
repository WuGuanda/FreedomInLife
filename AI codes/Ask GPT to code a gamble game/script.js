const gambleBtn = document.getElementById("gamble-btn");
const pressCountDisplay = document.getElementById("press-count");

let number = 16;
let pressCount = 0;

function updateNumber() {
    pressCount++;
    pressCountDisplay.textContent = `Presses: ${pressCount}`;
    const random = Math.random();
    if (random < 0.5) {
        number *= 2;
    } else {
        number /= 2;
    }
    gambleBtn.textContent = number;
    if (number === 2) {
        gambleBtn.disabled = true;
    }
}

gambleBtn.addEventListener("click", updateNumber);
