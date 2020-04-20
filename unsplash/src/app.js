const input = document.getElementById("searchField");
const result = document.querySelector(".result");
const btnSearch = document.getElementById("btn-search");
const btnGenerateRandom = document.getElementById("btn-random");
const API = "PzB5c1b2uV4yKZh4c_kUO5b8qDdw0wsEz3m_y9wTbLg";

let page = 1;

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
  const response = await axios.get(
    `${url}?client_id=${API}&query=${query}&page=${page}`
  );
  generatePhoto(response.data.results);
  clearField(input);
}
//fetch a random photo on the API
async function fetchRandomPhoto(url) {
  const response = await axios.get(`${url}?client_id=${API}&count=10`);
  generateRandomPhoto(response.data);
}

//generate a gallery of random photos
function generateRandomPhoto(data) {
  result.innerHTML = `
  <div class="gallery">
  ${data.map((data) => templatePhoto(data)).join("")}
  </div>
  <button class="btnLoad"
  data-query="${data.map((desc) => desc.alt_description)}">Load More</button>
  `;
}

//generate a gallery of photo
function generatePhoto(data) {
  //loop thruough over and add photo
  result.innerHTML = ` 
  <div class="gallery">
    ${data.map((data) => templatePhoto(data)).join("")}
  </div>
  <button class="btnLoad"
  data-query="${data.map((data) =>
    data.tags.map((tags) => tags.title)
  )}">Load More</button>
  `;
}
//load the photos  from tags
function loadPhotoFromTags(tag) {
  tag.map((data) => {
    //create a div
    const photoEl = document.createElement("div");
    //add a classname
    photoEl.classList.add("gallery-pic");
    // generate template for each div
    photoEl.innerHTML = `${templatePhoto(data)}`;
    //apend photo to gallery
    document.querySelector(".gallery").appendChild(photoEl);
  });
}
//fetch photo from the tags inside of btn
async function fetchPhotoFromTags(tags) {
  //convert to array
  const querytags = tags.split(",");

  page++;
  const response = await axios.get(
    `https://api.unsplash.com/search/photos/?client_id=${API}&query=${querytags[0]}&page=${page}`
  );

  loadPhotoFromTags(response.data.results);
}
//clears the value
function clearField(elm) {
  elm.value = "";
}

//template of photo
function templatePhoto(data) {
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

// LISTENERS
btnGenerateRandom.addEventListener("click", fetchPhoto);
btnSearch.addEventListener("click", fetchPhoto);
result.addEventListener("click", (e) => {
  const clickedEl = e.target;
  // check if btn that was clicked was a btn
  if (clickedEl.tagName === "BUTTON") {
    const tags = clickedEl.getAttribute("data-query");

    fetchPhotoFromTags(tags);
  }
});
