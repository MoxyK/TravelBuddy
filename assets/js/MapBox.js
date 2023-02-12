let accessToken = 'pk.eyJ1IjoibW94eS0iLCJhIjoiY2xkdzIxem45MDJnbTNybnZ6dndpaHdycSJ9.myBLbSV4M9QmJmkYflKQ0Q';

$(document).ready(function() {
    $("#submit").click(function() {
        let location = $("#searchInput").val();
        let queryURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=' + accessToken;

        // clear output section on subsequent searches
        $("#outputData").empty();

            $.ajax({
                url: queryURL,
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
                    // i.e -> [City: London, - Region: Greater London, - Country: England, United Kingdom: EN,GB] 
            $.ajax({
                url: queryURL,
                method: "GET"
            })
            
            .then(function(searchName) {
                let fullName = (searchName.features[0].place_name);
                let ISOcode = (searchName.features[0].properties.short_code);
                // MapBox data stores ISO in 2 possible locations -> if statement functions to find alternative data source
                if(ISOcode === undefined) {
                    ISOcodeAlt = (searchName.features[0].context[1].short_code);
                    $("#outputData").append("<p><h5>" + fullName + ": " + ISOcodeAlt + "</h5></p>");
                    $("#outputData").val('');
                } else {
                    $("#outputData").append("<p><h5>" + fullName + ": " + ISOcode + "</h5></p>");
                    $("#outputData").val('');
                }

                console.log(fullName);
                console.log(ISOcode, ISOcodeAlt);

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