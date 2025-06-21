let startTime;
let running = false;
let elapsed = 0;
let interval;
let lastLap = 0;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");

function updateDisplay() {
  const time = Date.now() - startTime + elapsed;
  display.textContent = formatTime(time);
}

function formatTime(ms) {
  const date = new Date(ms);
  const h = String(date.getUTCHours()).padStart(2, '0');
  const m = String(date.getUTCMinutes()).padStart(2, '0');
  const s = String(date.getUTCSeconds()).padStart(2, '0');
  const msStr = String(ms % 1000).padStart(3, '0');
  return `${h}:${m}:${s}.${msStr}`;
}

function startStop() {
  if (!running) {
    startTime = Date.now();
    interval = setInterval(updateDisplay, 10);
    running = true;
    startStopBtn.textContent = "Pause";
  } else {
    clearInterval(interval);
    elapsed += Date.now() - startTime;
    running = false;
    startStopBtn.textContent = "Start";
  }
}

function reset() {
  clearInterval(interval);
  elapsed = 0;
  lastLap = 0;
  running = false;
  display.textContent = "00:00:00.000";
  document.getElementById("laps").innerHTML = "";
  startStopBtn.textContent = "Start";
}

function lap() {
  if (running) {
    const currentTime = Date.now() - startTime + elapsed;
    const lapTime = currentTime - lastLap;
    lastLap = currentTime;

    const li = document.createElement("li");
    li.textContent = `Lap ${document.getElementById("laps").children.length + 1}: ${formatTime(lapTime)}`;
    document.getElementById("laps").appendChild(li);
  }
}

startStopBtn.onclick = startStop;
