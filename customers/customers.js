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

// POST
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

// GET A LIST OF EVERY 'CUSTOMER' IN THE DB
app.get('/customers', (req, res) => {
    Customer.find().then((customers) => {
        res.json(customers)
    }).catch((err) => {
        if(err) {
            throw err;
        }
    })
})

// GET A SINGLE 'CUSTOMER' BY ID
app.get('/customer/:id', (req,res) => {

    Customer.findById(req.params.id).then((customer) => {
        if(customer) {
            // Return customer if valid 'id' exists
            res.json(customer)
        } else {
            res.send('Invalid ID...')
        }
    }).catch((err) => {
        if(err) {
            throw err;
        }
    })
})

// DELETE CUSTOMER FROM DB
app.delete('/customer/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id).then(() => {
        res.send('Customer successfully deleted from DB...')
    }).catch((err) => {
        if(err) {
            throw err;
        }
    })
})

//
//////=========================================================
// CONFIGURE SERVER
app.listen(PORT, () => {
    console.log(`Customers service is now listening on port ${PORT}...`);
})