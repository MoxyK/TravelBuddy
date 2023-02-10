let accessToken = 'pk.eyJ1IjoibW94eS0iLCJhIjoiY2xkdzIxem45MDJnbTNybnZ6dndpaHdycSJ9.myBLbSV4M9QmJmkYflKQ0Q';

$(document).ready(function() {
    $("#submit").click(function() {
        let location = $("#searchInput").val();
        let queryURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=' + accessToken;

            $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(searchLo) {
                let long = (searchLo.features[0].center[0]);
                let lati = (searchLo.features[0].center[1]);
                        console.log(long);
                        console.log(lati);
                        console.log(searchLo.features[0]);
                            // Fly to a random location
                            map.flyTo({
                            center: [(long), (lati)],
                            essential: true // this animation is considered essential with respect to prefers-reduced-motion
                            })

            .then(function(searchLo) {
                let result = outputData(searchLo.context);
                $("#outputData").html(result);
                $("#outputData").val('');
                
                }) 
            })

        function outputData(searchLo) {
    return '<div><h4>' + searchLo.context[1].text
        }

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