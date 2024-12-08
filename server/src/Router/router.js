const express = require("express");
const { getUsers, getUserByID, deleteUserById, processRegister } = require("../Controller/controller");

const userRouter = express.Router();



userRouter.get("/", getUsers);
userRouter.post("/process-register", processRegister);
userRouter.get("/:id", getUserByID);
userRouter.delete("/:id", deleteUserById);




  module.exports = userRouter;