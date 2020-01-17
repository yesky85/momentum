const body = document.querySelector('body');

const IMAGE_NUMBER = 3;

function paintImage(number) {
  const image = new Image();
  image.src = `./images/${number + 1}.jpg`;
  image.className = 'bgImage';
  body.appendChild(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMAGE_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
