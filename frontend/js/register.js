document.getElementById('register-link').addEventListener('click', function(event) {
    register(event);
});

function register(event) {
    event.preventDefault();

    if (document.querySelector('.error')) {
      document.querySelector('.error').remove();
    }
    
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input');

    const data = {};
    inputs.forEach(input => {
      data[input.name] = input.value;
    });
    
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Username or email already exists');
      }
      return response.json();
    })
    .then(data => {
      // localStorage.setItem('token', data.token);
      window.location.href = 'login.html';
    })
    .catch(error => {
      const messageContainer = document.createElement('div');
      messageContainer.classList.add('error');
      messageContainer.textContent = error.message;
      messageContainer.style.color = 'red';
      form.prepend(messageContainer);
    });
}
