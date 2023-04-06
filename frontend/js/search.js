function searchHotels() {
    const location = document.getElementById('location').value;
    const price = document.getElementById('price').value;
    const standard = document.getElementById('standard').value;
    
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
      // Update the search results on the webpage
      const hotelsList = document.getElementById('hotels-list');
      hotelsList.innerHTML = ''; // Clear the current search results
      data.forEach(hotel => {
        const hotelCard = document.createElement('div');
        hotelCard.classList.add('hotel-card');
        hotelCard.innerHTML = `
          <img src="${hotel.image}" alt="${hotel.name}">
          <div class="hotel-info">
            <h3>${hotel.name}</h3>
            <p><span>Location:</span> ${hotel.location}</p>
            <p><span>Price per night:</span> $${hotel.price}</p>
            <p><span>Standard:</span> ${hotel.standard}</p>
            <p><span>Description:</span> ${hotel.description}</p>
          </div>
        `;
        hotelsList.appendChild(hotelCard);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}