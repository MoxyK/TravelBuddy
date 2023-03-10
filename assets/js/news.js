  
  
  appkey = "pub_1685584ea786012cacd69ff07a39293e82d98";
  $("#news-header").hide();

  //getting news from the news data vendor based on country code available in local storage
  function getnews(){
     let countrycode= localStorage.getItem("countrycode");
     console.log(countrycode);
     //const ccarray = countrycode.split("-");
     //let countryshortcode = ccarray[0].toLowerCase();
    
    var qryLocationURL = "https://newsdata.io/api/1/news?apikey="+appkey+"&country="+countrycode;
    console.log(qryLocationURL);

    fetch (qryLocationURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //clearing the existing news if any
      $('#news-text').html("");
      if(data.status=="success")
      {    
        $("#news-header").show();   
       

        //getting the top 5 news
        for(i=0; i<5; i++) {
          console.log(data.results[i].title);

          htmlStr= '<div class="card border-success">';
          htmlStr+='<div class="card-body">';
          htmlStr+= '<h5 class="card-title"></h5>';
          htmlStr +='<p class="card-text"><a href="';
          htmlStr += data.results[i].link;
          htmlStr+='"target="_blank" class="text-dark">';
          htmlStr += data.results[i].title;
          htmlStr += '</a></p>';
          htmlStr+=' </div></div>';

          $('#news-text').append(htmlStr);
    
      }
      
      

    }

  }
  
  );
  }

//});
