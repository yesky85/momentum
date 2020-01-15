const clock = document.getElementsByClassName('js-clock');
const time = document.getElementsByClassName('js-time');

function getTime() {
  const date = new Date();
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  time[0].innerHTML = `${hours}:${minutes}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
