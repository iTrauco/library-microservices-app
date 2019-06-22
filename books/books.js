//////=========================================================
// LOAD EXPRESS |
const express = require('express');
const app = express();
// LOAD BODY-PARSER
const bodyParser = require('body-parser');
// CONFIGURE BODY-PARSER
app.use(bodyParser.json());
// LOAD MONGOOSE |
const mongoose = require('mongoose');
//
//////=========================================================
// CONFIGURE MONGODB CONNECTION w/ SECURED CREDENTIALS
const { mongoURI } = require('../config/keys');

const mongoURL = `${mongoURI}`;

mongoose.connect(mongoURL, () => {
    console.log('Connected to MongoDB...');
});

const PORT = 3333;
//
//////=========================================================
//// CONFIGURE ROUTES 
// GET FUNCTION |
app.get('/', (req, res) =>  {
    res.send('This is the \'books\' service...');
})
// POST(CREATE) FUNCTION |
app.post('/book', (req, res) => {
    console.log(req.body)
    res.send('Testing book route... Success!!!')
})
//
//////=========================================================
// CONFIGURE SERVER
app.listen(PORT, () => {
    console.log(`Books service is now listening on port ${PORT}...`);
})