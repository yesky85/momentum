const toDosForm = document.getElementsByClassName('js-toDosForm');
const toDosInput = document.getElementsByClassName('js-toDosInput');
const toDosList = document.getElementsByClassName('js-toDosList');

let toDos = [];

function handleToDosSubmit(event) {
  event.preventDefault();
  const value = toDosInput[0].value;
  toDosInput[0].value = '';
  addToDo(value);
}

function handleDelete(event) {
  const removeToDos = event.target.parentNode;
  toDosList[0].removeChild(removeToDos);
  const clearToDos = toDos.filter(toDo => {
    return toDo.id !== parseInt(removeToDos.id);
  });
  toDos = clearToDos;

  localStorage.toDos = JSON.stringify(toDos);

  console.log(toDos);
}

function saveToDo(text) {
  const toDosObj = {
    id: toDos.length + 1,
    text: text,
  };
  toDos.push(toDosObj);

  localStorage.toDos = JSON.stringify(toDos);
}

function addToDo(text) {
  const toDo = document.createElement('li');
  toDo.id = toDos.length + 1;
  toDo.className = 'js-toDosLists';

  const deleteBtn = document.createElement('span');
  deleteBtn.className = 'js-toDosBtn toDosBtn';
  deleteBtn.innerHTML = 'X';
  deleteBtn.addEventListener('click', handleDelete);

  const label = document.createElement('label');
  label.className = 'js-toDosLabel';
  label.innerHTML = `${text} `;

  toDo.appendChild(label);
  toDo.appendChild(deleteBtn);
  toDosList[0].appendChild(toDo);

  saveToDo(text);
}

function loadToDos() {
  const loadedToDos = localStorage.toDos;
  if (loadedToDos) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(toDo => {
      addToDo(toDo.text);
    });
  } else {
  }
}

function init() {
  loadToDos();
}

toDosForm[0].addEventListener('submit', handleToDosSubmit);

init();
