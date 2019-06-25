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
require('./Order')
const Order = mongoose.model('Order')
//
//////=========================================================
// CONFIGURE CONNECTION TO MONGODB
const { mongoURI } = require('../config/orders');

const mongoURL = `${mongoURI}`;

mongoose.connect(mongoURL, 
    {
        useNewUrlParser: true,
        useFindAndModify: false 
    }, () => {
    console.log('\'Orders\' service connected to MongoDB...');
})

const PORT = 5555;
//
//////=========================================================
//// CONFIGURE ROUTES 

// POST
app.post('/order', (req, res) => {

    const newOrder = {
        CustomerID: mongoose.Types.ObjectId(req.body.CustomerID), // Converts string data to 'ObjectID'
        BookID: mongoose.Types.ObjectId(req.body.BookID), // Converts string data to 'ObjectID'
        checkoutDate: req.body.checkoutDate, 
        returnDate: req.body.returnDate
    }

    // CREATE NEW ORDER
    const order = new Order(newOrder)

    order.save().then(() => {
        // console.log('New Order Created!')
        res.send('Order successfully created...')
    }).catch((err) =>{
        if(err) {
            throw err;
        }
    })
    res.send('A new \'order\' has been successfully created...')
})

// GET LIST OF EVERY 'ORDER' IN DB
app.get('/orders', (req, res) => {

    Order.find().then((books) => {
        res.json(books)
    }).catch((err) => {
        if(err) {
            throw err;
        }
    })

})

//
//////=========================================================
// CONFIGURE SERVER
app.listen (PORT, () => {
    console.log(`Orders services is now listening on port ${PORT}...`);
})