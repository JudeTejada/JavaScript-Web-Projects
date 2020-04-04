//dom elements
const searchSong = document.getElementById("searchSong");
const songs = document.getElementById("songs");
const loader = document.getElementById("loader");

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
          <img src="${song.album.cover}" alt="Album Photo" class="card__photo">
          <div class="card__content">
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
    <div class="lyrics">
      <h2 class="lyrics__title">${title}</h2>
      <h3 class="lyrics__artist">By: ${artist}</h3>
      <span class="lyrics__paragraph" id="foo">${lyrics}</span>
    </div>
  
  `;
  }
};
const test = (e) => {};
// after 5s call fetchSong with the data was pass in
const onInput = async (e) => {
  if (e.target.value === "") {
    return "";
  } else {
    showLoader();
    setTimeout(async () => {
      await fetchSong(e.target.value.trim());
    }, 600);
  }
};

const showLoader = () => {
  loader.classList.remove("hide");

  setTimeout(() => {
    loader.classList.add("hide");
  }, 2000);
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
