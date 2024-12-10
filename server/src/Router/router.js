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

const userRouter = express.Router();



userRouter.get("/", getUsers);
userRouter.post(
  "/process-register",
  uploadUserImage.single("image"), 
  validateUserRegistration, 
  runValidation, 
  processRegister
);

userRouter.post("/activate", activateUserAccount);
userRouter.get("/:id", getUserByID);
userRouter.delete("/:id", deleteUserById);
userRouter.put('/:id', updateUserById);
userRouter.put('/:id', uploadUserImage.single('image'), updateUserById);




  module.exports = userRouter;