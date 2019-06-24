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
require('./Book')
const Book = mongoose.model('Book')
//
//////=========================================================
// CONFIGURE CONNECTION TO MONGODB
const { mongoURI } = require('../config/keys');

const mongoURL = `${mongoURI}`;

mongoose.connect(mongoURL, 
    { 
        // useNewUrlParser: true 
        useNewUrlParser: true, 
        useFindAndModify: false  
    }, () => {
        console.log('\'Books\' service connected to MongoDB...');
});

const PORT = 3333;
//
//////=========================================================
//// CONFIGURE ROUTES 

// GET
app.get('/', (req, res) =>  {
    res.send('This is the \'books\' service...');
})

// POST
app.post('/book', (req, res) => {

    const newBook = {
        title: req.body.title,
        author: req.body.author,
        numOfPages: req.body.numOfPages,
        publisher: req.body.publisher
    }

    // CREATE A NEW BOOK 
    const book = new Book(newBook)

    book.save().then(() => {
        console.log('New Book Created!')
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
    res.send("A new \'book\' has been successfully created...")
})
// GET LIST OF EVERY 'BOOK' IN THE DB
app.get('/books', (req, res) => {
    
    Book.find().then((books) => {
        // console.log(books)
        res.json(books)
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})
// GET A SINGLE 'BOOK' BY ID
app.get('/book/:id', (req, res) => {
    Book.findById(req.params.id).then((book) => {
    
        if(book){
            // Return book data if valid 'id' exists
            res.json(book)
        } else {
            res.sendStatus(404);
        }

    }).catch(err => {
        if(err) {
            throw err;
        }
    })
})
// DELETE 'BOOK' FROM DB
app.delete('/book/:id', (req, res) => {
    Book.findByIdAndRemove(req.params.id).then(() => {
        res.send('Book successfully deleted from DB...')
    }).catch(err => {
        if(err) {
            throw err;
        }
    })
})
//
//////=========================================================
// CONFIGURE SERVER
app.listen(PORT, () => {
    console.log(`Books service is now listening on port ${PORT}...`);
})