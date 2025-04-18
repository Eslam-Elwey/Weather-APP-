async function getWeatherDataForecastingNextTwoDays(city) {
  let retObj;
  await fetch(
    `https://api.weatherapi.com/v1/forecast.json?q=${city}&days=3&key=fc5fa2ab26ba43cbaac110320251804`
  )
    .then((res) => res.json())
    .then((res) => {
      retObj = res;
    })
    .catch((error) => {
      console.log("Error" + error);
      retObj = {};
    });

  return retObj;
}

(async function () {
  let dataPromise;
  let dataObj = {};
  dataPromise = getWeatherDataForecastingNextTwoDays("October");
  await dataPromise.then((res) => {
    dataObj = res;
    console.log(dataObj);
  });

  const now = new Date();
  let time = now.toLocaleTimeString();
  timer.innerHTML = `${time}`;
  weatherTemplate(dataObj);
})();

const inputValue = document.getElementById("location");
const buttonFind = document.getElementById("submitFind");
const weatherSection = document.getElementById("weather");
const timer = document.getElementById("time");

setInterval(function () {
  const now = new Date();
  let time = now.toLocaleTimeString();
  timer.innerHTML = `${time}`;
  console.log(now.toLocaleTimeString());
}, 1000);

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

inputValue.addEventListener("input", function () {
  console.log(inputValue.value);
  const city = inputValue.value.trim();
  let dataPromise;
  let dataObj;
  if (inputValue.value.length >= 2) {
    dataPromise = getWeatherDataForecastingNextTwoDays(city);
    dataPromise.then((res) => {
      dataObj = res;
      console.log(dataObj);
      weatherTemplate(dataObj);
    });
  }
});

buttonFind.addEventListener("click", function () {
  console.log(inputValue.value);
  const city = inputValue.value.trim();
  let dataPromise;
  let dataObj;
  if (inputValue.value.length >= 2) {
    dataPromise = getWeatherDataForecastingNextTwoDays(city);
    dataPromise.then((res) => {
      dataObj = res;
      console.log(dataObj);
      weatherTemplate(dataObj);
    });
  }
});

function weatherTemplate(dataObj) {
  if (!dataObj) {
    console.log("Entered undef");
    weatherSection.innerHTML = "Failed to get data...";
    return;
  }

  const location = dataObj.location?.name ?? "cairo";
  console.log(location);

  let forecastDays = dataObj.forecast.forecastday;
  console.log(forecastDays);

  let date = new Date();

  let day = date.toLocaleString("en-US", { weekday: "long" });
  let month = date.toLocaleString("en-US", { month: "long" });
  let dayOfMonth = date.getDate();
  date.setDate(date.getDate() + 1);
  let nextDay = date.toLocaleString("en-US", { weekday: "long" });

  date.setDate(date.getDate() + 1);
  let afterDay = date.toLocaleString("en-US", { weekday: "long" });

  weatherSection.innerHTML = `<div class="col-lg-4 ">
                  <div class="data bg-secondary rounded-3">
                    <div class="data-header text-center">
                      <div class="d-flex justify-content-between">
                        <h4>${day}</h4>
                        <h4>${dayOfMonth} ${month}</h4>
                      </div>
                      <div class="d-flex flex-column py-3 ">
                        <h3 class="my-2">${location}</h3>
                        <div class="d-flex flex-row justify-content-between px-4 my-lg-5 today-icon">
                          <h2>${forecastDays[0].day.maxtemp_c} &deg;C</h2>
                          <h2>/</h2>
                          <h2>${forecastDays[0].day.mintemp_c} &deg;C</h2>
                          <img src="https://${forecastDays[0].day.condition.icon}" alt="">
                        </div>
                        <h3>${forecastDays[0].day.condition.text}</h3>
                        <div class="d-flex flex-row px-3 my-4 gap-5">
                          <div class="element gap-2 d-flex">
                            <img src="./images/icon-umberella@2x.png" alt="">
                            <span>${forecastDays[0].day.daily_chance_of_rain}%</span>
                          </div>
                          <div class="element gap-2 d-flex">
                            <img src="./images/icon-wind@2x.png" alt="">
                            <span>${forecastDays[0].day.maxwind_kph} Km/h</span>
                          </div>
                          <div class="element gap-2 d-flex">
                            <img src="./images/icon-compass@2x.png" alt="">
                            <span>${dataObj.current.wind_dir}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="data bg-dark text-center">
                    <div class="data-header">
                      <h4>${nextDay}</h4> 
                    </div>
                    <div class="d-flex my-5 flex-column item-elem  align-items-center justify-content-center">
                      <img src="https://${forecastDays[1].day.condition.icon}" alt="">
                      <h3 class="my-4">${forecastDays[1].day.maxtemp_c} &deg;C / </h3>
                      <h3 class="my-4">${forecastDays[1].day.mintemp_c} &deg;C</h3>
                      <h5 class="mt-2">${forecastDays[1].day.condition.text} </h5>
                    </div>
                    
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="data bg-secondary text-center">
                    <div class="data-header">
                      <h4>${afterDay}</h4>
                    </div>
  
                    <div class="d-flex my-5 flex-column item-elem  align-items-center justify-content-center">
                      <img src="https://${forecastDays[2].day.condition.icon}" alt="">
                      <h3 class="my-4">${forecastDays[2].day.maxtemp_c} &deg;C / </h3>
                      <h3 class="my-4">${forecastDays[2].day.mintemp_c} &deg;C</h3>
                      <h5 class="mt-2">${forecastDays[2].day.condition.text} </h5>
                    </div>
                    
                  </div>
                </div>`;
}
