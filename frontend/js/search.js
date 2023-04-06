const bookHotelList = [];

function renderHotels(data) {
    const hotelsList = document.getElementById('hotels-list');
    hotelsList.innerHTML = ''; // Clear the current search results
    data.forEach((hotel,i) => {   
        const hotelCard = createHotelCard(hotel,i);
        hotelsList.appendChild(hotelCard);
  });
}

function createHotelCard(hotel,i) {
  const hotelCard = document.createElement('div');
  hotelCard.classList.add('hotel-card');
  hotelCard.innerHTML = `
    <img src="../images/room_${i}.jpg" alt="${hotel.name}">
    <div class="hotel-info">
      <h3>${hotel.name}</h3>
      <p><span>Location:</span> ${hotel.location}</p>
      <p><span>Price per night:</span> $${hotel.price}</p>
      <p><span>Standard:</span> ${hotel.standard}</p>
      <p><span>Description:</span> ${hotel.description}</p>
      <button onclick="bookHotel('${hotel.name}')">Book Now</button>
    </div>
  `;
  return hotelCard;
}

function bookHotel(name) {
  bookHotelList.push(name);
  alert(`${name} has been added to your bookings.`);
  displayBookList();
  displayTotal();
}

function searchHotels() {
    const location = document.getElementById('location').value;
    const price = document.getElementById('price').value;
    const standard = document.getElementById('standard').value;
    console.log(location, price, standard);
    // Create an object containing the search criteria
    const searchCriteria = {
      location,
      price,
      standard
    };
  
    // Send an AJAX request to the backend to search for hotels
    fetch('http://localhost:5000/hotels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Add the user token to the headers
      },
      body: JSON.stringify(searchCriteria)
    })
    .then(response => response.json())
    .then(data => {
        // Render the search results
        renderHotels(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displayBookList() {
    const bookListContainer = document.querySelector("#purchase-list");
    bookListContainer.innerHTML = "";
    
    bookHotelList.forEach((hotel) => {
      const hotelItem = document.createElement("div");
      hotelItem.classList.add("hotel-item");
      
      const hotelName = document.createElement("span");
      hotelName.textContent = hotel.name;
      
      const hotelPrice = document.createElement("span");
      hotelPrice.textContent = `$${hotel.price}`;
      hotelPrice.classList.add("price");
      
      hotelItem.appendChild(hotelName);
      hotelItem.appendChild(hotelPrice);
      bookListContainer.appendChild(hotelItem);
    });
  }
  
  function displayTotal() {
    const totalContainer = document.querySelector("total-price");
    const totalPrice = bookHotelList.reduce((total, hotel) => total + hotel.price, 0);
    
    const totalText = document.createElement("span");
    totalText.textContent = `Total: $${totalPrice}`;
    
    totalContainer.innerHTML = "";
    totalContainer.appendChild(totalText);
  }
  
  
  

