import express from "express";
import Room from "../model/Room.js";
import {
  createtroom,
  delateroom,
  getroom,
  getrooms,
  updateroom,
} from "../controllers/room.js";
import { verifayAdmin } from "../utils/verifay.js";
const router = express.Router();
//CREATE
router.post("/:hotelId", verifayAdmin, createtroom);
//UPDATE
router.put("/:id", verifayAdmin, updateroom);
//DELETE
router.delete("/:id/:hotelid", verifayAdmin, delateroom);
//GET
router.get("/:id", getroom);
//GETALL
router.get("/", getrooms);
export default router;
