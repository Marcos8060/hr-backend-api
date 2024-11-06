const User = require("../models/authentication-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  RegisterValidation,
  LoginValidation,
} = require("../authentication-validation/index");
const Profile = require("../models/profile-model");

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
      role: user.role,
    },
    process.env.TOKEN_SECRET
  );

  res.header("auth-token", token).send(token);

};

const fetchAllUsers = async(req, res) => {
  try {
    const users = await User.findAll({
      include:[
        {
          model: Profile,
          as: "profile",
        }
      ]
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const updateRole = async (req, res) => {
  const { userId, role } = req.body;

  try {
    // Find the user by ID
    const user = await User.findByPk(userId);

    // If the user does not exist, return a 404 error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's role
    user.role = role;
    await user.save(); // Save the updated user

    return res.status(200).json({
      message: `Role updated to ${role} for user ${user.username}`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
  RegisterUser,
  LoginUser,
  updateRole,
  fetchAllUsers,
};
