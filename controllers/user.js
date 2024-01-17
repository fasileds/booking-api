import User from "../model/User.js";
export const updateuser = async (req, res, next) => {
  try {
    const updateduser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateduser);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const delateuser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("delated susccesfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getuser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getusers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
