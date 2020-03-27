/// Functionality
//Show the Clipboard when a value is declared
//set the Boarder depending on the input that was pick

//declare selectors

//add a listener for each input and we pass down the value and sends it to a function to modify
const input1 = document.querySelector("#topLeft");
const input2 = document.querySelector("#topRight");
const input3 = document.querySelector("#bottomLeft");
const input4 = document.querySelector("#bottomRight");

const button = document
  .querySelector("button")
  .addEventListener("click", copyText);
const clipboard = document.querySelector("#code");

const box = document.querySelector(".box");
const input = document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", setBorderRadius);
});

function setBorderRadius(e) {
  console.log(document.documentElement.style);
  document.documentElement.style.setProperty(
    `--${e.target.name}`,
    e.target.value,

    setClipboard()
  );
}

function setClipboard() {
  const html = `
  -webkit-border-radius: ${input1.value}px ${input2.value}px ${input3.value}px ${input4.value}px
  -moz-border-radius: ${input1.value}px ${input2.value}px ${input3.value}px ${input4.value}px
  border-radius:${input1.value}px ${input2.value}px ${input3.value}px ${input4.value}px
  `;

  clipboard.innerHTML = html;
}

function copyText() {
  clipboard.select();
  clipboard.setSelectionRange(0, 9999);
  document.execCommand("copy");
}
