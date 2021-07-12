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
  forecastFive.innerHTML = daysShort[date.getDay() + 5];
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
  let currentHum = response.data.main.humidity;
  let currentHumText = document.querySelector(".current-hum");
  currentHumText.innerHTML = currentHum;
  let weatherImage = document.querySelector("#icon");
  let iconCode = response.data.weather["0"]["icon"];
  weatherImage.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  let celFarElement = document.querySelector(".unit");
  let celFarUnit;
  if (celFarElement.innerHTML === "°C") {
    celFarUnit = "metric";
  } else {
    celFarUnit = "imperial";
  }
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let apiKey = "5fac56a1753f48f57cf3600eb2f64df9";
  let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=${celFarUnit}&appid=${apiKey}`;
  axios.get(forecastUrl).then(updateForecast);
}

function updateForecast(response) {
  let dayOne = document.querySelector(".day-one-temp");
  let tempOne = response.data.daily[1].temp.max;
  dayOne.innerHTML = tempOne.toFixed(1);
  let iconOne = document.querySelector("#one");
  let codeOne = response.data.daily[1].weather[0].icon;
  iconOne.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${codeOne}@2x.png`
  );
  let dayTwo = document.querySelector(".day-two-temp");
  let tempTwo = response.data.daily[2].temp.max;
  dayTwo.innerHTML = tempTwo.toFixed(1);
  let iconTwo = document.querySelector("#two");
  let codeTwo = response.data.daily[2].weather[0].icon;
  iconTwo.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${codeTwo}@2x.png`
  );
  let dayThree = document.querySelector(".day-three-temp");
  let tempThree = response.data.daily[3].temp.max;
  dayThree.innerHTML = tempThree.toFixed(1);
  let iconThree = document.querySelector("#three");
  let codeThree = response.data.daily[3].weather[0].icon;
  iconThree.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${codeThree}@2x.png`
  );
  let dayFour = document.querySelector(".day-four-temp");
  let tempFour = response.data.daily[4].temp.max;
  dayFour.innerHTML = tempFour.toFixed(1);
  let iconFour = document.querySelector("#four");
  let codeFour = response.data.daily[4].weather[0].icon;
  iconFour.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${codeFour}@2x.png`
  );
  let dayFive = document.querySelector(".day-five-temp");
  let tempFive = response.data.daily[5].temp.max;
  dayFive.innerHTML = tempFive.toFixed(1);
  let iconFive = document.querySelector("#five");
  let codeFive = response.data.daily[5].weather[0].icon;
  iconFive.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${codeFive}@2x.png`
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
      let lat = response.data.coord.lat;
      let lon = response.data.coord.lon;
      let unit = "imperial";
      let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=${unit}&appid=${apiKey}`;
      axios.get(forecastUrl).then(updateForecast);
    }
    for (let units of smallCelFar) {
      units.innerText = "°F";
    }
  } else {
    let header = document.querySelector("h1");
    let city = header.innerHTML;
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
      let lat = response.data.coord.lat;
      let lon = response.data.coord.lon;
      let unit = "metric";
      let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=${unit}&appid=${apiKey}`;
      axios.get(forecastUrl).then(updateForecast);
    }
  }
}

let unitToggle = document.querySelector(".toggle");
unitToggle.addEventListener("click", changeUnit);

// Find my location
function showMyLocation(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "5fac56a1753f48f57cf3600eb2f64df9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(updateAll);
  }
}

function updateAll(response) {
  let location = response.data.name;
  let header = document.querySelector("h1");
  header.innerHTML = location;
  let celFarElement = document.querySelector(".unit");
  let celFarUnit;
  if (celFarElement.innerHTML === "°C") {
    celFarUnit = "metric";
  } else {
    celFarUnit = "imperial";
  }
  let apiKey = "5fac56a1753f48f57cf3600eb2f64df9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${celFarUnit}&appid=${apiKey}`;
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
    let currentHum = response.data.main.humidity;
    let currentHumText = document.querySelector(".current-hum");
    currentHumText.innerHTML = currentHum;
    let weatherImage = document.querySelector("#icon");
    let iconCode = response.data.weather["0"]["icon"];
    weatherImage.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${iconCode}@2x.png`
    );
    let celFarElement = document.querySelector(".unit");
    let celFarUnit;
    if (celFarElement.innerHTML === "°C") {
      celFarUnit = "metric";
    } else {
      celFarUnit = "imperial";
    }
    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;
    let apiKey = "5fac56a1753f48f57cf3600eb2f64df9";
    let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=${celFarUnit}&appid=${apiKey}`;
    axios.get(forecastUrl).then(updateForecast);
  }
}

let findMe = document.querySelector(".find-me");
findMe.addEventListener("click", showMyLocation);

function searchLocation(event) {
  event.preventDefault();
  let input = document.querySelector(".search-bar");
  let header = document.querySelector("h1");
  let searchCity = input.value;
  let correctCity = searchCity[0].toUpperCase() + searchCity.substring(1);
  header.innerHTML = correctCity;

  let celFarElement = document.querySelector(".unit");
  let celFarUnit;
  if (celFarElement.innerHTML === "°C") {
    celFarUnit = "metric";
  } else {
    celFarUnit = "imperial";
  }
  let apiKey = "5fac56a1753f48f57cf3600eb2f64df9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=${celFarUnit}&appid=${apiKey}`;
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
    let currentHum = response.data.main.humidity;
    let currentHumText = document.querySelector(".current-hum");
    currentHumText.innerHTML = currentHum;
    let weatherImage = document.querySelector("#icon");
    let iconCode = response.data.weather["0"]["icon"];
    weatherImage.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${iconCode}@2x.png`
    );
    let celFarElement = document.querySelector(".unit");
    let celFarUnit;
    if (celFarElement.innerHTML === "°C") {
      celFarUnit = "metric";
    } else {
      celFarUnit = "imperial";
    }
    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;
    let apiKey = "5fac56a1753f48f57cf3600eb2f64df9";
    let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=${celFarUnit}&appid=${apiKey}`;
    axios.get(forecastUrl).then(updateForecast);
  }
}

let newLocation = document.querySelector("form");
newLocation.addEventListener("submit", searchLocation);
