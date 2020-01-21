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

function handleToDosDone(event) {
  const dones = event.target.style.textDecoration;
  if (dones != '') {
    event.target.style.textDecoration = '';
  } else {
    event.target.style.textDecoration = 'line-through';
  }
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

  const deleteBtn = document.createElement('i');
  deleteBtn.className = 'fas fa-times';
  deleteBtn.addEventListener('click', handleDelete);

  const label = document.createElement('label');
  label.className = 'js-toDosLabel';
  label.innerHTML = `${text}`;
  label.addEventListener('click', handleToDosDone);

  toDo.appendChild(deleteBtn);
  toDo.appendChild(label);
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
