function updateWeatherdata(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);

    console.log(response.data);
    
    cityElement.innerHTML = response.data.city;

    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windSpeedElement.innerHTML = response.data.wind.speed;
    temperatureElement.innerHTML = Math.round(temperature);
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
    let apiUrl = 'https://api.shecodes.io/weather/v1/current?query=${city}&key=08e18e31946af96bbbc5dt23b4o6f954&units=metric';
    axios.get(apiUrl).then(updateWeatherdata);
}


function submitSearch(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", submitSearch);

