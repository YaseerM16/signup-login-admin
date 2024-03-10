const express = require("express");
const session = require("express-session");
const app = express();
const PORT = 3000;
const userRouter = require("./Routes/userRoute.js");
require("dotenv").config();
require("./config/dbConnect.js");

app.set("view engine", "ejs");

app.use(
  session({
    secret: "your-secret-key", // Change this to your own secret
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static("public"));
app.use(userRouter);

app.listen(PORT, () => console.log(`Port started at: ${PORT}`));
