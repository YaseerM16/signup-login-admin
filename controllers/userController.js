const { emailValidate, hashPassword } = require("../helperFunctions/helper");
const UserModel = require("../model/usersModel");

function initialPage(req, res) {
  res.render("loginSignup", {
    inputErr: req.session.inputErr,
    errMsg: req.session.errorMessage,
    userExist: req.session.userExist,
    notValid: req.session.notValid,
  });

  req.session.notValid = false;
  req.session.userExist = false;
  req.session.inputErr = false;
  req.session.save();
}

const signUpSubmit = async (req, res) => {
  const { name, email, phone, password } = req.body;

  // validating
  const errMsg = {};

  req.session.inputErr = false;

  if (name === "" || !/^[A-Za-z]+$/.test(name)) {
    errMsg["name"] = "Name is not valid";
    req.session.inputErr = true;
  }

  if (!emailValidate(email)) {
    errMsg["email"] = "Email is Not Valid";
    req.session.inputErr = true;
  }

  if (phone.length < 10 || phone.length > 10) {
    errMsg["phone"] = "Phone Number is not Valid";
    req.session.inputErr = true;
  }

  if (password.length < 6) {
    errMsg["password"] = "Password should be Grater than 6 Characters";
    req.session.inputErr = true;
  }

  const existingUser = await UserModel.findOne({ email });

  if (req.session.inputErr) {
    req.session.errorMessage = errMsg;
    res.redirect("/");
  } else if (existingUser) {
    req.session.userExist = true;
    res.redirect("/");
  } else {
    const hashedPassword = await hashPassword(password);

    let addUser = await new UserModel({}).save();
  }
};

module.exports = {
  initialPage,
};
