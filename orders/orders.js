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
// LOAD AXIOS
const axios = require('axios');
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
        console.log('New Order Created!')
        res.send('Order successfully created...')
    }).catch((err) => {
        if(err) {
            throw err;
        }
    })
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

// GET CROSS-SERVICE REQUEST TO DISPLAY CUSTOMER NAME AND BOOK TITLE INSTEAD OF DB 'ID'
app.get('/order/:id', (req, res) => {

    Order.findById(req.params.id).then((order) => {
        if(order) {

            axios.get('http://localhost:4444/customer/' + order.CustomerID).then((response) => {
                // console.log(response)

            const orderObject = { customerName: response.data.name, bookTitle: ''}

            axios.get('http://localhost:3333/book/' + order.BookID).then((response) => {

                orderObject.bookTitle = response.data.title
                res.json(orderObject)
            })

        })

            // If order is valid make a request to each service
        } else {
            res.send('Invalid Order')
        }
    })
})

//
//////=========================================================
// CONFIGURE SERVER
app.listen (PORT, () => {
    console.log(`Orders services is now listening on port ${PORT}...`);
})