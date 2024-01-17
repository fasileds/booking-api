import express from "express";
import User from "../model/User.js";
import { logIn, register } from "../controllers/auth.js";
const router = express.Router();
//REGISTER
router.post("/register", register);
router.post("/login", logIn);
//LOGIN
//UPDATEUSER
//DELATEUSER
//GET USER

export default router;
