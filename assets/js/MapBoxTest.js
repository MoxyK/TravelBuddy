

let accessToken = 'pk.eyJ1IjoibW94eS0iLCJhIjoiY2xkdzIxem45MDJnbTNybnZ6dndpaHdycSJ9.myBLbSV4M9QmJmkYflKQ0Q';
let queryURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/London.json?' + 'access_token=' + accessToken;

 $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .then(function(response) {
        console.log(queryURL);
        console.log(response);
})
.catch(function(error) {
    console.log(error);
});




// https://api.mapbox.com/geocoding/v5/mapbox.places/London.json?access_token=pk.eyJ1IjoibW94eS0iLCJhIjoiY2xkdzIxem45MDJnbTNybnZ6dndpaHdycSJ9.myBLbSV4M9QmJmkYflKQ0Q