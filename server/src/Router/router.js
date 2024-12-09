const express = require("express");
const { getUsers, getUserByID, deleteUserById, processRegister, activateUserAccount } = require("../Controller/controller");

const userRouter = express.Router();



userRouter.get("/", getUsers);
userRouter.post("/process-register", processRegister);
userRouter.post("/verify", activateUserAccount);
userRouter.get("/:id", getUserByID);
userRouter.delete("/:id", deleteUserById);




  module.exports = userRouter;