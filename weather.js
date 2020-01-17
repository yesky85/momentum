const WEATHER_API_KEY = '049e77411f0a31b8b2a4e2653b968699';
const WEAEHER_API = 'https://api.openweathermap.org/data/2.5/weather?';

const weather = document.getElementsByClassName('js-temperature');

function getWeather(coords) {
  fetch(
    `${WEAEHER_API}lat=${coords.latitude}&lon=${coords.longitude}&appid=${WEATHER_API_KEY}&units=metric`,
  )
    .then(response => {
      return response.json();
    })
    .then(json => {
      const name = json.name;
      const temperature = json.main.temp;

      weather[0].innerHTML = `${temperature}° @ ${name}`;
    });
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coords = {
    latitude,
    longitude,
  };
  localStorage.coords = JSON.stringify(coords);

  getWeather(coords);
}

function handleGeoError() {
  console.log(`No location`);
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.coords;
  if (loadedCoords) {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords);
  } else {
    askForCoords();
  }
}

function init() {
  loadCoords();
}

init();
