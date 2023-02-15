let accessToken = 'pk.eyJ1IjoibW94eS0iLCJhIjoiY2xkdzIxem45MDJnbTNybnZ6dndpaHdycSJ9.myBLbSV4M9QmJmkYflKQ0Q';

// country information data pull made using the country Code ID returned by mapbox API call.
function getCountryData(shortCode) {
    $.ajax({
        url: 'https://restcountries.com/v2/alpha/' + shortCode,
        method: "GET",
        dataType: "json"
    })

    .then(function(info) {
        console.log(info);
        let timezone = (info.timezones[0]);
        let flag = (info.flag);
        let currency = (info.currencies[1,2]);
        let language = (info.languages[0].name);
        let


        
        // $("#info").append("<p><h6>" + "<img src= "">" + "<br>" + "</h6></p>");
        // $("#info").val('');
        // $("#flag").append(flag);
    })
};

$(document).ready(function() {
    $("#submit").click(function() {
        let location = $("#searchInput").val();
        let shortCode = $("#shortCode").val();
        let mapQueryURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=' + accessToken;

        // clear output section on subsequent searches
        $("#outputData").empty();

            $.ajax({
                url: mapQueryURL,
                method: "GET"
            })
            // Return and consoleLog Longitude and Latitude as 2 seperate variables defined by searchInput.
            .then(function(searchLo) {
                let long = (searchLo.features[0].center[0]);
                let lati = (searchLo.features[0].center[1]);
                        console.log(long);
                        console.log(lati);
                        console.log(searchLo.features[0]);
                            // Fly to location defined by longitude latitude variables
                            map.flyTo({
                            center: [(long), (lati)],
                            essential: true // this animation is considered essential with respect to prefers-reduced-motion
                            })  
                })

                       // Next data call-function should display full location name and Country ISO tag in size scaling 
                    // i.e -> [City: London, - Region: Greater London, - Country: England, United Kingdom & GB] 
            $.ajax({
                url: mapQueryURL,
                method: "GET"
            })
            
            .then(function(searchName) {
                let fullName = (searchName.features[0].place_name);
                let ISOcode = (searchName.features[0].context[searchName.features[0].context.length-1].short_code);
                    $("#nameTitle").append("<p><h4>" + fullName + "</h4></p>");
                    $("#nameTitle").val('');
                    $("#shortCode").append("<h5>" + ISOcode + "</h5>");
                    $("#shortCode").val('');

                console.log(fullName);
                console.log(ISOcode);

            console.log('https://restcountries.com/v2/alpha/' + ISOcode);
            getCountryData(ISOcode);

            //store the current search country code in local storage to display the news by country
            localStorage.setItem("countrycode", ISOcode);
            getnews();
        
        })
    })
});


mapboxgl.accessToken = 
'pk.eyJ1IjoibW94eS0iLCJhIjoiY2xkdzIxem45MDJnbTNybnZ6dndpaHdycSJ9.myBLbSV4M9QmJmkYflKQ0Q';
let map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
center: [-74.5, 40], // starting position [lng, lat]
zoom: 9, // starting zoom
});
console.log(mapboxgl)