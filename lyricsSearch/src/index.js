//dom elements
const searchSong = document.getElementById("searchSong");
const songs = document.getElementById("songs");

//fetch Song
const fetchSong = async (data) => {
  const response = await axios.get(`https://api.lyrics.ovh/suggest/${data}`);

  await printSongs(response.data);
};

const printSongs = async (data) => {
  // const term = await data.data;

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
        </div>
        </div>
      `
      )
      .join("")}
       
    </div>
    
  `;
};

// `
// <ul class="songs">
// ${data.data
//   .map(
//     (song) => `<li>
// <span><strong>${song.artist.name}</strong> - ${song.title}</span>
// <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
// </li>`
//   )
//   .join("")}
// </ul>
// `;
