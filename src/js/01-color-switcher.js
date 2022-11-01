const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

btnDisabling(stopBtn, startBtn);

function btnDisabling(btnOff, btnOn) {
  btnOff.disabled = true;
  btnOn.disabled = false;
}

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    // console.log(`Start`);
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnDisabling(startBtn, stopBtn);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  // console.log(`Stopped`);
  btnDisabling(stopBtn, startBtn);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
