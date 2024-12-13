const mongoose = require('mongoose');

// Create a new connection to a different MongoDB database
const newDbConnection = mongoose.createConnection('mongodb://localhost:27017/otherDatabase');

// Define the schema for the table booking
const bookingSchema = new mongoose.Schema({
    people: {
        type: Number,
        required: true,
        min: 1,
        max: 12,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/, // Ensures time is in valid HH:mm format
    },
    table_type: {
        type: String,
        required: true,
        enum: ['VIP', 'Classic', 'Normal'], // Limited to these table types
    },
    booking_category: {
        type: String,
        required: true,
        enum: ['Birthday', 'Anniversary', 'Meetup', 'Fun', 'Other'], // Limited to these categories
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically sets the current date and time when booking is made
    }
});

const Booking = newDbConnection.model('Booking', bookingSchema);

module.exports = Booking;
