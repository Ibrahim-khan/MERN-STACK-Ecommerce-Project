const express = require("express");
const runValidation = require("../validators");
const { handleLogin } = require("../Controller/authController");
const { handleLogout } = require("../Controller/authController");
const { isLoggedOut, isLoggedIn } = require("../middlewares/auth");


const authRouter = express.Router();


authRouter.post("/login",isLoggedOut, handleLogin);
authRouter.post("/logout",isLoggedIn, handleLogout)

  module.exports = authRouter;