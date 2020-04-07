const billInput = document.getElementById("bill");
const tipInput = document.getElementById("tip");
const peopleInput = document.getElementById("people");
const tipResultEl = document.getElementById("tipResult");
const totalResultEl = document.getElementById("totalResult");
const wrapper = document.querySelector(".wrapper");

const btns = document.querySelectorAll("button");
const personEl = document.querySelectorAll("#personEl");
const calculate = () => {
  if (!billInput.value && !tipInput.value && !peopleInput.value) return;

  const cost = parseInt(billInput.value);
  const percentage = parseFloat(tipInput.value) / 100.0;
  const perPerson = parseInt(peopleInput.value);
  const tip = cost * percentage;
  let totalAmount;

  if (isNaN(perPerson) || perPerson === 0 || perPerson === 1) {
    totalAmount = tip + cost;

    tipResultEl.innerText = `$${tip}`;
    totalResultEl.innerText = `$${totalAmount}`;
  } else {
    totalAmount = tip + cost;
    const billPerPerson = totalAmount / perPerson;
    const tipPerPerson = tip / perPerson;

    tipResultEl.innerText = `$${tipPerPerson.toFixed(2)}`;
    totalResultEl.innerText = `$${billPerPerson.toFixed(2)}`;

    personEl.forEach((elm) => {
      elm.innerText = "per person";
    });
  }
};

wrapper.addEventListener("keyup", (e) => {
  if (event.defaultPrevented) {
    return;
  }
  const key = e.key || e.keyCode;

  if (key === "Enter" || key === 13) {
    calculate();
  }
});

// Increment if btn + was clicked
const incrementNumber = (input) => {
  const inputVal = parseInt(input.value);
  let num = 0;

  if (!inputVal || isNaN(inputVal)) {
    num++;

    input.value = num;
  } else {
    num = inputVal + 1;
    input.value = num;
  }
  calculate();
};

//Decrement if btn - was clicked
const decrementNumber = (input) => {
  const inputVal = parseInt(input.value);

  let num;
  if (!inputVal || inputVal === 0 || isNaN(inputVal)) return;
  num = inputVal - 1;
  input.value = num;
};
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const btnClicked = e.target.innerText;

    let input;

    if (btnClicked === "+") {
      input = e.target.previousElementSibling;
      incrementNumber(input);
    } else {
      input = e.target.nextElementSibling;
      decrementNumber(input);
    }
  });
  calculate();
});

billInput.addEventListener("input", calculate);
