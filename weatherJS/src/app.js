const weatherContainer = document.querySelector(".weather");
const weatherTemperature = document.querySelector(".weather__temp");
const weatherDetail = document.querySelector(".weather__detail");
const weatherLocation = document.querySelector(".weather__location");
const weatherIcon = document.querySelector(".weather__icon");
const currentWeather = document.querySelector(".weather__currentweather");
const loader = document.querySelector("#loader");
const degreesMinMax = document.querySelector(".weather__Between");
const API_KEY = "3a2c564a0503f659ba288f1cb369f09c";

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

    getLocation(Math.floor(longitude), Math.floor(latitude));
  }
};

const getLocation = async (...args) => {
  const [longitude, latitude] = args;

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );

  clear();
  showWeather(response.data);
};

//DISPLAY CONTENT
const showWeather = async (data) => {
  let iconCode = data.weather[0].icon;
  let iconUrl = `src/icons/${iconCode}.svg`;
  weatherLocation.textContent = data.sys.country;
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
