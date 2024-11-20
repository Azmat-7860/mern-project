const User = require("../Modals/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    console.log("form auth controller");

    const { username, email, password } = req.body;

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }

    const newUser = new User({ username, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", success: true });
      
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const erroeMessage = "User not found";

    if (!user) {
      return res.status(404).json({ message: erroeMessage, success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid Password", success: false });
    }

    const jwtToken = await jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );
    res
      .status(200)
      .json({
        message: "Logged in successfully",
        success: true,
        jwtToken: jwtToken,
        email,
        name: user.username,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
module.exports = {
  signup,
  login,
};
