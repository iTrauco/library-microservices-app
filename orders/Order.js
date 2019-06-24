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
    CheckoutDate: {
        type: Date,
        required: true
    },
    ReturnDate: {
        type: Date,
        required: true
    }
})