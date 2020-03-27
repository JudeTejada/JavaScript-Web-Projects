const form = document
  .querySelector("form")
  .addEventListener("submit", function(e) {
    e.preventDefault();
    calcTime();
  });

const eventName = document.querySelector("#eventName");

const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24,
  startTimer = "";

function calcTime() {
  //gets the date from the input
  let datePicked = document.querySelector("#eventDate").value;

  //get the time from the data that was pick
  const date = new Date(datePicked).getTime();
  const now = new Date().getTime();

  //calculate the distance of the time
  const distance = date - now;

  document.querySelector("#days").innerHTML = Math.floor(distance / day);
  document.querySelector("#hours").innerHTML = Math.floor(
    (distance % day) / hour
  );
  document.querySelector("#minutes").innerHTML = Math.floor(
    (distance % hour) / minute
  );
  document.querySelector("#seconds").innerHTML = Math.floor(
    (distance % minute) / second
  );

  document.querySelector("#eventTitle").innerHTML = eventName.value;
  if (now >= date) {
    showError();
  }

  startTimer = setInterval(function() {
    calcTime();
  }, 1000);

  clearInput();
}

function setCountdown() {}

function showError() {
  alert("Erro date is greater than current Time");

  clearFields();
}

function clearFields() {
  document.querySelector("#days").innerHTML = "";
  document.querySelector("#hours").innerHTML = "";
  document.querySelector("#minutes").innerHTML = "";
  document.querySelector("#seconds").innerHTML = "";
  document.querySelector("#eventTitle").innerHTML = "";

  clearInput();
}

function clearInput() {
  eventDate.value = "";
  eventName.value = "";
}
