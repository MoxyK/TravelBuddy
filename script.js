$(document).ready(function () {

  appkey = "pub_1685584ea786012cacd69ff07a39293e82d98";

  $("#search-form").submit(function (event) {
      let countrycode = $("#search-input").val().trim();
           
      var qryLocationURL = "https://newsdata.io/api/1/news?apikey="+appkey+"&country="+countrycode;
    
     console.log(qryLocationURL);


      fetch (qryLocationURL)
      .then((response) => {

        console.log(response);
      });

      event.preventDefault();

    });

});
