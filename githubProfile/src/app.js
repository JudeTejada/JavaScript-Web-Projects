// DOM SELECTORS
const profileCard = document.querySelector("#profile");
const repositoriesCard = document.querySelector("#repo");
const searchInput = document.querySelector("#searchProfile");
const darkTheme = document.querySelector("#darkTheme");

//send request to API
const fetchProfile = async (user) => {
  const clientID = "a199f988c27bbef170e5";
  const clientSecret = "23e9859127471c8257c540f05b36c145a0dbfa80";
  const repos_count = 5;
  const repos_sort = "created:asc";

  const profileResponse = await axios.get(
    `https://api.github.com/users/${user}?client_id=${clientID}&client_secret=${clientSecret}`
  );

  const repoResponse = await axios.get(
    `https://api.github.com/users/${user}/repos?per_page=${repos_count}&sort=${repos_sort}&client_id=${clientID}&client_secret=${clientSecret}`
  );

  const profileData = await profileResponse.data;
  const repoData = await repoResponse.data;

  //return data
  return {
    profileData,
    repoData,
  };
};

//check for validation
const validateInput = () => {
  const userText = searchInput.value;

  //call api
  fetchProfile(userText)
    .then((data) => {
      //display to dom
      templateProfile(data.profileData);
      templateRepo(data.repoData);
    })
    //if no user was found
    .catch((err) => sendMessage("Unable to Find User"));
  //clear all the data
  clearValues();
};

//template for profile card
const templateProfile = (data) => {
  profileCard.innerHTML = `
  <div class="profile">
    <div class="profile__image">
      <img src="${data.avatar_url}" placeholder="User Profile" class="profile__photo"/>
    </div>

    <div class="profile__bio">
      <h3>Name: <strong>${data.name}</strong></h3>
      <h3>Username: <strong>${data.login}</strong></h3>
      <h3>Bio: <strong>${data.bio}</strong></h3>
      <h3>Followers: <strong>${data.followers}</strong></h3>
      <h3>Following: <strong>${data.following}</h3>
    </div>
  </div>
  `;
};

//template for Card Repo
const templateRepo = (repos) => {
  console.log(repos);
  let output = "";
  //loop on each repo
  repos.forEach((repo) => {
    output += `
    <div class="card">
     <h3 class="card__name">${repo.name}</h3>
      <div class="card__details">
        <span class="card__text">Language: <strong>${repo.language}</strong></span>
        <span class="card__text">Stars: <strong>${repo.stargazers_count}</strong></span>
        <span class="card__text">Forks: <strong>${repo.forks}</strong></span>
        <span class="card__text">Watchers: <strong>${repo.watchers}</strong></span>

      </div>
    </div>
    `;
  });

  //add all of the car
  repositoriesCard.innerHTML = `
  <br>
  <br>
  <h2>Popular Repositories</h2>
  ${output}`;
};
//if user is null
function sendMessage(msg) {
  profileCard.innerHTML = `
  <div class="message">
  <h1>Sorry No user was Found 😟</h1>
    <p>Its either that you entered something wrong or an issue</p>
  </div>

  `;
}

//reset value
function clearValues() {
  profileCard.innerHTML = "";
  repositoriesCard.innerHTML = "";
  searchInput.value = "";
}

searchInput.addEventListener("keypress", debounce(validateInput));
//dark theme
darkTheme.addEventListener("change", () => {
  if (darkTheme.checked) {
    document.body.classList.replace("light", "dark");
  } else {
    document.body.classList.replace("dark", "light");
  }
});
