$(document).ready(function () {
  
  appkey = "pub_1685584ea786012cacd69ff07a39293e82d98";

//search function to get the news based on country
  $("#btnSearch").click(function() {
    let countrycode = $("#search-input").val().trim();
    console.log(countrycode);
    var qryLocationURL = "https://newsdata.io/api/1/news?apikey="+appkey+"&country="+countrycode;
    console.log(qryLocationURL);

    fetch (qryLocationURL)
    .then((response) => response.json())
  .then((data) => {
    console.log(data);
     
    for(i=0; i<data.results.length; i++){
      console.log(data.results[i].title);

    }

  }
  
  );

    
  //event.preventDefault();
    
  });


});
