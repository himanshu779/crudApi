const { query } = require("express");
const User = require("../crudapi/model/user_model");


/*-----------------Create User-----------------*/
const addUser = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    console.log(user);
    res.status(201).json({ msg: "User Added Suceesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


/*-----------------Get User By Id-----------------*/
const getAllUser = async (req, res) => {
  try {
    //Pagination
    const page = parseInt(req.query.page) || 1;
    const totaluser = User.countDocuments();
    const limit = 3;
    const totalpage = Math.ceil(totaluser / limit);
    if (page > totalpage)
      return res.status(404).json({ msg: "page Not Found" });

    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


/*-----------------Get User By Id-----------------*/
const getUserById = async (req, res) => {
  try {
    const user = await User.findOne(req.query.userid);
    if (!user) {
      res.status(404).json({ msg: "User Not Found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


/*-----------------Update User-----------------*/
const updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.query.userid);
    if (!user) {
      res.status(404).json({ msg: "User Not Found" });
    }
    user = await User.findByIdAndUpdate(
      req.query.userid,
      { $set: req.body },
      { new: true }
    );
    user.save();
    res.status(202).json({ msg: "user Update succesfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


/*-----------------Delete User-----------------*/
const deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.query.userid);
    if (!user) return res.status(404).json({ msg: "User Not Found" });
    user = await User.findByIdAndDelete(user._id);
    res.status(200).json({ msg: "User Delete Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//
module.exports = {
  addUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
