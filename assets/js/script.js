// Currencies to exchange
let baseCurrency = "GBP";
let wantedCurrency = "NOK";

let renderCurrency = (currencyObj=null, currency="EUR") => {
  if (currencyObj === null) {
    currencyObj = JSON.parse(localStorage.getItem("currencyObj"));
  }

  $("#exchange-rate").text(`1 ${baseCurrency} is ${currencyObj.conversion_rates[currency]} ${currency}`);
  $("#exchange-rate").css("fontSize", "1.5em");
  $("#exchange-rate").css("color", "blue");
  // attribution of API and data timestamp
  $("#exchange-info").html(
    `Exchange rate retrieved at ${currencyObj.time_last_update_utc} (UTC) <br/>
    <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>`);
}

let updateExchangeRate = (baseCurrency="GBP", localCurrency="EUR") => {
  // retrieve Exchange rate data from local storage 
  let currencyObj = JSON.parse(localStorage.getItem("currencyObj"));

  // get exchange rate, save it to local storage, render exchange rate output on webpage
  if (!(currencyObj === null || currencyObj.length === 0 
    || currencyObj.time_next_update_unix < moment().unix() 
    || currencyObj.base_code !== baseCurrency)) {
    // currencyObj is null, [] or '' (empty string) or datda out of date or base currency has changes
    // data only gets updated ones a day, so does not need to be requested more than once a day
    // suggestion to save response in local storage to contain all currencies from a suggested base currency
    renderCurrency(currencyObj);
  }
  const APIKey = "87a05fbcbcfbff2bf1ee9c3f";
  let queryURL = `https://v6.exchangerate-api.com/v6/${APIKey}/latest/${baseCurrency}`;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    if (response.result === "success") {
      localStorage.setItem("currencyObj", JSON.stringify(response));
      renderCurrency(response, localCurrency)
    }
  });
}

updateExchangeRate(baseCurrency, wantedCurrency);
