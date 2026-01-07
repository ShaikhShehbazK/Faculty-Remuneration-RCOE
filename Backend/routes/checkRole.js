const express = require("express");
const checkRoleRoute = express.Router();
const checkRoleController = require("../controllers/checkRoleController");
const { jwtAuthMiddleware } = require("../jwt");

checkRoleRoute.get("/role", jwtAuthMiddleware, checkRoleController.getRole);

module.exports = checkRoleRoute;
