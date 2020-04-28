// DOM SELECTORS
const totalDeaths = document.getElementById("totalDeaths"),
  totalRecovered = document.getElementById("totalRecovered"),
  totalConfirmed = document.getElementById("totalConfirmed");

const searchCountryInput = document.getElementById("searchCountry");
const bottomDashboard = document.getElementById("bottomDashboard");

const counter = document.querySelectorAll(".counter");
//fetch total data of global
const fetchGlobalData = async () => {
  const response = await axios.get("https://api.covid19api.com/summary");

  return response.data;
};
//fetch data by a county
const fetchSpecificCountry = async (inputValQuery) => {
  const response = await axios.get(
    `https://api.covid19api.com/total/country/${inputValQuery}`
  );

  return response.data;
};

const queryCountry = async () => {
  let inputValQuery = searchCountryInput.value || "Philippines";
  displayLoader();
  fetchSpecificCountry(inputValQuery)
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
  const speed = 200;
  const data = await fetchGlobalData();

  totalDeaths.setAttribute("data", `${data.Global.TotalDeaths}`);
  totalRecovered.setAttribute("data", `${data.Global.TotalRecovered}`);
  totalConfirmed.setAttribute("data", `${data.Global.TotalConfirmed}`);

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data");
      const count = +counter.innerText;

      // Lower inc to slow and higher to slow
      const inc = target / speed;
      // Check if target is reached
      if (count < target) {
        // Add inc to count and output in counter
        counter.innerText = Math.floor(count + inc);
        // Call function every ms
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
};
//template for query a Country
const countryDashboard = (country) => {
  console.log(country);
  //if country is undefined
  if (!country) return sendError();

  setTimeout(() => {
    bottomDashboard.innerHTML = ` 
    <div class="dashboard">
    <h2 class="heading--2 center">${country.Country}</h2>
    <div class="grid">
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
queryCountry();
searchCountryInput.addEventListener("input", debounce(queryCountry));

// COUNTER
const counters = document.querySelectorAll(".counter");
const speed = 200; // The lower the slower
