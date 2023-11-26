const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://0.0.0.0:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.json());

app.use(express.static('src/public'));

app.post('/sendData', (req, res) => {
  const data = req.body.data;

  // Faites quelque chose avec les données, par exemple, enregistrez-les dans MongoDB
  // Pour cet exemple, nous renvoyons simplement un message
  res.json({ message: `Data received: ${data}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
