// DOM SELECTORS
const totalDeaths = document.getElementById("totalDeaths"),
  totalRecovered = document.getElementById("totalRecovered"),
  totalConfirmed = document.getElementById("totalConfirmed");

const searchCountryInput = document.getElementById("searchCountry");
const bottomDashboard = document.getElementById("bottomDashboard");

//fetch total data of global
const fetchGlobalData = async () => {
  const response = await axios.get("https://api.covid19api.com/summary");

  return response.data;
};
//fetch data by a county
const fetchSpecificCountry = async () => {
  let inputValQuery = searchCountryInput.value;
  const response = await axios.get(
    `https://api.covid19api.com/live/country/${inputValQuery}`
  );
  return response.data;
};

const queryCountry = async () => {
  displayLoader();
  fetchSpecificCountry()
    .then((data) => {
      const array = [];
      for (let i = 0; i < data.length; i++) {
        array.push(i);
      }
      //find the last num
      const lastNum = array.slice(-1)[0];
      countryDashboard(data[lastNum]);
    })
    .catch((err) => sendError());
};

//DATA FOR TOTAL DATA OF  WORLD
const templateDashboard = async () => {
  const data = await fetchGlobalData();

  totalDeaths.textContent = data.Global.TotalDeaths;
  totalRecovered.textContent = data.Global.TotalRecovered;
  totalConfirmed.textContent = data.Global.TotalConfirmed;
};
//template for query a Country
const countryDashboard = (country) => {
  if (!country) {
    sendError();
    return;
  }
  setTimeout(() => {
    bottomDashboard.innerHTML = `
    <div class="dashboard grid">
      <div class="card orange">
      <i class="fas fa-virus"></i>
      <h2 class="card__number" id="totalConfirmedCountry">${country.Confirmed}</h2>
      <p>Total Confirmed</p>
     </div>
  
    <div class="card red">
      <i class="fas fa-virus"></i>
      <h2 class="card__number" id="totalDeathsCountry">${country.Deaths}</h2>
      <p>Total Deaths</p>
    </div>
  
    <div class="card green">
      <i class="fas fa-virus"></i>
      <h2 class="card__number" id="totalRecoveredCountry">${country.Recovered}</h2>
      <p>Total Recovered</p>
    </div>
    </div>
    
    `;
  }, 1500);
};
//display the Loader
const displayLoader = () => {
  bottomDashboard.innerHTML = `
   <div class="loader">
    <svg viewBox="25 25 50 50">
      <circle cx="50" cy="50" r="20"></circle>
    </svg>
  </div>
  `;
};
//sends Error Message
const sendError = () => {
  bottomDashboard.innerHTML = `
  <div class="message">
    <h1 class="message__title">Sorry Please Try again</h1>
  <div>
  `;
};
//init
templateDashboard();
searchCountryInput.addEventListener("keypress", debounce(queryCountry));
