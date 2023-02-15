//$(document).ready(function () {

  appkey = "pub_1685584ea786012cacd69ff07a39293e82d98";
  $("#news-header").hide();

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
<<<<<<< HEAD
          htmlStr+=' target=_blank">';
=======
          htmlStr+='"target="_blank">';
>>>>>>> a85863d913526023bf8259241c96b146c6290ce8
          htmlStr += data.results[i].title;
          htmlStr += '</a></p>';
          htmlStr+=' </div></div>';

          $('#news-text').append(htmlStr);
    
      }
      
      

    }

  }
  
  );
  }

<<<<<<< HEAD
//});
=======
    
  //event.preventDefault();
    
  });


});
>>>>>>> a85863d913526023bf8259241c96b146c6290ce8
