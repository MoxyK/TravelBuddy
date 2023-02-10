let accessToken = 'pk.eyJ1IjoibW94eS0iLCJhIjoiY2xkdzIxem45MDJnbTNybnZ6dndpaHdycSJ9.myBLbSV4M9QmJmkYflKQ0Q';

$(document).ready(function() {
    $("#submit").click(function() {
        let location = $("#searchInput").val();
        let queryURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=' + accessToken;

            $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(search) {
                // let result = outputData(response);
                // $("#outputData").html(result);
                // $("#outputData").val('');
                    document.getElementById('submit').addEventListener('click', () => {
                        // Fly to location
                        map.flyTo({
                        center: [(search.features[0].center)],
                        essential: true // this animation is considered essential with respect to prefers-reduced-motion
                        });
                    });
                    console.log(search.features[0].center);
            })
        
    })
})

mapboxgl.accessToken = 
'pk.eyJ1IjoibW94eS0iLCJhIjoiY2xkdzIxem45MDJnbTNybnZ6dndpaHdycSJ9.myBLbSV4M9QmJmkYflKQ0Q';
let map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
center: [-74.5, 40], // starting position [lng, lat]
zoom: 9, // starting zoom
});
console.log(mapboxgl);


// document.getElementById('submit').addEventListener('click', () => {
//     // Fly to a random location
//     map.flyTo({
//     center: [(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 100],
//     essential: true // this animation is considered essential with respect to prefers-reduced-motion
//     });
//     });