const gallery = document.querySelector(".result");
const btnSearch = document.getElementById("btn-search");
const btnGenerateRandom = document.getElementById("btn-random");
const API = "AcOTVrOFLmiZSTUqF_nLdWBpCsqx_c65fnPOZj9PwHg";

let page = 1;

async function fetchPhoto() {
  let queryInput = document.getElementById("searchField").value;
  let url = "https://api.unsplash.com/search/photos/";

  const response = await axios.get(
    `${url}?client_id=${API}&query=${queryInput}&page=${page}`
  );

  generatePhoto(response.data.results);
}
// async function getPhoto() {
//   let query = document.getElementById("searchField").value;
//   // url = `https://api.unsplash.com/photos/random/?client_id=${API}`;
//   const response = await axios.get(
//     `https://api.unsplash.com/search/photos/?client_id=${API}&query=${query}&page=${page}`
//   );
//   generatePhoto(response.data.results);
// }

//generate a gallery of photo
function generatePhoto(data) {
  //loop thruough over and add photo
  gallery.innerHTML = ` ${data.map((data) => template(data)).join("")}`;
}

//template of photo
function template(data) {
  const template = `
    <figure class="gallery">
      <img src="${data.urls.regular}" alt="${data.alt_description}" </img>
      <p>${data.alt_description}</p>
    </figure>
  `;
  return template;
}

btnGenerateRandom.addEventListener("click", fetchPhoto);
btnSearch.addEventListener("click", fetchPhoto);
