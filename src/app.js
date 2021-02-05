let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let day = days[now.getDay()];
let number = now.getDate();
let month = months[now.getMonth()];
let hour = now.getHours();
let minutes = now.getMinutes();
let h5 = document.querySelector("#today");
h5.innerHTML = `${day}`;
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${number} ${month}`;
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hour}:${minutes}`;

function showCity(response) {
  let city = document.querySelector("#search-box");
  let h1 = document.querySelector("#current-city");
  h1.innerHTML = city.value;
  let temp = Math.round(response.data.main.temp);
  let h4 = document.querySelector("#celsius-temp");
  h4.innerHTML = temp;
  let description = response.data.weather[0].main;
  let subtitle = document.querySelector("#description");
  subtitle.innerHTML = description;
  let humidity = Math.round(response.data.main.humidity);
  let currentHum = document.querySelector("#humidity");
  currentHum.innerHTML = `Humidity ${humidity} %`;
  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind ${wind} %`;
}

function displayCelsius(event, response) {
  event.preventDefault();
  let tempCelsius = document.querySelector("#celsius-temp");
  let temp = response.data.main.temp;
  tempCelsius.innerHTML = temp;
}

function displayFaren(event) {
  event.preventDefault();
  let tempCelsius = 4;
  let farenTemp = `${tempCelsius + 32}`;
  let tempFaren = document.querySelector("#celsius-temp");
  tempFaren.innerHTML = farenTemp;
}

function showCurrent(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let h1 = document.querySelector("#current-city");
  h1.innerHTML = city;
  let h4 = document.querySelector("#celsius-temp");
  h4.innerHTML = temp;
  let description = response.data.weather[0].main;
  let subtitle = document.querySelector("#description");
  subtitle.innerHTML = description;
  let humidity = Math.round(response.data.main.humidity);
  let currentHum = document.querySelector("#humidity");
  currentHum.innerHTML = `Humidity ${humidity} %`;
  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind ${wind} %`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b8472ba63e135218f57d24b1f32f73fa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showCurrent);
}

function showTemp(event, element) {
  event.preventDefault();
  element = document.querySelector("#search-box");
  searchCity(element.value);
}

function searchCity(city) {
  let loadCity = document.querySelector("#current-city");
  loadCity.innerHTML = city;
  let apiKey = "b8472ba63e135218f57d24b1f32f73fa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showCity);
}

function restoreCurrent() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);
let farenheitLink = document.querySelector("#faren-link");
farenheitLink.addEventListener("click", displayFaren);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showTemp);
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", restoreCurrent);
searchCity("Brussels");
