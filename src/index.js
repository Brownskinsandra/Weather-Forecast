function updateWeatherdata(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon"); 
    
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windSpeedElement.innerHTML = response.data.wind.speed;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;
    
    getForecast(response.data.city);
}

function formatDate(date) {
   
    let minute = date.getMinutes();
    let hour = date.getHours();
    let days = [
    "Sunday", 
    "Monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday"
    ];
     let day = days[date.getDay()];

     if (minute < 10) {
        minute = `0${minute}`;
     }

    return `${day} ${hour}:${minute}`;
}


function searchCity(city) {
    let apiKey = "08e18e31946af96bbbc5dt23b4o6f954";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=08e18e31946af96bbbc5dt23b4o6f954&units=metric`;
    axios.get(apiUrl).then(updateWeatherdata);
}


function submitSearch(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

function getForecast(city) {
    let apiKey = "08e18e31946af96bbbc5dt23b4o6f954";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
    
}


function displayForecast(response) {
    console.log(response.data);

    
    let forecastHtml = "";

    response.data.daily.forEach(function(day, index) {
      if (index < 5) {
       forecastHtml = 
        forecastHtml +
        `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">${formatDay(day.time)}</div>
    <div class="weather-forecast-icon">
    <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
    </div>
    <div class="weather-forecast-temperatures">
        <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}°</strong><span class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</span>
        </div>
    </div>
  </div>
`;}
    });

let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
}


let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", submitSearch);

searchCity("Abuja");
