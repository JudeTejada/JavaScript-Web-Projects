window.addEventListener("keydown", playSoundByPress);
window.addEventListener("keyup", removeTransition);
document.querySelector(".keys").addEventListener("click", playSoundByClick);

function removeTransition(e) {
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

  key.classList.remove("playing");
}
function playSoundByPress(e) {
  //dom elem
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

  console.log(key.style.get);
  key.classList.add("playing");
  audio.currenTime = 0;
  audio.play();
}

function playSoundByClick(e) {
  const clickedEl = e.target.getAttribute("data-key");

  const audio = document.querySelector(`audio[data-key="${clickedEl}"]`);
  const key = document.querySelector(`div[data-key="${clickedEl}"]`);
  if (key === null && audio === null) return;

  key.classList.add("playing");
  audio.currenTime = 0;
  audio.play();
}
