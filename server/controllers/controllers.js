const mongoose = require('mongoose');
const userModel = require('../models/userModel');

const mongoConnect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/users');
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};


const addUser = (req,res) => {
    try{
        const newUser = new userModel({
            username: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        newUser.save();
        console.log('User added successfully');
        res.status(200).send({message: 'User added successfully'});
    }catch(err){
        console.log('User added failed');
    }
}

const verifyUser = async() => {
    try {
        
    }catch(err){

    }
}
module.exports = {addUser,mongoConnect};
