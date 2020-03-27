loadEvents();
// load every event in the page
function loadEvents() {
  document.querySelector("form").addEventListener("submit", submit);
  document.getElementById("clear").addEventListener("click", clearList);
  document.querySelector("ul").addEventListener("click", deleteOrTick);
  // LOAD EVENt
  document.addEventListener("DOMContentLoaded", getTask);
}

//GET TASKS FROM LOCAL STORAGE
function getTask() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    let ul = document.querySelector("ul");
    let li = document.createElement("li");
    li.innerHTML = `<span class="delete">×</span><input type="checkbox" class='check'><label>${task}</label>`;
    //
    ul.appendChild(li);
    document.querySelector(".taskBoard");
  });

  console.log(tasks);
}

// submit data function
function submit(e) {
  e.preventDefault();
  let taskList;
  let input = document.querySelector("input");
  if (input.value != "") {
    addTask(input.value);
    input.value = "";
  } else {
    document.getElementById("dialog-dark-rounded").showModal();
  }
}

// adding task

function addTask(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  let ul = document.querySelector("ul");
  let li = document.createElement("li");
  li.innerHTML = `<span class="delete">×</span><input type="checkbox" class='check'><label>${task}</label>`;
  //
  ul.appendChild(li);
  document.querySelector(".taskBoard");

  storeTaskInLocalStorage(document.querySelector("input").value);
}

// clearing the task
function clearList(e) {
  let ul = (document.querySelector("ul").innerHTML = "");

  clearTaskLocalStorage();
}
//deleteTICK

function deleteOrTick(e) {
  if (e.target.className == "delete") {
    deleteTask(e);
  } else {
    tickTask(e);
  }
}
// REMOVE TASKS FROM LS
function clearTaskLocalStorage() {
  localStorage.clear();
}

// delete task

function deleteTask(e) {
  let remove = e.target.parentNode;
  let parentNode = remove.parentNode;
  parentNode.removeChild(remove);
}

// tick a task
function tickTask(e) {
  const task = e.target.nextSibling;

  if (e.target.checked) {
    task.style.textDecoration = "line-through";
    task.style.color = "#f7f7f7";
  } else {
    task.style.textDecoration = "none";
  }
}

//store TASKS
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
