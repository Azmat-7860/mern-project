const express = require("express");
require("dotenv").config();
require("./Modals/db");
const bodyparser = require("body-parser");
const cors = require("cors");
const Authrouter = require("./Routes/AuthRouter");
const app = express();
const PORT = 8080;

// Bodyparser middleware to parse JSON request bodies
app.use(bodyparser.json());
app.use(cors());

app.use("/hi", (req, res) => {
  res.send({ message: "Welcome Azmat!" });
  console.log("Success from server");
});

// User routes
app.use("/auth", Authrouter);

app.listen(PORT, () => console.log("listening on port " + PORT));
