const express = require("express");
const {addUser,getAllUser,getUserById, updateUser, deleteUser} = require("../controllers/user_controller");
const userRouter = express.Router();


// users
userRouter.get("/",getAllUser);
userRouter.get("/userid",getUserById);
userRouter.post("/",addUser);
userRouter.patch("/",updateUser);
userRouter.delete("/",deleteUser);


module.exports = userRouter;