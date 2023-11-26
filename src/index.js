const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const mongoUrl = "mongodb://0.0.0.0:27017";

app.use(bodyParser.json());

app.use(express.static("src/public"));

app.post("/addData", async (req, res) => {
  const dataContent = req.body.data;

  try {
    // Établir une connexion avec la base de données
    const client = new MongoClient(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();

    // Sélectionner la collection
    const collection = client.db().collection("data");

    // Insérer une nouvelle donnée dans la collection
    await collection.insertOne({ content: dataContent });

    // Fermer la connexion
    await client.close();

    res.json({ message: "Data added successfully" });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, MongoDB!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// ... (autres routes)
