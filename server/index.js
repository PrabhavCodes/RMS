const express = require('express');
const { mongoConnect } = require('./controllers/controllers');

const app = express();

app.use(express.json());


const PORT = 3000;
app.listen(PORT || 5000,async() => {
    mongoConnect();

    console.log('Connected to MongoDB successfully');
    console.log(`Server is running on http://localhost:${PORT}`);
})