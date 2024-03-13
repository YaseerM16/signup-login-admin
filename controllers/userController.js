const bcrypt = require("bcrypt");
const {
  emailValidate,
  hashPassword,
  comparePassword,
} = require("../helperFunctions/helper");
const UserModel = require("../model/usersModel.js");

function loginPage(req, res) {
  if (req.session.isLogin) {
    res.render("userPages/homePage", { userDetails: req.session.userDetails });
  } else {
    res.render("userPages/loginPage", { notValid: req.session.notValid });
    req.session.notValid = false;
    req.session.save();
  }
}

function signUpPage(req, res) {
  if (req.session.isLogin) {
    res.render("userPages/homePage", { userDetails: req.session.userDetails });
  }
  res.render("userPages/signUpPage", {
    userExist: req.session.userExist,
  });

  req.session.userExist = false;
  req.session.save();
}

const signUpSubmit = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      req.session.userExist = true;
      res.redirect("/signUpPage");
    } else {
      const hashedPassword = await hashPassword(password);

      let addUser = await new UserModel({
        name,
        email,
        phone,
        password: hashedPassword,
      }).save();
      req.session.isLogin = true;
      req.session.userDetails = addUser;
      res.redirect("/");
    }
  } catch (err) {
    console.log(`Error in SignUp Registering : ${err}`);
  }
};

const loginSubmit = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "") {
      req.session.notValid = true;
      res.redirect("/");
    }
    if (password === "") {
      req.session.notValid = true;
      res.redirect("/");
    }

    const foundUser = await UserModel.findOne({ email });
    let passwordMatch;

    if (foundUser) {
      passwordMatch = await bcrypt.compare(password, foundUser.password);
    }
    console.log(passwordMatch);

    if (!foundUser || !passwordMatch) {
      req.session.notValid = true;
      res.redirect("/");
    } else {
      // res.send("HI THIS IS THE LOGINE");
      req.session.isLogin = true;
      req.session.userDetails = foundUser;
      res.redirect("/");
    }
  } catch (err) {
    console.log("Error in LogIn" + err);
  }
};

const logOut = (req, res) => {
  req.session.isLogin = false;
  res.redirect("/");
};

module.exports = {
  loginPage,
  signUpPage,
  signUpSubmit,
  loginSubmit,
  logOut,
};
