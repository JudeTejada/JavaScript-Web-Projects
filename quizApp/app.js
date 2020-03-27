const frontPage = document.getElementById("frontPage");
//refers to the whole parent elm that wraps panel and question
const questionContainer = document.querySelector(".question");
const startbutton = document.getElementById("startBtn");
const nextButton = document.getElementById("nextBtn");

//refers to the currect question
let progressBar = document.getElementById("progressBar");
const question = document.getElementById("questionContainer");
const questionTitle = document.getElementById("questionTitle");
const answerBtn = document.getElementById("answerButtons");
let currNum = document.getElementById("currNum");

startbutton.addEventListener("click", startGame);
nextButton.addEventListener("click", e => {
  currentQuestionIndex++;
  setNextQuestion();
  nextButton.classList.add("hide");
  tickNumber();
});

let shuffledQuestions, currentQuestionIndex;

function startGame() {
  console.log("Game Started");

  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;

  questionContainer.classList.remove("hide");
  frontPage.classList.add("hide");
  nextButton.classList.add("hide");

  //Calls to set a question
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionTitle.innerHTML = question.question;
  questionTitle.style.background = question.color;
  // loop over and sets text from each one of the button
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("question__btn");

    if (answer.correct) {
      //add a correct
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerBtn.appendChild(button);
  });
}

function resetState() {
  //remvoves the previous child and replace it with another ones
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(e) {
  const correct = e.target.dataset.correct;

  setStatusClass(document.body, correct);

  Array.from(answerBtn.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });

  progressBar.value += 10;

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    nextButton.textContent = "Restart";
    nextButton.classList.remove("hide");
    nextButton.addEventListener("click", e => {
      if (e.target) {
        location.reload();
      }
    });
  }
}

// function generateRandomColor() {
//   return "hsla(" + ~~(360 * Math.random()) + "," + "70%," + "80%,1)";
// }
function tickNumber() {
  let num = parseInt(currNum.textContent);
  num++;
  currNum.innerHTML = num;
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
  element.disabled = true;
}
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "When is the month of my Birthday? 😉",
    answers: [
      { text: "March", correct: true },
      { text: "February", correct: false },
      { text: "December", correct: false },
      { text: "April", correct: false }
    ],
    color: "#d45079"
  },

  {
    question: "What is my favorite Food? 🍩",
    answers: [
      { text: "Salad", correct: false },
      { text: "Sisig", correct: true },
      { text: "Spaghetti", correct: false },
      { text: "Donuts", correct: true }
    ],
    color: "#6e5773"
  },

  {
    question: "What is my age right now? 🙂",
    answers: [
      { text: "20", correct: false },
      { text: "30", correct: false },
      { text: "18", correct: false },
      { text: "17", correct: true }
    ],
    color: "#4a47a3"
  },

  {
    question: "What is my favorite Game? 😎",
    answers: [
      { text: "Star Wars", correct: true },
      { text: "Apex Legends", correct: true },
      { text: "Far Cry", correct: false },
      { text: "IDK", correct: false }
    ],
    color: "#efb1ff"
  },

  {
    question: "What is my favorite Anime? 😏",
    answers: [
      { text: "Overlord", correct: true },
      { text: "No game No Life", correct: false },
      { text: "Konosuba", correct: false },
      { text: "Dorohedoro", correct: false }
    ],
    color: "#b590ca"
  },

  {
    question: "What is the brand of my Phone? 📱",
    answers: [
      { text: "Samsung", correct: false },
      { text: "LG", correct: false },
      { text: "Huawei", correct: true },
      { text: "Apple", correct: false }
    ],
    color: "#bae5e5"
  },

  {
    question: "What is my favorite Manga? 📘",
    answers: [
      { text: "One punch Man", correct: true },
      { text: "Seven Deadly sins", correct: false },
      { text: "Darwin's Game", correct: false },
      { text: "Demon Slayer", correct: false }
    ],
    color: "#512b58"
  },

  {
    question: "What is my favorite Animal? 👀",
    answers: [
      { text: "Panda", correct: false },
      { text: "Cats", correct: true },
      { text: "Dog", correct: true },
      { text: "Lizard", correct: false }
    ],
    color: "#084177"
  },

  {
    question: "What is my dream place? 🌏",
    answers: [
      { text: "Japan", correct: true },
      { text: "South Korea", correct: true },
      { text: "Singapore", correct: true },
      { text: "United States", correct: true }
    ],
    color: "#81f5ff"
  },

  {
    question: "Who is my favorite Youtuber? 👨‍🎨",
    answers: [
      { text: "Pewdiepie", correct: true },
      { text: "The Futur", correct: true },
      { text: "Aculite", correct: true },
      { text: "IDK", correct: false }
    ],
    color: "#81f5ff"
  }
];
