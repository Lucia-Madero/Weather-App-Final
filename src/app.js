function displayTodayInfo() {
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
  if (hour < 10) {
    hour = ` 0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let todayCalendar = document.querySelector("#today-calendar");
  todayCalendar.innerHTML = `${day}`;
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = `${number} ${month}`;
  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = `${hour}:${minutes}`;
}

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  if (hour < 10) {
    hour = ` 0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}

function showCity(response) {
  console.log(response.data);
  title.innerHTML = response.data.name;
  mainTemp.innerHTML = Math.round(response.data.main.temp);
  currentCelsius = response.data.main.temp;
  let description = response.data.weather[0].main;
  let subtitle = document.querySelector("#description");
  subtitle.innerHTML = description;
  let humidity = Math.round(response.data.main.humidity);
  let currentHum = document.querySelector("#humidity");
  currentHum.innerHTML = `Humidity ${humidity} %`;
  let wind = Math.round(response.data.wind.speed * 3, 6);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind ${wind} km/h`;
  let icon = document.querySelector("#today-icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].main);
}

function displayCelsius(event) {
  event.preventDefault();
  let tempCelsius = document.querySelector("#celsius-temp");
  tempCelsius.innerHTML = Math.round(currentCelsius);
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
}

function displayFahren(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#celsius-temp");
  let farenTemp = (currentCelsius * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(farenTemp);
  farenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function showCurrent(response) {
  let city = response.data.name;
  title.innerHTML = city;
  mainTemp.innerHTML = Math.round(response.data.main.temp);
  currentCelsius = response.data.main.temp;
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

function searchByCityCoords(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showCurrent);
}

function showTemp(event, element) {
  event.preventDefault();
  element = document.querySelector("#search-box");
  searchByCityName(element.value);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = null;
  forecastElement.innerHTML = null;
  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `     
    <div class="col-3">
      <div class="day-one">
        <div class="card" style="width: 8rem">
          <div class="card-body">
            <strong><h6>${formatHours(forecast.dt * 1000)}</h6></strong>
            <img src="https://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png"/>
            <h6>${Math.round(forecast.main.temp_max)}° ${Math.round(
      forecast.main.temp_min
    )}°</h6>
          </div>
        </div>
      </div>
    </div>`;
  }
}

function searchByCityName(city) {
  if (city == "") {
    alert("Please enter a city");
    return;
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showCity);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(displayForecast);
}

function restoreCurrent() {
  navigator.geolocation.getCurrentPosition(searchByCityCoords);
}

let currentCelsius = null;
let city = document.querySelector("#search-box");
let title = document.querySelector("#current-city");
let mainTemp = document.querySelector("#celsius-temp");
let apiKey = "b8472ba63e135218f57d24b1f32f73fa";
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);
let farenheitLink = document.querySelector("#faren-link");
farenheitLink.addEventListener("click", displayFahren);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showTemp);
let SearchButton = document.querySelector("#search-button");
SearchButton.addEventListener("click", showTemp);
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", restoreCurrent);
searchByCityName("Brussels");
displayTodayInfo();
