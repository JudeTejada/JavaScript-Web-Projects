//dom elements
const searchSong = document.getElementById("searchSong");
const songs = document.getElementById("songs");

//fetch Song
const fetchSong = async (data) => {
  const response = await axios.get(`https://api.lyrics.ovh/suggest/${data}`);
  await printSongs(response.data);
};

const printSongs = async (data) => {
  // /Iterate and print Data
  songs.innerHTML = `
    <div class="songs">
    
    ${data.data
      .map(
        (song) =>
          `
        <div class="card">
        <div class="card__left">
          <img src="${song.album.cover}" alt="Album Photo" />
        </div>
        <div class="card__right">
          <h2 class="card__song">${song.title}</h2>
          <h3 class="card__artist">${song.artist.name}</h3>
          <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
        </div>
        </div>
      `
      )
      .join("")}
       
    </div>
  `;
};

const getLyrics = async (artist, title) => {
  const response = await axios.get(
    `https://api.lyrics.ovh/v1/${artist}/${title}`
  );

  const data = await response.data;

  if (data.error) {
    songs.innerHTML = data.error;
  } else {
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

    songs.innerHTML = `
    <h2>${title}</h2>
    <h3>${artist}</h3>

    <span>${lyrics}</span>
  `;
  }
};
// after 5s call fetchSong with the data was pass in
const onInput = async (e) => {
  await fetchSong(e.target.value.trim());
};

/* LISTENERS */

// call OnInput af .5s
searchSong.addEventListener("input", debounce(onInput, 500));

songs.addEventListener("click", (e) => {
  const clickedEl = e.target;

  if (clickedEl.tagName === "BUTTON") {
    //get The Attributes
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");
    //Calll Func to get Lyrics
    getLyrics(artist, songTitle);
  }
});
