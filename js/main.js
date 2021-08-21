let map,
  markers = [],
  geocoder;

// Function that initialize map

function initMap(
  center = { lat: 23.72910180562339, lng: 90.28083688112841 },
  zoom = 16
) {
  // Initializing map constructor

  map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: zoom,
  });

  // Event listener on the map

  map.addListener('click', (e) => {
    handleClickOverMap(e.latLng.toJSON());
  });

  // Getting user geo location coordinates

  getUserLocationCords();
}

// Function that gets user location coordinates

function getUserLocationCords() {
  // Check whether browser has navigator or not

  if (navigator.geolocation) {
    // Calling browsers native geolocation API

    navigator.geolocation.getCurrentPosition(successfulCallback, errorCallback);
  } else {
    // Browser doesn't support Geolocation

    handleLocationError(false);
  }
}

// Funtion on successful user permission

function successfulCallback(position) {
  const pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };

  // Set a marker and pan to it
  setMarker(pos);
}

// Funtion on denying user permission

function errorCallback() {
  handleLocationError(true);
}

// Function that handles location error

function handleLocationError(browserHasGeolocation) {
  console.log(
    browserHasGeolocation
      ? 'Browser has geolocation'
      : "Browser don't have geolocation"
  );
}

// Funstion that sets marker on the map

function setMarker(pos) {
  // Setting marker on the map

  const marker = new google.maps.Marker({
    position: pos,
    map,
    icon: '../img/person-pin.png',
  });

  map.panTo(new google.maps.LatLng(pos.lat, pos.lng));

  if (markers.length === 0) {
    // if there's no marker then
    markers.push(marker);
  } else {
    // if there's existing marker then it setting map to null
    markers[0].setMap(null);

    // popping the marker
    markers.pop();

    // pushing new marker
    markers.push(marker);
  }

  // Initializing geocoder constructor

  getAddress(pos);
}

// Function that handles click over the map

function handleClickOverMap(pos) {
  // Setting marker on the map
  setMarker(pos);

  console.log(pos);
}

// Function that retrive address using reverse geocoding

function getAddress(pos) {
  const lat = pos.lat;
  const lng = pos.lng;
  const key = 'AIzaSyDstPWVbJ-HiKQkgEXF2bvVwfUgRR8LtTY';

  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`
  )
    .then((response) => response.json())
    .then((data) => {
      alert(data.results[0].formatted_address);
    });
}
