const apiKey = "482e88427fe89174395f2a8304802f3c";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchBox = document.querySelector(".input-container input");
const searchBtn = document.querySelector(".input-container button");
const weatherIcon = document.querySelector(".weather-icon");

// API CALL
async function getWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);
  var data = await response.json();

  if (response.status == 404) {
    document.querySelector(".error-msg").style.display = "block";
    document.querySelector(".details-container").style.display = "none";
  } else {
    // DOM MANIPULATION WITH API DATA
    document.querySelector(".city").innerHTML = data.name || "Patna";
    document.querySelector(".temperature").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    let weatherType = data.weather[0].main;
    console.log(weatherType);
    switch (weatherType) {
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
      default:
        weatherIcon.src = "images/clear.png";
        break;
    }
    document.querySelector(".error-msg").style.display = "none";
    document.querySelector(".details-container").style.display = "block";
  }
}

//CHANGING DATA ON SEARCH CLICK
searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
});
