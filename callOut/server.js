const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

let storedData = {}; // Object to store data
//const allowedDomains = ["http://192.168.0.106:3000","http://localhost:3000/data","https://manimeghanamani.wixstudio.io/callfunction"]
app.use(bodyParser.json());

  
  // app.use(cors({
  //   origin: allowedDomains,
  //   credentials: true
  // }));
  app.use(cors({
    origin: ['http://192.168.0.106:3000', 'https://manimeghanamani.wixstudio.io','http://localhost:3000/data'], // Add all allowed origins here
    methods: 'POST', // Allow only POST method
    allowedHeaders: ['Content-Type'], // Allow only specific headers
    optionsSuccessStatus: 200
  }));

  //app.use(cors())

app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  storedData = { name, email };
  console.log(`Received data: Name - ${name}, Email - ${email}`);
  res.json({ message: 'Data received successfully', receivedData: req.body });
});

// Endpoint to get the stored data
app.get('/data', (req, res) => {
  res.json(storedData);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
