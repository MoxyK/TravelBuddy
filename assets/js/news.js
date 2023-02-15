$(document).ready(function () {
  
  appkey = "pub_1685584ea786012cacd69ff07a39293e82d98";
  $("#news-header").hide();

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
     
    
      if(data.status=="success")
      {    
        $("#news-header").show();   
       

        for(i=0; i<5; i++){
          console.log(data.results[i].title);

          htmlStr= '<div class="card">';
          htmlStr+='<div class="card-body">';
          htmlStr+= '<h5 class="card-title"></h5>';
          htmlStr +='<p class="card-text"><a href="';
          htmlStr += data.results[i].link;
          htmlStr+='"target="_blank">';
          htmlStr += data.results[i].title;
          htmlStr += '</a></p>';
          htmlStr+=' </div></div>';

          

          $('#news-text').append(htmlStr);

    
      }
      
      

    }

  }
  
  );

    
  //event.preventDefault();
    
  });


});