const mongoose = require('mongoose');
const url = process.env.MONGO_DB_URL;
// mongoose.connect('mongodb://127.0.0.1:27012/
mongoose.connect(url)
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log("Mongo db connection error :" +err));
