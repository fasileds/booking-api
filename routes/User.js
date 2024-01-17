import express from "express";
import User from "../model/User.js";
import {
  delateuser,
  getuser,
  getusers,
  updateuser,
} from "../controllers/user.js";
import { verifay, verifayAdmin, verifayUser } from "../utils/verifay.js";
const router = express.Router();
// router.get("/chekeToken", verifay, (req, res, next) => {
//   res.send("hellow user you are log in");
// });
// router.get("/chekeAdmin/:id", verifayAdmin, (req, res, next) => {
//   res.send(
//     "hellow user you are authorized to send and recive because you are admin"
//   );
// });
//UPDATE
router.put("/:id", verifayUser, updateuser);
//DELETE
router.delete("/:id", verifayUser, delateuser);
//GET
router.get("/:id", verifayUser, getuser);
//GETALL
router.get("/", verifayAdmin, getusers);
export default router;
