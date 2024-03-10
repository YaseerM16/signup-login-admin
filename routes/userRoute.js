const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController.js");

userRouter.get("/", userController.initialPage);
userRouter.post("/signUpSubmit");

module.exports = userRouter;
