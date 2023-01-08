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
      location: `${info.name}`,
      temperature: `${Math.round(info.main.temp)}`,
      forecast: `${info.weather[0].main}`
    };

    return requiredInfo;
  } catch (err) {
    console.log(`You encountered the following error: ${err}`);
  }
}

fetchApi('Dublin')
  .then(gatherWeatherInfo)
  .then((requiredInfo) => console.log(requiredInfo));

