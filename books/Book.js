//////=========================================================
// LOAD MONGOOSE |
const mongoose = require('mongoose');

mongoose.model('Book', {
    // ATTRIBUTES
    title: {
        type: String, 
        required: true
    },
    author: {
        typ: String, 
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
