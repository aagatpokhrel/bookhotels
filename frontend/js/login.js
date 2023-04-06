document.getElementById('login-link').addEventListener('click', function(event) {
    login(event);
});


function login(event) {
    event.preventDefault();
    console.log('login');
    const username = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;
    
    // Send the login information to the backend as JSON
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => {
      if (response.ok) {
        // Store the received token in local storage
        return response.json();
      } else {
        // Display an error message if the login credentials are invalid
        throw new Error('Invalid username or password');
      }
    })
    .then(data => {
      localStorage.setItem('token', data.token);
      window.location.href = '../index.html';
    })
    .catch(error => {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('error');
        messageContainer.textContent = error.message;
        form.prepend(messageContainer);
    });
}