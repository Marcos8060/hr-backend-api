const User = require("../models/authentication-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  RegisterValidation,
  LoginValidation,
} = require("../authentication-validation/index");

const RegisterUser = async (req, res) => {
  // Validate data before processing
  const { error } = RegisterValidation(req.body);
  // If validation fails, return an error response
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  //   check if email already registered
  const emailExists = await User.findOne({ where: { email: req.body.email } });
  if (emailExists) {
    return res.status(400).json({ message: "Email already registered" });
  }

  //   Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const LoginUser = async (req, res) => {
  const { error } = LoginValidation(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  //   validate email
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return res.status(404).json({ message: "Email not found" });
  }

  // validate password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }

  //   create and assign a token to the user
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.TOKEN_SECRET
  );

  res.header("auth-token", token).send(token);

};

module.exports = {
  RegisterUser,
  LoginUser
};
