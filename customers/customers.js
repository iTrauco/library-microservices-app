//////=========================================================
// LOAD EXPRESS
const express = require('express');
const app = express()
// LOAD BODY-PARSER
const bodyParser = require('body-parser');
// LOAD MONGOOSE
const mongoose = require('mongoose');
// IMPORT MODEL | LOAD COLLECTION
require('./Customer')
const Customer = mongoose.model('Customer')
//
//////=========================================================
// CONFIGURE CONNECTION TO MONGODB
const { MongoURI } = require('../config/customers');

const MongoURL = `${MongoURI}`;

mongoose.connect(MongoURL, () => {
    console.log('Connected to MongoDB...');
});

const PORT = 4444;
//
//////=========================================================
// CONFIGURE ROUTES



//
//////=========================================================
// CONFIGURE SERVER
app.listen(PORT, () => {
    console.log(`Customers service is now listening on port ${PORT}...`);
})