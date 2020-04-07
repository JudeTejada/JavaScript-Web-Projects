// DOM ELEMENTS
const generateBtn = document.getElementById("btnGenerate");

const colors = document.querySelectorAll(".color");

let rangesEl;
// https://stackoverflow.com/questions/43193341/how-to-generate-random-pastel-or-brighter-color-in-javascript
function getColor() {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
}

//generate 6 color palette
function generatePalette() {
  colors.forEach((color) => {
    const hexColor = getColor();
    //set the color of each background
    color.style.background = `${hexColor}`;

    color.innerHTML = `
    <div class="detail">
    <h3 class="hexValue">${hexColor}</h3>
    <input type="color" name="changeColor" id="colorWheel">
  </div>
    `;
  });
}
generatePalette();

//Change the background of theColor
function changeColor(colorHex, parentElement, hexValue) {
  parentElement.style.background = `${colorHex}`;
  hexValue.innerText = colorHex;
}

//Listeners
generateBtn.addEventListener("click", generatePalette);

//INPUT COLOR
rangesEl = document.querySelectorAll("#colorWheel");

rangesEl.forEach((range) => {
  range.addEventListener("change", (e) => {
    //get the hex value and the parent Element
    const hexValue = range.value;
    const colorDiv = range.parentElement.parentElement;
    const hexTitle = range.parentElement.firstElementChild;

    changeColor(hexValue, colorDiv, hexTitle);
  });
});

const hexValues = document.querySelectorAll(".hexValue");

hexValues.forEach((hexValue) => {
  hexValue.addEventListener("click", (e) => {
    const textarea = document.createElement("textarea");
    const value = e.target.innerText;

    if (!value) {
      return;
    }
    textarea.value = value;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.select();
    textarea.remove();
    alert(`Text Copied to Clipboard`);
  });
});
