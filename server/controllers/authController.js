const bcrypt = require("bcryptjs"); // for hasing the passwords
const jwt = require("jsonwebtoken"); // for returning token to the user on successful authentication
const User = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating up the new account
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    // saving the user to the database
    await newUser.save();

    return res.status(201).json({
      message: `User registered with username ${username}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed. Please try again.",
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    // if no user is found
    if (!user) {
      return res.status(404).json({
        message: `User with username ${username} not found`,
      });
    }

    // if the user is matched [matching the passwords]
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials. Please try again later.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // token expires in 1 hour
      }
    );

    res.status(200).json({
      message: "Authentication successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Authentication failed. Please check your username and password.",
    });
  }
};

module.exports = {
  register,
  login,
};
