// -------- Calculator --------
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "C") {
            display.value = "";
        } 
        else if (value === "=") {
            try {
                display.value = Function("return " + display.value)();
            } catch {
                display.value = "Error";
            }
        } 
        else {
            display.value += value;
        }
    });
});

// Keyboard Support
document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) || "+-*/.".includes(e.key)) {
        display.value += e.key;
    } else if (e.key === "Enter") {
        display.value = Function("return " + display.value)();
    } else if (e.key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }
});


// -------- Timer --------
let seconds = 0;
let timerInterval = null;

const timerDisplay = document.getElementById("timer");

function formatTime(sec) {
    let hrs = Math.floor(sec / 3600);
    let mins = Math.floor((sec % 3600) / 60);
    let secs = sec % 60;

    return `${String(hrs).padStart(2, '0')}:` +
           `${String(mins).padStart(2, '0')}:` +
           `${String(secs).padStart(2, '0')}`;
}

document.getElementById("start").addEventListener("click", () => {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            seconds++;
            timerDisplay.textContent = formatTime(seconds);
        }, 1000);
    }
});

document.getElementById("stop").addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

document.getElementById("reset").addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    seconds = 0;
    timerDisplay.textContent = "00:00:00";
});