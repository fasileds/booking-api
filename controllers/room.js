import Room from "../model/Room.js";
import Hotel from "../model/Hotel.js";

export const createtroom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      res.status(500).json(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateroom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    const updatedroom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedroom);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const delateroom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      res.status(500).json(error);
    }

    res.status(200).json("delated succesfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getroom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getrooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json(error);
  }
};
