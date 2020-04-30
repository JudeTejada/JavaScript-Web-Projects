const randomColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

// DOM SELECTORS
const profileCard = document.querySelector("#profile");
const repositoriesCard = document.querySelector("#repo");
const chartCard = document.querySelector("#chart");
const searchInput = document.querySelector("#searchProfile");
const darkTheme = document.querySelector("#darkTheme");
const chartContent = document.querySelector("#chart-content");

//send request to API
const fetchProfile = async (user) => {
  addLoader();

  const clientID = "a199f988c27bbef170e5";
  const clientSecret = "23e9859127471c8257c540f05b36c145a0dbfa80";
  const repos_count = 5;
  const repos_sort = "created:asc";

  const profileResponse = await axios.get(
    `https://api.github.com/users/${user}?client_id=${clientID}&client_secret=${clientSecret}`
  );

  const topRepoResponse = await axios.get(
    `https://api.github.com/users/${user}/repos?per_page=${repos_count}&sort=${repos_sort}&client_id=${clientID}&client_secret=${clientSecret}`
  );

  const repositoriesExtra = await axios.get(
    `https://api.github.com/users/${user}/repos?type=owner&sort=updated&per_page=100`
  );

  const profileData = await profileResponse.data;
  const repoData = await topRepoResponse.data;
  const allRepos = await repositoriesExtra.data;

  //return data
  return {
    profileData,
    repoData,
    allRepos,
  };
};

function addLoader() {
  profileCard.innerHTML = `
  <div class="container-loader">
    <div id="balls"></div>
  </div>
  `;

  repositoriesCard.innerHTML = `
  <div class="container-loader">
    <div id="balls"></div>
  </div>
`;

  chartContent.innerHTML = `
  
  <div class="container-loader">
    <div id="balls"></div>
  </div>

  <div class="container-loader">
    <div id="balls"></div>
  </div>
  
`;
}

//check for validation
const validateInput = () => {
  const userText = searchInput.value;

  //call api
  fetchProfile(userText)
    .then((data) => {
      addLoader();
      //display to dom
      setTimeout(() => {
        templateProfile(data.profileData);
        templateRepo(data.repoData);
        templateChart(data.allRepos);
      }, 4000);
    })
    //if no user was found
    .catch((err) => sendMessage("Unable to Find User"));
  //clear all the data
  clearValues();
};

const templateChart = (repos) => {
  chartContent.innerHTML = `

      
  <div class="chart__languages">
  <h2 class="chart__title">Top Languages</h2>
  <canvas id="topLanguages"></canvas>
  </div>
  <div class="chart__mostStarred">
  <h2 class="chart__title">Most Starred</h2>
  <canvas id="mostStarred"></canvas>
  </div>

`;

  topLanguagesChart(repos);
  createMostStarredChart(repos);
};

const topLanguagesChart = (repos) => {
  const ctx = document.getElementById("topLanguages").getContext("2d");
  const opts = {
    type: "pie",
    responsive: true,
    maintainAspectRatio: false,
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
    },
    options: {
      legend: {
        position: "right",
      },
    },
  };
  //hold languages
  const languageArray = [];

  for (let repo of repos) {
    //get all the language of each repo
    languageArray.push(repo.language);
  }
  //filter out that are null
  const filterNull = languageArray.filter((data) => data != null);
  //remove Duplicates
  const final = Array.from(new Set(filterNull));

  final.forEach((language) => {
    opts.data.labels.push(language);
    opts.data.datasets[0].data.push(1);
    opts.data.datasets[0].backgroundColor.push(randomColor());
  });

  const chart = new Chart(ctx, opts);
};

const createMostStarredChart = (repo) => {
  //get repos that have the highest stars
  const mostStarred = repo.sort((a, b) => {
    b.stargazers_count - a.stargazers_count;
  });
  const ctx = document.getElementById("mostStarred").getContext("2d");

  const opts = {
    type: "bar",
    responsive: true,
    maintainAspectRatio: false,
    data: {
      labels: mostStarred.map((i) => i.name),
      datasets: [
        {
          label: "Most Starred",
          data: mostStarred.map((i) => i.stargazers_count).slice(0, 5),
          backgroundColor: [...Array(5)].map((i) => randomColor()),
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
    },
  };

  new Chart(ctx, opts);
};

//template for profile card
const templateProfile = (data) => {
  profileCard.innerHTML = `
    <div class="profile">
      <div class="profile__image">
        <img src="${data.avatar_url}" placeholder="User Profile" class="profile__photo" loading="lazy"/>
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
  chartContent.innerHTML = "";
}

//reset value
function clearValues() {
  profileCard.innerHTML = "";
  repositoriesCard.innerHTML = "";
  chartContent.innerHTML = "";
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
