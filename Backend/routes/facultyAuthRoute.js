const express = require("express");
const facultyAuthRouter = express.Router();
const facultyAuth = require("../controllers/facultyAuth");

facultyAuthRouter.post("/login", facultyAuth.postLogin);
facultyAuthRouter.post("/logout", facultyAuth.postLogout);

module.exports = facultyAuthRouter;
