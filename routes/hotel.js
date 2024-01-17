import express from "express";
import Hotel from "../model/Hotel.js";
import {
  countbycity,
  countbytype,
  createHotel,
  delateHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
import { verifayAdmin } from "../utils/verifay.js";
const router = express.Router();
//CREATE
router.post("/", verifayAdmin, createHotel);
//UPDATE
router.put("/:id", verifayAdmin, updateHotel);
//DELETE
router.delete("/:id", verifayAdmin, delateHotel);
//GET
router.get("/find/:id", getHotel);
//GETALL
router.get("/", getHotels);
router.get("/countbycity", countbycity);
router.get("/countbytype", countbytype);
export default router;
