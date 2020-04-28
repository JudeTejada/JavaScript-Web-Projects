const holes = document.querySelectorAll(".holes");
const scoreBoard = document.querySelector("#score");
const secondsLeft = document.querySelector("#secondsLeft");
const moles = document.querySelectorAll(".mole");
const modal = document.querySelector("#gameOver");
const modalContainer = document.querySelector(".overlay");
// let timeUp = false;
let score = 0;
let timer = 10;
let lasthole, countdown, startGame;

//generate a random mole
const randomMole = () => {
  //removes show
  holes.forEach((className) => className.classList.remove("show"));
  //get random position of a hole
  const randomPosition = Math.floor(Math.random() * holes.length);

  //set the position on the hold
  const hole = holes[randomPosition];
  //shows mole
  hole.classList.add("show");

  // prevents from moles popping up again
  if (hole === lasthole) {
    return randomMole(holes);
  }
  //set lasthole to first mole
  lasthole = hole;
};

// update's the score
const updateScore = (e) => {
  if (!e.isTrusted) return;
  score++;
  //this refers to the hole
  const hole = e.target.parentElement;
  hole.classList.remove("show");
  scoreBoard.textContent = score;
};

//stops the game
const gameOver = () => {
  modalContainer.classList.remove("hide");
  modal.innerHTML = `
  <h1 class="modal__title">Game Over!</h1>
  <p class="modal__desc"> Your Score is: <strong>${score}</strong></p>

  <button onClick="restart()" class="modal__btn">Restart</button>
  `;
};

const startCountdown = () => {
  timer--;
  secondsLeft.textContent = `${timer} s`;

  if (timer === 0) {
    score = 0;
    scoreBoard.textContent = score;
    holes.forEach((className) => className.classList.remove("show"));
    clearInterval(countdown);
    clearInterval(startGame);

    gameOver();
  }
};

const restart = () => {
  modalContainer.classList.add("hide");
  timer = 10;

  countdown = setInterval(startCountdown, 1000);
  startGame = setInterval(randomMole, 1000);
};

countdown = setInterval(startCountdown, 1000);
startGame = setInterval(randomMole, 1000);

moles.forEach((mole) => mole.addEventListener("click", updateScore));
