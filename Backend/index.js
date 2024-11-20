const express = require("express");
require("dotenv").config();
require("./Modals/db");
const bodyparser = require("body-parser");
const cors = require("cors");
const Authrouter = require("./Routes/AuthRouter");
const app = express();
const PORT = 8080;

// Middleware to set custom CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Bodyparser middleware to parse JSON request bodies
app.use(bodyparser.json());

// CORS middleware to allow all origins
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  })
);

// Test route
app.use("/hi", (req, res) => {
  res.send({ message: "Welcome Azmat!" });
  console.log("Success from server");
});

// User routes
app.use("/auth", Authrouter);

// Start server
app.listen(PORT, () => console.log("listening on port " + PORT));
