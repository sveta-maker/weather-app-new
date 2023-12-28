function refreshWeather(response) {
    let cityElement = document.querySelector("#city");
    if (response.data.status === "not_found") { 
        cityElement.innerHTML = '<h5>City not found. Please check the city name and try again.</h5>'; 
        return;
    }

    let temperatureElement = document.querySelector("#temperature");
   
    let temperature = response.data.temperature.current;
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
        
    iconElement.innerHTML =  `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
 
    temperatureElement.innerHTML = Math.round(temperature);       
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    timeElement.innerHTML = formatDate(date);
}

function formatDate(date) {
    
    let minutes = date.getMinutes();
    let hours = date.getHours();

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
    if (minutes < 10) { minutes = `0${minutes}`; }

    return `${day} ${hours}:${minutes}`;

}

function searchCity(city) {
    let apiKey = "da3b4f2006boa20498f58408839atf92";
    let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

function displayForecast() {
    
    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHtml = "";
    days.forEach(function (day) {
        forecastHtml =
            forecastHtml +
         `
    <div class="row">
        <div class="col-2">
            <div class="weather-forecast-date">
                ${day}
            </div>

            <img src="http://openweathermap.org/img/wn/50d@2x.png" width="42" />
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">18°</span>
                <span class="weather-forecast-temperature-min">12°</span>
            </div>
        </div>
    </div>
    `;
    })
    forecastElement.innerHTML = forecastHtml;

}

let forecastElement = document.querySelector("#forecast");
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");

displayForecast();