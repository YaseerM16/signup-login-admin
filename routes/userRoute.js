const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController.js");

userRouter.get("/", userController.loginPage);
userRouter.get("/signUpPage", userController.signUpPage);
userRouter.post("/signUpSubmit", userController.signUpSubmit);
userRouter.post("/loginSubmit", userController.loginSubmit);
userRouter.post("/logout", userController.logOut);

module.exports = userRouter;
