function fullestTime(date) {
  let weeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednessday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let week = weeks[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${week}, ${hours}:${minutes}`;
}
let now = new Date();
let total = document.querySelector("#inFull");
total.innerHTML = fullestTime(now);
// making function for Thur...
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
//Challenge last
function weatherForecastdisplay(response) {
  console.log(response.data.daily);
  let forecastDay = response.data.daily;
  let forecastDisplay = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  forecastDay.forEach(function (forecastDays, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2"> 
            <div id="weather-forecast-day">${formatDay(forecastDays.dt)}</div>
            <img id= "weather-forecast-image" src="http://openweathermap.org/img/wn/${
              forecastDays.weather[0].icon
            }@2x.png" alt="" >
             <div id="weather-forecast-temp">
             <span id="weather-forecast-max">${Math.round(
               forecastDays.temp.max
             )}°</span>
             <span id="weather-forecast-min">${Math.round(
               forecastDays.temp.min
             )}°</span>
            </div>
            </div>
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastDisplay.innerHTML = forecastHTML;
}
//Challenge3(then this)
function find(city) {
  let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
  let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiWeather).then(tellWeather);
}
//this first
function cityPlace(event) {
  event.preventDefault();
  let city = document.querySelector("#Enter-city").value;
  find(city);
}
//this first 1
let forms = document.querySelector("form");
forms.addEventListener("submit", cityPlace);
//for the forecastDisplay
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherForecastdisplay);
}
//then this 2(common for both final)
function tellWeather(response) {
  console.log(response.data);
  console.log(response.data.name);
  document.querySelector("#country").innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  document.querySelector("#letters").innerHTML = Math.round(celsiusTemp);
  document.querySelector(
    "#windy"
  ).innerHTML = `Wind: ${response.data.wind.speed}km/h`;
  document.querySelector(
    "#humidify"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#describe"
  ).innerHTML = ` ${response.data.weather[0].description}`;
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#describe");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  descriptionElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
///Challenge 4(then this 2)
function myLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(tellWeather);
}
//then this 1
function getLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}
//this first
let currentLoc = document.querySelector("#current");
currentLoc.addEventListener("click", getLoc);

function getFarenheittemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let letter = document.querySelector("#letters");
  let Farenheittemp = (celsiusTemp * 9) / 5 + 32;
  letter.innerHTML = Math.round(Farenheittemp);
}
function getCelsiustemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let letter = document.querySelector("#letters");
  letter.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let farenheitLink = document.querySelector("#faren");
farenheitLink.addEventListener("click", getFarenheittemp);

let celsiusLink = document.querySelector("#cels");
celsiusLink.addEventListener("click", getCelsiustemp);
find("Amsterdam");
