function getIcon(code) {
  switch(code) {
    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232:
      return "images/thunderstorms.svg"
      break;
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
      return "images/drizzle.svg"
      break;
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 511:
    case 520:
    case 521:
    case 522:
    case 531:
      return "images/rain.svg";
      break;
    case 600:
    case 601:
    case 602:
    case 611:
    case 612:
    case 613:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622:
      return "images/snow.svg"
      break;
    case 801:
      return "images/clear-day.svg"
      break;
    default:
      return "images/wind.svg"
      break;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  let lat;
  let lon;
  
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const apiKey = "520bb9ee5be7c5a2c8df2fb170fb3693";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const weatherIcon = document.querySelector(".weather-icon")
      fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data.weather[0].id)
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}&deg;C`;
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.wind.speed}km/h`;
        weatherIcon.src = getIcon(data.weather[0].id);
      })
    });
  }
});

let city = document.getElementById("city");
let btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  const apiKey = "520bb9ee5be7c5a2c8df2fb170fb3693";
  const url = `https://api.openweathermap.org/data/2.5/weather?&q=${city.value}&appid=${apiKey}&units=metric`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
        console.log(data)
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}&deg;C`;
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.wind.speed}km/h`
        weatherIcon.src = getIcon(data.weather[0].id);
  })
})



