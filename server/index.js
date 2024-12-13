const express = require('express');
const { mongoConnect } = require('./controllers/controllers.js');
const router = require('./routes/serverRoutes.js')
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors());


const PORT = 3000;

app.use("/api",router);
app.listen(PORT || 3000,async() => {
    mongoConnect();

    console.log(`Server is running on http://localhost:${PORT}`);
})