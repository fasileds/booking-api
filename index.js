import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userrouter from "./routes/User.js";
import authRouter from "./routes/auth.js";
import hotelRouter from "./routes/hotel.js";
import roomRouter from "./routes/hotelRoom.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = express();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("the databes is connected sucessfully");
  } catch (error) {
    console.log(error);
  }
};
app.use(cors());
app.use(express.json());

app.use(cookieParser());
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something want wrong";
  return res.status(errorStatus).json(errorMessage);
});
app.use("/api/user", userrouter);
app.use("/api/auth", authRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/room", roomRouter);
app.listen(3001, () => {
  connect();
  console.log("the app is runing in port 3001");
});
