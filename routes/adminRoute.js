const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/adminController.js");

adminRouter.get("/adminPage", adminController.getAdminPage);
adminRouter.post("/adminLog", adminController.adminLogSubmit);
adminRouter.get("/adminDashBoard", adminController.adminDashBoard);
adminRouter.post("/delete-user/:id", adminController.deleteUser);
adminRouter.post("/edit-user/:id", adminController.editUser);
adminRouter.post("/search-user", adminController.searchUser);
adminRouter.post("/add-user", adminController.addUser);
adminRouter.get("/addUserPage", adminController.addUserPage);
adminRouter.get("/adminLogout", adminController.adminLogout);

module.exports = adminRouter;
