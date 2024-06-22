/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: mainRoutes.js
// Content: contains routes to all sub-routes
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require("express");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");
const userController = require("../controllers/userController");
const userRoute = require("./userRoutes");
const taskRoute = require("./taskRoutes");
const progressRoute = require("./progressRoutes");
const messageRoute = require("./messageRoutes");
const gameRoute = require("./gameRoutes")
const heroRoute = require("./heroRoutes");
const inventoryRoute = require("./inventoryRoutes");
const logRoute = require("./logRoutes");
const shopRoute = require("./shopRoutes");
const questRoute = require("./questRoutes");

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.use("/users", userRoute);
router.use("/tasks", taskRoute);
router.use("/task_progress", progressRoute);
router.use("/messages", messageRoute);
router.use("/games", gameRoute);
// router.use("/heroes", heroRoute);
// router.use("/inventory", inventoryRoute);
router.use("/logs", logRoute);
// router.use("/shop", shopRoute);
// router.use("/quests", questRoute);

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;