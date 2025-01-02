const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

exports.createUser = async (req, res) => {
  try {
    const userId = uuidv4();
    const user = new User({ ...req.body, userId });
    await user.save();
    res.status(201).json({ message: "Info added successfully.", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding info.", error: error.message });
  }
};

exports.getInfo = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching data", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findOneAndDelete({ userId: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully.", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting user.", error: error.message });
  }
};
