/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: userRoutes.js
// Content: contains all user related endpoints
// using RESTful API
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');   // import express module
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");
const controller = require('../controllers/userController');   // import userController.js that contains all user related controllers

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();   // create a router object for user related endpoints


//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
router.get('/', controller.readAllUsers);   // use readAllUsers controller for GET request to /users
router.get('/:user_id', jwtMiddleware.verifyToken, controller.readUserById);   // use readUserById controller for GET request to /users/:user_id
router.put('/username/:user_id',jwtMiddleware.verifyToken, controller.searchForUpdateUsername, controller.updateUsernameById);   // use searchForUpdate and updateUserById controllers for PUT request to /users/username/:user_id
router.put('/email/:user_id', jwtMiddleware.verifyToken, controller.searchForUpdateEmail, controller.updateEmailById);   // use searchForUpdate and updateUserById controllers for PUT request to /users/email/:user_id
router.put('/password/:user_id', controller.readUserPassword, bcryptMiddleware.comparePassword, bcryptMiddleware.hashPasswordForUpdate, controller.updatePasswordById, jwtMiddleware.generateToken, jwtMiddleware.sendToken);   // use searchForUpdate and updateUserById controllers for PUT request to /users/password/:user_id
router.delete('/:user_id', jwtMiddleware.verifyToken, controller.readUserPassword, bcryptMiddleware.comparePassword, controller.deleteUserById);   // use deleteUserById controller for DELETE request to /users/:user_id


//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;   // export router to be used in mainRoute.js as userRoute