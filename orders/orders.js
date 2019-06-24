//////=========================================================
// LOAD EXPRESS
const express = require('express');
const app = express();
// LOAD BODY-PARSER
const bodyParser = require('body-parser');
// CONFIGURE BODY-PARSER
app.use(bodyParser.json());
// LOAD MONGOOSE
const mongoose = require('mongoose');
// IMPORT MODEL | LOAD COLLECTION

//
//////=========================================================
// CONFIGURE CONNECTION TO MONGODB
const { mongoURI } = require('../config/orders');

const mongoURL = `${mongoURI}`;

mongoose.connect(mongoURL, 
    {
        useNewUrlParser: true
    }, () => {
        console.log('\'Orders\' service connected to MongoDB...');
})


const PORT = 5555;



//
//////=========================================================
// CONFIGURE SERVER
app.listen (PORT, () => {
    console.log(`Orders services is now listening on port ${PORT}`);
})