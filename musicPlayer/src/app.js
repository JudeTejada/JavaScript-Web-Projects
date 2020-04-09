const progressBar = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevSongBtn = document.getElementById("prevSong");
const playOrPauseBtn = document.getElementById("playOrPause");
const nextSongBtn = document.getElementById("nextSong");
const cover = document.getElementById("songCover");
const songTitle = document.getElementById("songTitle");
const playOrPauseIcon = document.getElementById("playOrPauseIcon");
const songStatusBtn = document.getElementById("songStatus");
const increaseVolumeBtn = document.getElementById("increaseVolume");
const decreaseVolumeBtn = document.getElementById("decreaseVolume");
const audio = document.getElementById("audio");
//SONGS
const songs = ["music1", "music2", "music3"];

//Current Song
let songIndex = 1;

loadSong(songs[songIndex]);

//Load the current Song
function loadSong(song) {
  songTitle.innerText = song;
  cover.src = `src/assets/photo/${song}.jpg`;
  audio.src = `src/assets/music/${song}.mp3`;

  audio.play();
}

function playOrPause() {
  if (audio.paused) {
    playOrPauseIcon.src = `src/assets/Pause.png`;
    audio.play();
  } else {
    playOrPauseIcon.src = `src/assets/Play.png`;
    audio.pause();
  }
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = 2;
  }
  playOrPauseIcon.src = `src/assets/Pause.png`;
  loadSong(songs[songIndex]);
}

function nextSong() {
  songIndex++;

  if (songIndex > 2) {
    songIndex = 0;
  }
  playOrPauseIcon.src = `src/assets/Pause.png`;
  loadSong(songs[songIndex]);
}

function decreaeVolume() {
  audio.volume -= 0.2;
}

function increaseVolume() {
  audio.volume += 0.2;
}
function updateProgress(e) {
  //get the duration and the current time of the audio
  const { duration, currentTime } = e.srcElement;

  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  //clientWidth
  const width = this.clientWidth;
  // the width of the ProgressContainer
  const clickedWidth = e.offsetX;
  //get the duration of the song
  const duration = audio.duration;

  // console.log(width, clickedWidth, duration);

  //set the timeskip of the audio
  audio.currentTime = (clickedWidth / width) * duration;
}

//Set current progress of the song
progressContainer.addEventListener("click", setProgress);
//Update the time time
audio.addEventListener("timeupdate", updateProgress);
// set new song when song is edned
audio.addEventListener("ended", nextSong);
//CONTROLS
playOrPauseBtn.addEventListener("click", playOrPause);
prevSongBtn.addEventListener("click", prevSong);
nextSongBtn.addEventListener("click", nextSong);
increaseVolumeBtn.addEventListener("click", increaseVolume);
decreaseVolumeBtn.addEventListener("click", decreaeVolume);

songStatusBtn.addEventListener("click", (e) => {
  if (songStatusBtn.className === "loud") {
    songStatusBtn.classList.remove("loud");
    songStatusBtn.classList.add("mute");
    audio.muted = true;
    songStatusBtn.innerText = "Muted";
  } else {
    songStatusBtn.classList.replace("mute", "loud");
    audio.muted = false;
    songStatusBtn.innerText = "Loud";
  }
});
