const locationDiv = document.querySelector('.location');
const temperatureDiv = document.querySelector('.temperature');
const forecastDiv = document.querySelector('.forecast');

const searchBox = document.querySelector('input');

let bgImage = document.querySelector('.bg-image');
let weatherIcon = document.querySelector('.weather-icon');

const allForecastOptions = [];


let fetchApi = async (search) => {
  try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&APPID=cdf8ab7f2508898c13405c4a0cf79e4c`, { mode: "cors" });

      // let imgResult = await fetch(`http://openweathermap.org/img/wn/${dublinWeather.weather[0].icon}@2x.png`, { mode: "cors" });
      // img.src = imgResult.url;
      return response;
  } catch (err) {
    console.log(`You encountered the following error: ${err}`);
  }
}

let gatherWeatherInfo = async (resToConvert) => {
  try {
    let info = await resToConvert.json();

    let requiredInfo = {
      location: info.name,
      temperature: `${Math.round(info.main.temp)}`,
      forecast: info.weather[0].main
    };

    return requiredInfo;
  } catch (err) {
    console.log(`You encountered the following error: ${err}`);
  }
}

let populateDOM = (requiredInfo) => {
  locationDiv.textContent = requiredInfo.location;
  temperatureDiv.textContent = requiredInfo.temperature + '°';
  forecastDiv.textContent = requiredInfo.forecast;

  switch(requiredInfo.forecast) {
    case 'Clouds':
      bgImage.src = './images/clouds.jpg';
      weatherIcon.src = './images/weather-cloudy.png'
      break;
    case 'Clear':
      bgImage.src = './images/clear.jpg';
      weatherIcon.src = './images/weather-sunny.png'
      break;
    case 'Rain':
      bgImage.src = './images/rain.jpg';
      weatherIcon.src = './images/weather-pouring.png'
      break;
    default:
      bgImage.src = './images/storm.jpg';
  }
}

fetchApi('Dublin')
  .then(gatherWeatherInfo)
  .then((requiredInfo) => populateDOM(requiredInfo));

searchBox.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') {
    fetchApi(searchBox.value)
      .then(gatherWeatherInfo)
      .then((requiredInfo) => populateDOM(requiredInfo));
  }
});