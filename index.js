const express = require("express");
const app = express();
const session = require("express-session");
const morgan = require("morgan");
const nocache = require("nocache");
const PORT = 3000;
const userRouter = require("./Routes/userRoute.js");
const adminRoute = require("./routes/adminRoute.js");

require("dotenv").config();
require("./config/dbConnect.js");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(nocache());
app.use(
  session({
    secret: "your-secret-key", // Change this to your own secret
    resave: false,
    saveUninitialized: true,
  })
);
app.use(adminRoute);
app.use(userRouter);

app.listen(PORT, () => console.log(`Port started at: ${PORT}`));
