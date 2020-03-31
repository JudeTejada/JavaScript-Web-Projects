// DOM ELEMENTS
const btnGenerate = document.getElementById("btn-generate");
const btnCopy = document.getElementById("btn-copy");

const result = document.getElementById("newPassword");

const uppercaseCheck = document.getElementById("uppercaseCheck");
const lowercaseCheck = document.getElementById("lowercaseCheck");
const numberCheck = document.getElementById("numberCheck");
const symbolCheck = document.getElementById("symbolCheck");
const characterAmount = document.getElementById("length");

// Objects
const randomFunc = {
  lower: getRandomLowerCase,
  upper: getRandomUpperCase,
  number: getRandomNumber,
  symbol: getRandomSymbol
};
// listen to generate a password
btnGenerate.addEventListener("click", () => {
  const length = +characterAmount.value;

  const includeUppercase = uppercaseCheck.checked;
  const includeLowercase = lowercaseCheck.checked;
  const includeNumberCheck = numberCheck.checked;
  const includesymbolCheck = symbolCheck.checked;

  result.innerText = generatePassword(
    includeLowercase,
    includeUppercase,
    includeNumberCheck,
    includesymbolCheck,
    length
  );
});
//Copy to Clipboard
btnCopy.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = result.innerText;

  if (!password) {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password Copied to Clipboard");
});

//Generate password
function generatePassword(lower, upper, number, symbol, length) {
  //1. pw variable
  //2. filter out unchecked types
  //3. Loop over length call generator function for each type
  //4. add the pw var and return

  let generatedPassword = "";
  //check how many checkbox are checked
  const typesCount = lower + upper + number + symbol;
  console.log("typesCount:", typesCount);
  // const arr = [lower, upper, number, symbol];
  // console.log("Array:", arr);
  //wrap in an object and filter out that is only checked
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    item => Object.values(item)[0]
  );
  console.log("typesArr:", typesArr);

  //check if all checkbox are unchecked
  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      console.log("funcName:", funcName);

      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

// Generator Functions
function getRandomLowerCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpperCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
