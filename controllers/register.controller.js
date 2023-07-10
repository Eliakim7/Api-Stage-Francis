const User = require("../models/User");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    //get all data from body
    const { firstname, lastname, email, password } = req.body;

    //all the data should exists
    if (!(firstname && lastname && email && password)) {
      res.status(400).send("Tous les champs sont obligatoire");
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).send("Un utilisateur existe déjà avec cet email");
    }

    // encrypt the password
    const myEncPassword = await bcrypt.hash(password, 10);

    // save the user in DB
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: myEncPassword,
    });

    // generate a token for user and send it
    const token = jwt.sign({ id: user._id, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1800s",
    });
    user.token = token
    user.password = undefined

    res.status(200).json(user)

  } catch (error) {
    res.status(400).json(error);
  }
};

const getUsers = async (req, res) => {
  const users = await PostModel.find();
  res.status(200).json(users);
};

const setUser = async (req, res) => {
  const user = await PostModel.create({
    firstname: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  res.status(200).json(user);
};

const editUser = async (req, res) => {
  const user = await PostModel.findById(req.params.id);
  /* 
  if (!item){
    res.status(400).json({message: "Cet article n'existe pas"})
  } */

  const updateUsers = await PostModel.findByIdAndUpdate(user, req.body, {
    new: true,
  });
  res.status(200).json(updateUsers);
};

const deleteUser = async (req, res) => {
  await PostModel.deleteOne({ _id: req.params.id });

  /*  await item.deleteItems(); */
  res.status(201).json({ message: "Utilisateur supprimé : " + req.params.id });
};

module.exports = {
  register,
  getUsers,
  setUser,
  editUser,
  deleteUser,
};
