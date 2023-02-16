// Currencies to exchange
let baseCurrency = "GBP";
let wantedCurrency = "NOK";


let renderCurrency = (currencyObj=null, baseCurrency="GBP", currency="EUR", curValue=1) => {
  if (currencyObj === null) {
    currencyObj = JSON.parse(localStorage.getItem("currencyObj"));
  }
  // display exchange rate section
  $("#currency-section").removeClass("d-none");
  // disiplay exchane rate
  curMsg = `1 ${baseCurrency} is ${currencyObj.conversion_rates[currency]} ${currency}`;
  $("#exchange-rate").text(`1 ${baseCurrency} is ${currencyObj.conversion_rates[currency]} ${currency}`);
  $("#exchange-rate").css("fontSize", "1.5em");
  $("#exchange-rate").css("color", "blue");
  // attribution of API and data timestamp
  $("#exchange-info").html(
    `Exchange rate retrieved at ${currencyObj.time_last_update_utc} (UTC) <br/>
    <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>`);

  // number input for currencies convertion
  let baseCur = $("#val-cur1");
  let exCur = $("#val-cur2");
  baseCur.val(curValue);
  exCur.val((curValue * currencyObj.conversion_rates[currency]).toFixed(2));

  let baseType = $("#type-cur1");
  let exType = $("#type-cur2");

  if (exType.children().length === 0 || baseType.children().length === 0) {
    supportedCurrencies.forEach((state) => {
      //create the dropdown items and add dropdown value
      let baseOptionEl = $("<option>");
      baseOptionEl.val(state.currencyCode).text(state.currencyName);
      let exOptionEl = $("<option>");
      exOptionEl.val(state.currencyCode).text(state.currencyName);
      // append to the dropdown select
      baseType.append(baseOptionEl);
      exType.append(exOptionEl);
    })
  }
  baseType.val(baseCurrency);
  exType.val(currency);

  $("#speech").on("click", (event, curMsg) => {
    event.preventDefault();
    console.log(this)
    //this.removeClass("d-none")
    let msg = new SpeechSynthesisUtterance();
    msg.text = $("#exchange-rate").text();
    window.speechSynthesis.speak(msg);
  });
 

}


let updateExchangeRate = (baseCurrency="GBP", localCurrency="EUR", value=1) => {
  // retrieve Exchange rate data from local storage 
  let currencyObj = JSON.parse(localStorage.getItem("currencyObj"));

  // get exchange rate, save it to local storage, render exchange rate output on webpage
  if (!(currencyObj === null || currencyObj.length === 0 
    || currencyObj.time_next_update_unix < moment().unix() 
    || currencyObj.base_code !== baseCurrency)) {
    // currencyObj is null, [] or '' (empty string) or datda out of date or base currency has changes
    // data only gets updated ones a day, so does not need to be requested more than once a day
    // suggestion to save response in local storage to contain all currencies from a suggested base currency
    renderCurrency(currencyObj, baseCurrency, localCurrency, value);
    return
  }
  const APIKey = "87a05fbcbcfbff2bf1ee9c3f";
  let queryURL = `https://v6.exchangerate-api.com/v6/${APIKey}/latest/${baseCurrency}`;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    if (response.result === "success") {
      localStorage.setItem("currencyObj", JSON.stringify(response));
      renderCurrency(response, baseCurrency, localCurrency, value)
      return
    }
  });
}


// Weather Setion
const APIKey = "4ddb322a76968b6cb599fa2b021f691b";


let displayWeather = (city, lat, lon) => {
  // display current weather
  $("#city").text(`${city}`);
  getCurrentWeather("weather", lat, lon, APIKey);
  getForcastWeather("forecast", lat, lon, APIKey);
}


// display the 5 day Weather Forcast
let getForcastWeather = (queryType="forecast", lat, lon, APIKey) => {
  let queryURL = `https://api.openweathermap.org/data/2.5/${queryType}?lat=${lat}&lon=${lon}&appid=${APIKey}`;

  // created an AJAX call for 5 day weather forecast
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // find next lunchtime to display data
    let time = moment(response.list[0].dt*1000 + response.city.timezone*1000).format('H');
    let startIndex = Math.abs(Math.floor((14-time)/3));
    if (time > 14){
      startIndex = Math.abs(Math.floor((24-time+14)/3));
    }
    
    let index = startIndex;

    //5 day weather forcast
    for (let i=0; i<5; i++) {
      
      if (i!==0){index+=8;} // 8 time steps for 24 hours
      let dateEl = $("<h5></h5>");
      let weatherImg = $("<p></p>");
      let weatherEl = $("<p></p>");
      let tempEl = $("<p></p>");
      let humidityEl = $("<p></p>");
      let windEl = $("<p></p>");

      // display date, weather conditions, temperature, humidity, wind speed
      dateEl.text(`${moment(response.list[index].dt*1000 + response.city.timezone*1000).format('ddd, DD.MM.YY')}`);
      weatherImg.html(`<img src="https://openweathermap.org/img/wn/${(response.list[index].weather[0].icon)}.png"/>`);
      weatherEl.text(`${response.list[index].weather[0].description}`);
      tempEl.text(`Temp: ${(response.list[index].main.temp - 273.15).toFixed(1)} °C`); 
      humidityEl.text(`Humidity: ${response.list[index].main.humidity} %`);
      windEl.text(`Wind: ${(response.list[index].wind.speed * 3.6).toFixed(1)} km/h`);
      //append data to corresponding card
      $("#"+i.toString()).html("");
      $("#"+i.toString()).append(dateEl, weatherImg, weatherEl, tempEl, humidityEl, windEl);

    }

});
}


// display the currentWeather
let getCurrentWeather = (queryType="weather", lat, lon, APIKey) => {
  let queryURL = `https://api.openweathermap.org/data/2.5/${queryType}?lat=${lat}&lon=${lon}&appid=${APIKey}`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    
    // display date, weather conditions, temperature, humidity, wind speed
    //$("#date").text(`${moment(response.dt*1000 + response.timezone*1000).format('dddd, DD.MM.YYYY, HH:ss')}`);
    $("#date").text(`Now`);
    $("#weather-img").html(`<img src="https://openweathermap.org/img/wn/${(response.weather[0].icon)}.png"/>`);
    $("#weather").text(`${response.weather[0].description}`);
    $("#temp").text(`Temp: ${(response.main.temp - 273.15).toFixed(1)} °C`); 
    $("#humidity").text(`Humidity: ${response.main.humidity} %`);
    $("#wind").text(`Wind: ${(response.wind.speed * 3.6).toFixed(1)} km/h`);
   
  }); 
}


// wait until the page has loaded
$(window).on('load', () => {
  // testing function calls
  displayWeather("London", 51.5073219, -0.1276474);    
  updateExchangeRate(baseCurrency, wantedCurrency);

  // submit button to calculate exchanges money amount
  $("#exchange").on("click", event => {
    event.preventDefault();
    let form = new FormData(document.getElementById("form"));
    let valBase = form.get("val-cur1");
    let typeBase = form.get("type-cur1");
    let typeEx = form.get("type-cur2");
    updateExchangeRate(typeBase, typeEx, valBase);
  });
});