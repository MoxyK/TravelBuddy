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
    $("body").append(txt);

    console.log(response.conversion_rates.EUR);
    console.log(response.time_last_update_unix);

  });