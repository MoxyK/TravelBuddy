// Currencies to exchange
let baseCurrency = "GBP";
let wantedCurrency = "EUR";

// retrieve Exchange rate data from local storage 
let currencyResponse = JSON.parse(localStorage.getItem("currencyRespose"));

const successCallback = (position) => {
  console.log(position);
};

/*
let getLocation = () => {
// get local position 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const APIKey = "87a05fbcbcfbff2bf1ee9c3f";
      const queryURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=${1}&appid=${APIKey}`;
      console.log(queryURL);
      
      $.ajax({
        url: queryURL, 
        method: "GET";
      }).then((response) => {
          console.log(response);
          //alert(response.countryName);
      });
    });
  } else {
    //alert("Geolocation is not supported by this browser."); 
    }); 
  }
} */

let renderCurrency = (currencyResponse=null) => {
  if (currencyResponse === null) {
    currencyResponse = JSON.parse(localStorage.getItem("currencyRespose"));
  }

  $("#exchange-rate").text(`1 ${baseCurrency} is ${currencyResponse.conversion_rates[wantedCurrency]} ${wantedCurrency}`);
  // attribution of API and data timestamp
  $("#exchange-info").html(
    `Echange rate retrieved at ${currencyResponse.time_last_update_utc} (UTC) <br/>
    <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>`);
}

let updateExchangeRate = () => {
  // get exchange rate, save it to local storage, render exchange rate output on webpage
  const APIKey = "87a05fbcbcfbff2bf1ee9c3f";
  let queryURL = `https://v6.exchangerate-api.com/v6/${APIKey}/latest/${baseCurrency}`;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    if (response.result === "success") {
      localStorage.setItem("currencyRespose", JSON.stringify(response));
      renderCurrency(response)
    }
  });
}

//getLocation();

if (currencyResponse === null || currencyResponse.length === 0 
  || currencyResponse.time_next_update_unix < moment().unix() 
  || currencyResponse.base_code !== baseCurrency) {

    // currencyResponse is null, [] or '' (empty string) or datda out of date or base currency has changes
    // data only gets updated ones a day, so does not need to be requested more than once a day
    // suggestion to save response in local storage to contain all currencies from a suggested base currency
    updateExchangeRate();
} else {
  renderCurrency(currencyResponse);
}
  
  /* window.addEventListener("storage", func)
  window.onstorage = (event) => {
  if (event.key === "title"){
    alert(`your new title is ${event.newValue} the previous was ${event.oldValue}`)
  }
    alert('SAVED!!');
  } */


  country = {
    shortCode: "GB",
    currency: "GBP",
  }