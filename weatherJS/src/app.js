const weatherContainer = document.querySelector(".weather");
const weatherTemperature = document.querySelector(".weather__temp");
const weatherTimezone = document.querySelector("#weather-timezone");
const weatherDetail = document.querySelector(".weather__detail");
const weatherLocation = document.querySelector(".weather__location");
const weatherIcon = document.querySelector(".weather__icon");
const currentWeather = document.querySelector(".weather__currentweather");
const loader = document.querySelector("#loader");
const degreesMinMax = document.querySelector(".weather__Between");
const API_KEY = "3a2c564a0503f659ba288f1cb369f09c";
const buttonAddQuery = document.querySelector("#addNewWeather");
const weatherCities = document.querySelector(".weather-cities");
const popup = document.querySelector("#popup");

const getWeather = async () => {
  if (!navigator.geolocation) {
    weatherContainer.innerHTML = `
    <h1>Please Enable Location to view weather</h1>
    `;
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
  function error() {
    weatherContainer.innerHTML = `
    <h1>Please Enable Location to view weather</h1>
    `;
  }

  // if it supports geolocation
  function success(position) {
    const { longitude, latitude } = position.coords;

    getLocation(longitude, latitude);
  }
};

const getLocation = async (...args) => {
  const [longitude, latitude] = args;

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );

  clear();
  showMainWeather(response.data);
};

//DISPLAY CONTENT
const showMainWeather = async (data) => {
  console.log(data);
  let iconCode = data.weather[0].icon;
  let iconUrl = `src/icons/${iconCode}.svg`;
  weatherTimezone.textContent = data.sys.country;
  weatherLocation.textContent = data.name;
  weatherTemperature.innerHTML = `${data.main.temp}ºC`;
  currentWeather.textContent = `${data.weather.map(
    (data) => data.description
  )}`;
  degreesMinMax.innerHTML = `
  ${data.main.temp_min}ºC • ${data.main.temp_max}ºC
  `;
  weatherIcon.src = iconUrl;
};

//removes loader
function clear() {
  weatherIcon.classList.remove("hide");
  loader.remove();
}

window.addEventListener("DOMContentLoaded", getWeather);
