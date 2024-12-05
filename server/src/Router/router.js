const express = require("express");
const { getUsers, getUserByID, deleteUserById } = require("../Controller/controller");

const userRouter = express.Router();



userRouter.get("/", getUsers);
userRouter.get("/:id", getUserByID);
userRouter.delete("/:id", deleteUserById);




  module.exports = userRouter;