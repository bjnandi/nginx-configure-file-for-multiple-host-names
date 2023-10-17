const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser')
const axios = require('axios');
const app = express();
const PORT = 5000;

const HOSTNAME = 'backend, api.student.bjtechlife.com'
const LBIP = 'api.student.bjtechlife.com' // Replace with your load balancer server IP

// Replace the URL string with your mongodb connection string.
const mongoUrl= 'mongodb://mongodb_ip:27017/';


const client = new MongoClient(mongoUrl);
const db = client.db('mydatabase'); // Name of your database
const collection = db.collection('mycollection'); // Name of your collection

let dbConTest = '';
// Database connection function
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Server');
    dbConTest = 'Connected';
  } catch (error) {
    console.error('Error connecting to MongoDB Server:', error);
  }
}

connectToMongoDB();

// Home page
app.get('/', (req, res) => {

 const currentURL = req.protocol + '://' + LBIP + req.originalUrl;

  if (dbConTest == 'Connected') {
    res.send(`<h1>Host: ${HOSTNAME} </h1> <h3>Database connection success</h3>Browser for insert data <a href="${currentURL}insertData"; target="_blank" ><b>${currentURL}insertData</b></a><br>Browser for fatch data <a href="${currentURL}fetchData"; target="_blank" ><b>${currentURL}fetchData</b></a>`);
  } else {
    res.send('Error connecting to MongoDB')
  }

});

app.use(bodyParser.json())

// Client site request with constant value
app.get('/insertData', (req, res) => {

  const useInput = {
    name: 'Biswajit Nandi',
    email: 'nbiswajit94@gmail.com'
  };

  // Request to server from client & get response
  axios.post('http://localhost:5000/insert', useInput)
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      console.error('Error inserting data:', error);
    });
});

// Insert data to database, request from client
app.post('/insert', async (req, res) => {

  const userdata = req.body;

  try {
    await collection.insertOne(userdata);
    res.json({ host: HOSTNAME, Message: 'User inserted successfully', User: userdata });
  } catch (error) {
    res.status(500).json({ error: 'Could not insert user' });
  }
});

// Get data from database
app.get('/fetchData', async (req, res) => {

  try {
    const hostinfo = { host: HOSTNAME };
    const result = await collection.find().toArray();
    const responseArray = [hostinfo, result];
    res.send(responseArray);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});