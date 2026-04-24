
const clickSound = new Audio("https://www.soundjay.com/buttons/button-16.mp3");

// -------- Calculator --------
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const history = document.getElementById("history");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        clickSound.play(); // sound effect

        let value = btn.textContent;

        if (value === "C") {
            display.value = "";
        } 
        else if (value === "=") {
            try {
                let result = eval(display.value);
                
               
                let li = document.createElement("li");
                li.textContent = display.value + " = " + result;
                history.appendChild(li);

                display.value = result;
            } catch {
                display.value = "Error";
            }
        } 
        else {
            display.value += value;
        }
    });
});


let seconds = 0;
let interval = null;

function formatTime(sec) {
    let h = Math.floor(sec / 3600);
    let m = Math.floor((sec % 3600) / 60);
    let s = sec % 60;

    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

document.getElementById("start").onclick = () => {
    if (!interval) {
        interval = setInterval(() => {
            seconds++;
            document.getElementById("timer").innerText = formatTime(seconds);
        }, 1000);
    }
};

document.getElementById("stop").onclick = () => {
    clearInterval(interval);
    interval = null;
};

document.getElementById("reset").onclick = () => {
    clearInterval(interval);
    interval = null;
    seconds = 0;
    document.getElementById("timer").innerText = "00:00:00";
};


document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("dark");
};