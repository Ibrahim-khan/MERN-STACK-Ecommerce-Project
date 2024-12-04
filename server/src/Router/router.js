const express = require("express");
const { getUsers, getUser } = require("../Controller/controller");

const userRouter = express.Router();


userRouter.get("/:id", getUser);
userRouter.get("/", getUsers);




  module.exports = userRouter;