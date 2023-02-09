let accessToken = 'pk.eyJ1IjoibW94eS0iLCJhIjoiY2xkdzIxem45MDJnbTNybnZ6dndpaHdycSJ9.myBLbSV4M9QmJmkYflKQ0Q';
let query = 'https://api.mapbox.com/geocoding/v5/mapbox.places/London.json?' + 'access_token=' + accessToken;

 $.ajax({
        url: query,
        method: 'GET'
    })
    .then(function(search) {
        console.log(search);

})

// https://api.mapbox.com/geocoding/v5/mapbox.places/London.json?access_token=pk.eyJ1IjoibW94eS0iLCJhIjoiY2xkdzIxem45MDJnbTNybnZ6dndpaHdycSJ9.myBLbSV4M9QmJmkYflKQ0Q