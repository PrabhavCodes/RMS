const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const Booking = require('../models/bookingModel')

const mongoConnect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/users',);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); 
  }
};

const addUser = async (req, res) => {
  console.log(req.body); 

  try {
    const newUser = new userModel({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    await newUser.save(y);
    console.log('User added successfully');
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error('Error adding user:', err);  // Log full error
    res.status(500).json({ message: 'Error adding user', error: err.message });
  }
};


const createBooking = async (req, res) => {
  try {
      const { people, date, time, table_type, booking_category } = req.body;

      const newBooking = new Booking({
          people,
          date,
          time,
          table_type,
          booking_category,
      });

      await newBooking.save();
      res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating booking' });
  }
};

module.exports = { addUser, mongoConnect,createBooking };
