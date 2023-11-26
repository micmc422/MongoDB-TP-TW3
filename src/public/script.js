function sendData() {
    const dataInput = document.getElementById('dataInput');
    const outputDiv = document.getElementById('output');
  
    const data = dataInput.value;
  
    // Utilisez fetch pour envoyer des données au serveur
    fetch('/sendData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })
    .then(response => response.json())
    .then(result => {
      outputDiv.innerText = `Server Response: ${result.message}`;
    })
    .catch(error => {
      console.error('Error sending data:', error);
    });
  }
  