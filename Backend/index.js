const express = require('express');
require('dotenv').config();
require('./Modals/db'); // Ensure this connects to the database
const bodyparser = require('body-parser');
const cors = require('cors');
const Authrouter = require('./Routes/AuthRouter');

const app = express();
const PORT =  8080;

// Middleware
app.use(bodyparser.json());
app.use(cors());

// Routes
app.use('/hi', (req, res) => {
    res.send({ message: 'Welcome Azmat!' });
    console.log('Success from server');
});

app.use('/auth', Authrouter);

// Start server
app.listen(PORT, () => console.log('Server listening on port ' + PORT));
