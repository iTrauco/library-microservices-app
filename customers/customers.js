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
require('./Customer')
const Customer = mongoose.model('Customer')
//
//////=========================================================
// CONFIGURE CONNECTION TO MONGODB
const { mongoURI } = require('../config/customers');

const mongoURL = `${mongoURI}`;

mongoose.connect(mongoURL, { useNewUrlParser: true }, () => {
    console.log('Connected to MongoDB...');
});

const PORT = 4444;
//
//////=========================================================
// CONFIGURE ROUTES

// POST FUNCTION
app.post('/customer', (req, res) => {

    const newCustomer = {
        name: req.body.name,
        age: req.body.age, 
        address: req.body.address
    }

// CREATE NEW CUSTOMER 
    const customer = new Customer(newCustomer)

    customer.save().then(() => {
        console.log("New Customer Created")
    }).catch((err) => {
        if(err) {
            throw err;
        }
    })
    res.send('A new customer has been created...')
})

//
//////=========================================================
// CONFIGURE SERVER
app.listen(PORT, () => {
    console.log(`Customers service is now listening on port ${PORT}...`);
})