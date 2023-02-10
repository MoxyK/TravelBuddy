const APIKey = "87a05fbcbcfbff2bf1ee9c3f";
let baseCurrency = "GBP";
let queryURL = `https://v6.exchangerate-api.com/v6/${APIKey}/latest/${baseCurrency}`;

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // console dump of API query
    console.log(response)
    // screen dump of API query
    response.result === "success"
    let txt = $("<div>").text(`1 GBP is ${response.conversion_rates.EUR} Euro`);
    // attribution of API
    let attribution = $("<div>").html('<a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>');
    $("body").append(txt, attribution);

    console.log(response.conversion_rates.EUR);
    console.log(response.time_last_update_unix);

    /* - data only gets updated ones a day, 
    so does not need to be requested more than once a day
    suggestion to save response in local storage to 
    contain all currencies from a suggested base currency


    time_last_update_unix
    : 
    1675814401
    time_last_update_utc
    : 
    "Wed, 08 Feb 2023 00:00:01 +0000"
    time_next_update_unix
    : 
    1675900801
    time_next_update_utc
    : 
    "Thu, 09 Feb 2023 00:00:01 +0000"

    */

  });