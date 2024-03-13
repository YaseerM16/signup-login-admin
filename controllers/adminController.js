const {
  emailValidate,
  hashPassword,
  comparePassword,
} = require("../helperFunctions/helper");
const userCollection = require("../model/usersModel");

const getAdminPage = async (req, res) => {
  if (req.session.logged) {
    res.redirect("/adminDashBoard");
  } else {
    res.render("adminPages/adminPage", { notValid: req.session.notValid });
    req.session.notValid = false;
    req.session.save();
  }
};

const adminLogSubmit = (req, res) => {
  try {
    const credentials = {
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    };

    if (
      credentials.email == req.body.email &&
      req.body.password == credentials.password
    ) {
      req.session.logged = true;
      res.redirect("/adminPage");
    } else {
      req.session.invalid = true;
      res.redirect("/adminPage");
    }
  } catch (err) {
    console.log("Error Occur in Admin Log In" + err);
  }
};

const adminDashBoard = async (req, res) => {
  if (req.session.logged) {
    const usersData = await userCollection.find();
    res.render("adminPages/adminHome", { users: usersData });
  } else {
    res.redirect("/adminLog");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userCollection.findByIdAndDelete(id);

    res.redirect("/adminDashBoard");
  } catch (error) {
    console.log("error in deleting data", error);
  }
};
const editUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const { id } = req.params;

    const user = await userCollection.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          email,
          phone,
        },
      }
    );

    res.redirect("/adminDashBoard");
  } catch (error) {
    console.log(error);
  }
};

const addUserPage = async (req, res) => {
  if (req.session.logged) {
    try {
      res.render("adminPages/createUser", {
        inputErr: req.session.inputErr,
        errMsg: req.session.errorMessage,
        userExist: req.session.userExist,
      });
      req.session.userExist = false;
      req.session.inputErr = false;
      req.session.save();
    } catch (error) {
      console.log("error in getting add user page ", error);
    }
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const errMsg = {};
    req.session.inputErr = false;
    if (name === "" || !/^[A-Za-z]+$/.test(name)) {
      errMsg["name"] = "Name is not valid";
      req.session.inputErr = true;
    }
    if (!emailValidate(email)) {
      errMsg["email"] = "Email is not valid";
      req.session.inputErr = true;
    }

    if (phone.length < 10 || phone.length > 10) {
      errMsg["phone"] = "Number is not valid";
      req.session.inputErr = true;
    }
    if (password.length < 6) {
      errMsg["password"] = "Password should be grater than 6 character";
      req.session.inputErr = true;
    }

    const existingUser = await userCollection.findOne({ email });

    if (req.session.inputErr) {
      req.session.errorMessage = errMsg;
      res.redirect("/addUserPage");
    } else if (existingUser) {
      req.session.userExist = true;
      res.redirect("/addUserPage");
    } else {
      const hashedPassword = await hashPassword(password);

      let addUser = await new userCollection({
        name,
        email,
        phone,
        password: hashedPassword,
      }).save();
      res.redirect("/adminDashBoard");
    }
  } catch (error) {
    console.log("error in adding user", error);
  }
};

const searchUser = async (req, res) => {
  try {
    const { search } = req.body;

    const users = await userCollection.find({
      name: { $regex: search, $options: "i" },
    });
    res.render("adminPages/adminHome", { users });
  } catch (error) {
    console.log("error in searching ", error);
  }
};

const adminLogout = (req, res) => {
  req.session.logged = false;
  res.redirect("/adminPage");
};

module.exports = {
  getAdminPage,
  adminLogSubmit,
  deleteUser,
  adminDashBoard,
  deleteUser,
  editUser,
  searchUser,
  addUser,
  addUserPage,
  adminLogout,
};
