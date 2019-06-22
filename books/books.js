//////=========================================================
// LOAD EXPRESS |
const express = require('express');
const app = express();
// LOAD MONGOOSE |
const mongoose = require('mongoose');
//
//////=========================================================
// SECURE MONGODB CONNECTION |
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
// POST FUNCTION |
app.post('/', (req, res) => {

})
//
//////=========================================================
// CONFIGURE SERVER
app.listen(PORT, () => {
    console.log(`Books service is now listening on port ${PORT}...`);
})