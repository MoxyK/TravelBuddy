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
  exCur.val(curValue * currencyObj.conversion_rates[currency]);

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

  