// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

// nav menu
function openNav() {
    document.getElementById("myNav").classList.toggle("menu_width");
    document
        .querySelector(".custom_menu-btn")
        .classList.toggle("menu_btn-style");
}

src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'

document.addEventListener("DOMContentLoaded",function(){
    const map = L.map('map').setView([-25.6756,28.2545], 15);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom:19,
    attribution:'OpenStreetMap'
  }).addTo(map);

  L.marker([-25.6756,28.2545]).addTo(map)
  .blindPopup('833b Baccara Street, Montana, Pretoria')
  .openPopup();
  });