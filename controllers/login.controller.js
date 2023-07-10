const User = require("../models/User");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")

const login = async (req, res) => {
  try {
    //get all data from frontend
    const {email, password} = req.body

    //validation
    if(!(email && password)){
      res.status(400).send('les données sont incorrects')
    }

    //find user in db
    const user = await User.findOne({email})

    // assignement - if User is not there then what ?

    //match the password
   if (user && ( await bcrypt.compare(password, user.password))){
      const token = jwt.sign(
        { id: user._id}, 
        process.env.REFRESH_TOKEN_SECRET, 
        {
          expiresIn: "1800s",
        }
      );
      user.token = token
      user.password = undefined

      //cookie section
      const options = {
        expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true
      };
      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user
      })

   }
   
    //send a token
    

  } catch (error) {
    console.log(error);
  }
};

module.exports = login
  