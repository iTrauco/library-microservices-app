//////=========================================================
// LOAD MONGOOSE |
const mongoose = require('mongoose');

mongoose.model('Book', {
    // ATTRIBUTES | title, author, number of pages, and publisher
    title: {
        type: String, 
        required: true
    },
    author: {
        type: String, 
        require: true
    },
    numOfPages: {
        type: Number, 
        require: false
    },
    publisher: {
        type: String, 
        require: true
    }
});
