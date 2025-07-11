const input = document.getElementById("text");
const searchBtn = document.getElementById("search-btn");
const ipAddressInput = document.getElementById("ip-address");
const locationInput = document.getElementById("location");
const timezoneInput = document.getElementById("timezone");
const ispInput = document.getElementById("isp");
const mapContainer = document.getElementById("map-container");

let map = L.map(mapContainer).setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

fetch(
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_NdLqLQI7GZ4VBLc1mNYzeIgbwMWUO&ipAddress="
)
  .then((response) => response.json())
  .then((data) => {
    ipAddressInput.innerText = `${data.ip}`;
    timezoneInput.innerText = `UTC ${data.location.timezone}`;
    locationInput.innerText = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
    ispInput.innerText = `${data.isp}`;

    let lat = data.location.lat;
    let lng = data.location.lng;

    mapLocation(lat, lng);
  });

const mapLocation = (lat, lng) => {
  let markerIcon = L.icon({
    iconUrl: "images/icon-location.svg",

    iconSize: [46, 56], // size of the icon
    iconAnchor: [23, 55], // point of the icon which will correspond to marker's location
  });
  map.setView([lat, lng], 17);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: false,
  }).addTo(map);

  L.marker([lat, lng], { icon: markerIcon }).addTo(map);
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (input.value.match(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/)) {
    let randomIP = input.value;
    url =
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_NdLqLQI7GZ4VBLc1mNYzeIgbwMWUO&ipAddress=` +
      randomIP;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        ipAddressInput.innerText = `${data.ip}`;
        timezoneInput.innerText = `UTC ${data.location.timezone}`;
        locationInput.innerText = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
        ispInput.innerText = `${data.isp}`;

        let lat = data.location.lat;
        let lng = data.location.lng;

        mapLocation(lat, lng);
      });
  } else {
    alert("You have entered an invalid IP address!");
    return false;
  }
});
