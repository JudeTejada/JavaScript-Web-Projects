const input = document.getElementById("searchField");
const result = document.querySelector(".result");
const btnSearch = document.getElementById("btn-search");
const btnGenerateRandom = document.getElementById("btn-random");
const API = "AcOTVrOFLmiZSTUqF_nLdWBpCsqx_c65fnPOZj9PwHg";

let page = 0;

async function fetchPhoto() {
  let queryInput = input.value;

  // if no input value was provided
  if (!queryInput) {
    url = "https://api.unsplash.com/photos/random/";
    fetchRandomPhoto(url);
  } else {
    url = "https://api.unsplash.com/search/photos/";
    fetchPhotoByQuery(url, queryInput);
  }
}

//fetch photo by search  type of photo
async function fetchPhotoByQuery(url, query) {
  page++;
  const response = await axios.get(
    `${url}?client_id=${API}&query=${query}&page=${page}`
  );
  generatePhoto(response.data.results);
  clearField(input);
}
//fetch a random photo on the API
async function fetchRandomPhoto(url) {
  const response = await axios.get(`${url}?client_id=${API}&count=10`);
  generatePhoto(response.data);
}

//generate a gallery of photo
function generatePhoto(data) {
  //loop thruough over and add photo
  result.innerHTML = ` 
  <div class="gallery">
    ${data.map((data) => template(data)).join("")}
  </div>
  <button class="btnLoad" onclick="loadMorePhoto()" 
  data-query="${data.map((data) =>
    data.tags.map((tags) => tags.title)
  )}">Load More</button>
  `;
}

function loadMorePhoto() {
  const query = input.value;
  console.log(query);
}
function clearField(elm) {
  elm.value = "";
}

//template of photo
function template(data) {
  console.log(data);
  const template = `
  <a href="${data.urls.regular}" target="_blank">
      <figure class="gallery-pic">
          <img src="${data.urls.regular}" alt="${data.alt_description}" loading="lazy" </img>
          <h2>By: <strong>${data.user.name}</strong></h2>
      </figure>
   </a>
 
  `;
  return template;
}

btnGenerateRandom.addEventListener("click", fetchPhoto);
btnSearch.addEventListener("click", fetchPhoto);
