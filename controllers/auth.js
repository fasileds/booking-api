import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "json-web-token";
import jsonwebtoken from "jsonwebtoken";

//REGISTER
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      userName: req.body.username,
      emaile: req.body.emaile,
      password: hash,
    });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};
//LOGIN
export const logIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.username });
    if (!user) return res.status(500).json("the user not founde");
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    ); // true
    if (!isPasswordCorrect)
      return res.status(500).json("the password is not corresct");
    const token = jsonwebtoken.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.Jwt
    );
    const { password, isAdmin, ...other } = user._doc;
    res
      .cookie("accsess_token", token, {
        httpOnly: true,
      })
      .status(201)
      .json({ other });
  } catch (error) {
    console.log(error);
  }
};
//UPDATE USER
//DELATE USER
//GET USER
//GET ALL USER
