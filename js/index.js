let todayName = document.getElementById("today-date-day-name");
let todayNumber = document.getElementById("today-date-day-number");
let todayMonth = document.getElementById("today-date-month");
let todayLocation = document.getElementById("today-location");
let todayTemp = document.getElementById("today-temp");
let todayConditionImg = document.getElementById("today-condition-img");
let todayConditionText = document.getElementById("today-condition-text");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("wind-direction");
let weatherDate;
// ==========================================================
let nextDay = document.querySelectorAll(".next-day-name");
let nextMaxTemp = document.querySelectorAll(".next-max-temp");
let nextMinTemp = document.querySelectorAll(".next-min-temp");
let nextConditionImg = document.querySelectorAll(".next-condition-img");
let nextConditionText = document.querySelectorAll(".next-condition-text");

// =======================================
let searchInput = document.getElementById("search")

// =====================================
async function getWeatherData(cityName) {
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1//forecast.json?key=2b8177ecf57c4938acc152354242806&q=${cityName}&days=3`)
    let weatherData = await weatherResponse.json()
    return weatherData
}

function displayTodayWeather(data) {
    let todayDate=new Date ();
    todayName.innerHTML =todayDate.toLocaleDateString("en-us", {weekday:"long"});
    todayNumber.innerHTML=todayDate.getDate()    
    todayMonth.innerHTML =todayDate.toLocaleDateString("en-us", {month:"long"});
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayConditionImg.setAttribute('src', data.current.condition.icon);
    todayConditionText.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + "%";
    wind.innerHTML = data.current.wind_kph + "km/h";
    windDirection.innerHTML = data.current.wind_dir;
}

function displayNextData(data) {
    let forecastData = data.forecast.forecastday;
    for (let i = 0; i < 2; i++) {
        let nextDate=new Date(forecastData[i+1].date)
        nextDay[i].innerHTML =nextDate.toLocaleDateString("en-us", {weekday:"long"});
        nextMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c;
        nextMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c;
        nextConditionImg[i].setAttribute("src", forecastData[i + 1].day.condition.icon);
        nextConditionText[i].innerHTML = forecastData[i + 1].day.condition.text;
    }
}
async function callFunctions(city="London") {
    let weatherData = await getWeatherData(city)
   if (!weatherData.error) {
    displayTodayWeather(weatherData);
    displayNextData(weatherData);
   }
  
}

callFunctions()

searchInput.addEventListener("input", function () {
    callFunctions(searchInput.value)
})