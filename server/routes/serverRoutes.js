const express = require('express');
const {addUser,createBooking} = require('../controllers/controllers')
const router = express.Router()

router.post('/signup',addUser);


router.post('/rest',createBooking);


router.get('/health',(req,res)=>{
    res.status(200).json({message:"health route is available"});
})


module.exports = router;