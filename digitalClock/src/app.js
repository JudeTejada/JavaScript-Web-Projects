function setTime() {
  const time = new Date();
  let minute = time.getMinutes();
  let hours = time.getHours();

  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minute = minute < 10 ? "0" + minute : minute;

  document.querySelector(".clock").innerHTML = `
 <h1>${hours} : ${minute} <span>${ampm}</span></h1>
 `;
}

setInterval(setTime, 1000);
