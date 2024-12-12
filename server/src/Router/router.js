const express = require("express");
const { 
  getUsers, 
  getUserByID, 
  deleteUserById, 
  processRegister, 
  activateUserAccount, 
  updateUserById 
} = require("../Controller/controller");
const { validateUserRegistration } = require("../validators/auth");
const runValidation = require("../validators");
const uploadUserImage = require("../middlewares/uploadFile");
const {isLoggedIn, isLoggedOut} = require('../middlewares/auth');

const userRouter = express.Router();



userRouter.get("/",isLoggedIn, getUsers);
userRouter.post(
  "/process-register",
  uploadUserImage.single("image"), 
  isLoggedOut,
  validateUserRegistration, 
  runValidation, 
  processRegister
);

userRouter.post("/activate",isLoggedOut, activateUserAccount);
userRouter.get("/:id", isLoggedIn, getUserByID);
userRouter.delete("/:id",isLoggedIn, deleteUserById);
userRouter.put('/:id',isLoggedIn, updateUserById);
userRouter.put('/:id', uploadUserImage.single('image'), isLoggedIn, updateUserById);




  module.exports = userRouter;