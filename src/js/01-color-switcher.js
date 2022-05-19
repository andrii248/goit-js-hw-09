const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};
let colorChangeInterval = null;

refs.start.addEventListener('click', handleStartClick);
refs.stop.addEventListener('click', handleStopClick);

function handleStartClick() {
  colorChangeInterval = setInterval(() => {
    bodyRandomColor();
  }, 1000);
}

function bodyRandomColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function handleStopClick() {
  clearInterval(colorChangeInterval);
}
