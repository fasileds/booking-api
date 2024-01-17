import Hotel from "../model/Hotel.js";
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedhotel = await newHotel.save();
    res.status(200).json(savedhotel);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updatedhotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedhotel);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const delateHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("delated susccesfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,

      chepestPrice: { $gt: min || 1, $lt: max || 999 },
    });
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const countbycity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const countbytype = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "appartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const vilaCount = await Hotel.countDocuments({ type: "vila" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "appartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "vila", count: vilaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (error) {
    res.status(500).json(error);
  }
};
