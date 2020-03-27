document
  .querySelector("#addCheckList")
  .addEventListener("click", addBoilerPlate);

document.querySelector("ul").addEventListener("click", inputOrDelete);
document.addEventListener("DOMContentLoaded", getTask);
function addBoilerPlate(e) {
  const ul = document.querySelector("ul");

  const li = document.createElement("li");
  li.innerHTML = `
   <input type="checkbox" class='check' >
   <p class="desc">Click To Edit</p>
  `;
  ul.appendChild(li);

  e.preventDefault();
}

function inputOrDelete(e) {
  if (e.target.className === "desc") {
    changeToInput(e);
  }
  tickTask(e);
}
//change to Input when its click
function changeToInput(e) {
  const li = e.target.parentElement;
  //hide the p element
  const p = e.target;
  hideElement(p);
  const form = document.createElement("form");

  form.innerHTML = `
    <input type="text" />
    <button>submit</button>
  `;
  form.addEventListener("submit", submitData);
  li.appendChild(form);
}
//listen for a form submission
function submitData(e) {
  e.preventDefault();
  const input = this.getElementsByTagName("input")[0].value;
  let desc = e.target.parentElement.childNodes[3];
  desc.style.display = "block";
  desc.textContent = input;
  console.log(desc.value);

  const form = e.target.parentElement.lastChild;
  hideElement(form);

  storeTaskInLocalStorage(input);
}
// hide a element
function hideElement(element) {
  const form = element;
  form.style.display = "none";
}
//remove a task
function tickTask(e) {
  const task = e.target.parentElement;
  console.log(task);
  if (e.target.checked) {
    task.remove();
    localStorage.removeItem("tasks");
  }
}

//get Task from LS
function getTask() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(task => {
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = `
     <input type="checkbox" class='check'>
     <p class="desc">${task}</p>
    `;
    ul.appendChild(li);
  });
}

//retrieve data from LS
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
