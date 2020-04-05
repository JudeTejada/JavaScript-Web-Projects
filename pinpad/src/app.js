const numberBtns = document.querySelectorAll(".btn");
const inputVal = document.querySelector("#answer");

const btnConfirm = document.getElementById("btnConfirm");
const btnClear = document.getElementById("btnClear");
const btnDelete = document.getElementById("btnDelete");

//Youll blind your eyes if you look at your console
let answer = "2002";
//loop through all btns and add a listener
for (btn of numberBtns) {
  btn.addEventListener("click", insertText);
}

//gets btn value and insert to input dom
function insertText(e) {
  e.preventDefault();
  const btnValue = e.target.innerText;
  inputVal.value += btnValue;
}

function clearValue(e) {
  e.preventDefault();
  inputVal.value = "";
}
function checkValue(e) {
  e.preventDefault();
  let currAnswer = inputVal.value;

  if (currAnswer !== answer) {
    setStatus("red", "Try Again");
  } else {
    setStatus("green", "You Cracked the code");
  }
  inputVal.value = "";
}
function deleteValue(e) {
  e.preventDefault();
  //get value
  const res = inputVal.value;
  //decrease value by index
  let value = res.substring(0, res.length - 1);
  inputVal.value = value;
}

function setStatus(color, msg) {
  const div = document.createElement("div");
  div.className = color;
  div.innerText = msg;

  const form = document.querySelector("form");
  const wrapper = document.querySelector(".wrapper");
  wrapper.insertBefore(div, form);

  setTimeout(() => {
    div.remove();
  }, 2500);
}

btnConfirm.addEventListener("click", checkValue);
btnDelete.addEventListener("click", deleteValue);
btnClear.addEventListener("click", clearValue);
