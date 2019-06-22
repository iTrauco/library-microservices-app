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
// IMPORT MODEL | LOAD BOOK COLLECTION
require('./Book')
const Book = mongoose.model('Book')
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
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        numOfPages: req.body.numOfPages,
        publisher: req.body.publisher
    }
// CREATE A NEW BOOK |
    const book = new Book(newBook)

    book.save().then(() => {
        console.log('New Book Created')
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
    res.send("A new book has been successfully created...")
})
//
//////=========================================================
// CONFIGURE SERVER
app.listen(PORT, () => {
    console.log(`Books service is now listening on port ${PORT}...`);
})