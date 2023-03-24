//Selectors

const loginLink = document.getElementById("logged-on");
const loginNav = document.getElementsByClassName("change");
const form = document.querySelector('form');
const results = document.getElementById('hotels-list');
const price_text = document.getElementById('current-price');
const slider = document.getElementById('price');

slider.oninput = function() {
    price_text.innerHTML = this.value;
}
// Sample data
const hotels = [
    { name: "Hotel A", location: "New York", price: 200, standard: "standard" },
    { name: "Hotel B", location: "Los Angeles", price: 150, standard: "budget" },
    { name: "Hotel C", location: "San Francisco", price: 300, standard: "deluxe" },
    { name: "Hotel D", location: "Miami", price: 400, standard: "luxury" },
    { name: "Hotel E", location: "Chicago", price: 100, standard: "budget" },
];

function searchHotels() {
    // event.preventDefault(); // Prevent the form from submitting
  
    const location = form.location.value;
    const price = form.price.value;
    const standard = form.standard.value;
  
    // Filter the hotels based on the search criteria
    const filteredHotels = hotels.filter(function(hotel) {
      if (location && hotel.location !== location) {
        return false;
      }
  
      if (price && hotel.price > price) {
        return false;
      }
  
      if (standard && hotel.standard !== standard) {
        return false;
      }
  
      return true;
    });
  
    // Display the search results
    if (filteredHotels.length === 0) {
      results.innerHTML = '<p>No results found.</p>';
    } else {
      let html = '<ul>';
      filteredHotels.forEach(function(hotel) {
        html += `<li><h3>${hotel.name}</h3><p>${hotel.location} - ${hotel.price}$ - ${hotel.standard}</p></li>`;
      });
      html += '</ul>';
      results.innerHTML = html;
    }
}