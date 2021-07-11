//update time and date
function updateDate(element) {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let daysShort = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
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
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let monthDay = date.getDate();
  element.innerHTML = `${day}, ${month} ${monthDay}`;
  let forecastOne = document.querySelector(".day-one-date");
  forecastOne.innerHTML = daysShort[date.getDay() + 1];
  let forecastTwo = document.querySelector(".day-two-date");
  forecastTwo.innerHTML = daysShort[date.getDay() + 2];
  let forecastThree = document.querySelector(".day-three-date");
  forecastThree.innerHTML = daysShort[date.getDay() + 3];
  let forecastFour = document.querySelector(".day-four-date");
  forecastFour.innerHTML = daysShort[date.getDay() + 4];
  let forecastFive = document.querySelector(".day-five-date");
  forecastFive.innerHTML = daysShort[date.getDay() + 15;
}

function updateTime(element) {
  let date = new Date();
  let hours = date.getHours();
  let mins = date.getMinutes();
  if (mins < 10) {
    mins = "0" + mins;
  }
  element.innerHTML = `${hours}:${mins}`;
}

let newDate = document.querySelector(".current-d");
updateDate(newDate);
let newTime = document.querySelector(".current-t");
updateTime(newTime);

//Update main temperature
let header = document.querySelector("h1");
let city = header.innerHTML;
let celFarElement = document.querySelector(".unit");
let celFarUnit;
if (celFarElement.innerHTML === "°C") {
  celFarUnit = "metric";
} else {
  celFarUnit = "imperial";
}
let apiKey = "5fac56a1753f48f57cf3600eb2f64df9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${celFarUnit}&appid=${apiKey}`;
axios.get(apiUrl).then(currentMainTemp);
function currentMainTemp(response) {
  let responseTemp = response.data.main.temp;
  let currentTemp = document.querySelector(".temp-number");
  currentTemp.innerHTML = responseTemp.toFixed(1);
  let currentCon = response.data.weather[0].description;
  let currentConText = document.querySelector(".current-desc");
  currentConText.innerHTML = currentCon;
  let currentWind = response.data.wind.speed;
  let currentWindText = document.querySelector(".current-speed");
  currentWindText.innerHTML = currentWind;
  let currentPrec = response.data.rain["1h"];
  let currentPrecText = document.querySelector(".current-rain");
  currentPrecText.innerHTML = currentPrec;
  let weatherImage = document.querySelector("#icon");
  let iconCode = response.data.weather["0"]["icon"];
  weatherImage.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
}

//Togle celsius / farenheit unit
function changeUnit(event) {
  let celFarElement = document.querySelector(".unit");
  let smallCelFar = document.querySelectorAll(".small-unit");
  smallCelFar = [...smallCelFar];
  if (celFarElement.innerHTML === "°C") {
    celFarElement.innerHTML = "°F";
    let header = document.querySelector("h1");
    let city = header.innerText;
    let apiKey = "5fac56a1753f48f57cf3600eb2f64df9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    axios.get(apiUrl).then(updateInfo);
    function updateInfo(response) {
      let temp = response.data.main.temp;
      temp = temp.toFixed(1);
      let tempNow = document.querySelector(".temp-number");
      tempNow.innerText = temp;
    }
    for (let units of smallCelFar) {
      units.innerText = "°F";
    }
  } else {
    celFarElement.innerHTML = "°C";
    let apiKey = "5fac56a1753f48f57cf3600eb2f64df9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(currentMainTemp);
    function currentMainTemp(response) {
      let responseTemp = response.data.main.temp;
      let currentTemp = document.querySelector(".temp-number");
      currentTemp.innerHTML = responseTemp.toFixed(1);
      for (let units of smallCelFar) {
        units.innerText = "°C";
      }
    }
  }
}

let unitToggle = document.querySelector(".toggle");
unitToggle.addEventListener("click", changeUnit);

// Update days of forecast

// Search bar updates location

// Find my location
