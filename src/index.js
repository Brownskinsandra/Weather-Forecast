function updateWeatherdata(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
   
    temperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
    let apiKey = "08e18e31946af96bbbc5dt23b4o6f954";
    let apiUrl = 'https://api.shecodes.io/weather/v1/current?query=${city}&key=08e18e31946af96bbbc5dt23b4o6f954&units=metric';
    axios.get(apiUrl).then(updateWeatherdata);
}


function submitSearch(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = searchInput.value;
    searchCity(searchInput.value);
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", submitSearch);

