const secondHand = document.querySelector(".second-hand");
const hourHand = document.querySelector(".hour-hand");
const minHand = document.querySelector(".minute-hand");
function setTime() {
  const now = new Date();
  const seconds = now.getSeconds();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  //turns into deg
  const secondsDegrees = (seconds / 60) * 360 + 90;
  const hoursDegrees = (hours / 12) * 360 + 90;
  const minutesDegrees = (minutes / 60) * 360 + 90;

  secondHand.style.setProperty("--rotation", secondsDegrees);
  hourHand.style.setProperty("--rotation", hoursDegrees);
  minHand.style.setProperty("--rotation", minutesDegrees);
}

//call the function everry 1s
setInterval(setTime, 1000);
