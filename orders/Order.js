//////=========================================================
// LOAD MONGOOSE
const mongoose = require('mongoose');

// CREATE/DEFINE MODEL
mongoose.model('Order', {
    // ATTRIBUTES | customer 'id', book 'id', checkout date, return/due date
    CustomerID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    BookID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    checkoutDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    }
})