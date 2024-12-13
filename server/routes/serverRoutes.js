const express = require('express');
const {addUser,createBooking,deleteBooking} = require('../controllers/controllers')
const router = express.Router()

router.post('/signup',addUser);


router.post('/rest',createBooking);

router.delete('/rest/:id', deleteBooking);

router.get('/health',(req,res)=>{
    res.status(200).json({message:"health route is available"});
})


module.exports = router;