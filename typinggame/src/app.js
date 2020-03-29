const list = [
  "ACCOUNT",
  "ACCURATE",
  "ACRES",
  "ACROSS",
  "ACT",
  "ACTION",
  "ACTIVE",
  "ACTIVITY",
  "ACTUAL",
  "ACTUALLY",
  "ADD",
  "ADDITION",
  "ADDITIONAL",
  "ADJECTIVE"
];

const input = document.getElementById("answer");

const word = document.getElementById("word");
const score = document.getElementById("score");
const timeLeft = document.getElementById("time");
const container = document.querySelector(".wrapper");

let time = 10;
let highScore = 0;
let random;

let countdown;

//generate a random word
const randomWord = () => {
  return list[Math.floor(Math.random() * 15)];
};

//add word to DOm
const addWord = () => {
  random = randomWord();
  word.textContent = random;
};

//Update the score
const updateScore = () => {
  highScore++;
  score.textContent = highScore;

  addWord();
  input.value = "";
};

//reduce the time every second
const updateTime = () => {
  time--;
  timeLeft.innerHTML = `${time} s`;

  if (time === 0) {
    clearInterval(countdown);
    // end game
    gameOver();
  }
};

const gameOver = () => {
  container.innerHTML = `
  <br>
  <h2>Time Ran out</h2>
  <h3>Your Score is: <strong>${highScore}</strong></h3>
  <br>
  <button id="btn-start" onclick="location.reload()">Start</button>
  <br> 
  <br> 
  <br> 
  `;
};

addWord();
//Start Countdown
countdown = setInterval(updateTime, 1000);

input.addEventListener("input", e => {
  const insertedText = e.target.value.toUpperCase();
  console.log(insertedText);
  if (insertedText === random) {
    addWord();
    updateScore();
    time += 5;
  }
});
