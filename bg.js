const UNSPLASH_API_KEY = `cb58b5b55ecbceaef8215c585cc7ac82768fff400e940ac23c49e7f4ff1d6ae7`;
const UNSPLASH_API = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=landscape&orientation=landscape`;

const bgBody = document.querySelector('body');
const locationContainer = document.getElementsByClassName('js-area');

function getBackground() {
  fetch(UNSPLASH_API)
    .then(response => {
      return response.json();
    })
    .then(json => {
      const image = json;
      const location = image.location;
      saveBackground(image.urls.full, location.city, location.country);
    });
}

function saveBackground(urls, city, country) {
  const expiresDate = new Date();
  expiresDate.setHours(expiresDate.getHours() + 1);
  const image = {
    urls,
    expires: expiresDate,
    city,
    country,
  };
  localStorage.bgImage = JSON.stringify(image);
  loadBackground();
}

function loadBackground() {
  const loadedImage = localStorage.bgImage;
  if (loadedImage) {
    const parsedImage = JSON.parse(loadedImage);
    const today = new Date();
    const expires = new Date(parsedImage.expires);
    console.log(today, expires);
    if (today > expires) {
      getBackground();
    } else {
      bgBody.style.backgroundImage = `url(${parsedImage.urls})`;
      bgBody.style.backgroundRepeat = 'no-repeat';
      locationContainer[0].innerHTML = `${parsedImage.city}, ${parsedImage.country}`;
    }
  } else {
    getBackground();
  }
}

function init() {
  loadBackground();
}

init();
