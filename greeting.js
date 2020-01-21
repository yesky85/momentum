const nameContainer = document.getElementsByClassName('js-name');

function handleSubmit(event) {
  event.preventDefault();
  // const form = event.target;
  // const input = form.getElementsByClassName('js-input');
  const input = document.getElementsByClassName('js-input');
  const value = input[0].value;
  localStorage.setItem('username', value);

  paintName(value);
}

function paintInput() {
  nameContainer[0].innerHTML = '';
  const input = document.createElement('input');
  input.className = 'js-input';
  input.placeholder = 'What is your name?';
  input.type = 'text';

  const form = document.createElement('form');
  form.className = 'js-form';

  form.addEventListener('submit', handleSubmit);
  form.appendChild(input);
  nameContainer[0].appendChild(form);
}

function handleReset(event) {
  event.preventDefault();

  localStorage.removeItem('username');
  paintInput();
}

function paintName(name) {
  nameContainer[0].innerHTML = '';
  const greeting = document.createElement('span');
  greeting.className = 'js-greeting';
  greeting.innerHTML = `Hello, ${name} `;
  nameContainer[0].appendChild(greeting);

  const reset = document.createElement('i');
  reset.className = 'fas fa-times';
  reset.addEventListener('click', handleReset);
  greeting.appendChild(reset);
}

function loadLocalStorage() {
  const name = localStorage.getItem('username');
  if (name === null) {
    paintInput();
  } else {
    paintName(name);
  }
}

function init() {
  loadLocalStorage();
}

init();
