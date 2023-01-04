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

//Challenge last
function weatherForecastdisplay() {
  let forecastDisplay = document.querySelector("#weather-forecast");
  let days = ["Fri", "Sat", "Sun", "Mon"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2"> 
            <div id="weather-forecast-day">${day}</div>
            <img id= "weather-forecast-image" src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png" alt="" >
             <div id="weather-forecast-temp">
             <span id="weather-forecast-max">12°</span>
             <span id="weather-forecast-min">3°</span>
            </div>
            </div>
            `;
  });
  forecastHTML = `</div>`;
  forecastDisplay.innerHTML = forecastHTML;
}
//Challenge3(then this)
function find(city) {
  let apiKey = "50fa4024e3b1d5eac2f51ab18a47e997";
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
}
///Challenge 4(then this 2)
function myLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "50fa4024e3b1d5eac2f51ab18a47e997";
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
weatherForecastdisplay();
