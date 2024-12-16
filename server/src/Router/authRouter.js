const express = require("express");
const runValidation = require("../validators");
const { handleLogin } = require("../Controller/authController");
const { handleLogout } = require("../Controller/authController");
const { isLoggedOut, isLoggedIn } = require("../middlewares/auth");
const { validateUserLogin } = require("../validators/auth");


const authRouter = express.Router();


authRouter.post("/login",validateUserLogin, runValidation, isLoggedOut, handleLogin);
authRouter.post("/logout",isLoggedIn, handleLogout)

  module.exports = authRouter;