/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: progressRoutes.js
// Content: contains all progress related endpoints
// using RESTful API
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');   // import express module
const controller = require('../controllers/progressController');   // import progressController.js that contains all task_progress related controllers
const jwtMiddleware = require('../middlewares/jwtMiddleware');   // import jwtMiddleware.js to verify jwt token

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();   // create a router object for task_progress related endpoints


//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
router.post('/', jwtMiddleware.verifyToken, controller.searchForCreate, controller.createNewProgress);   // use searchForCreate and createNewProgress controllers for POST request to /task_progress
router.get('/:user_id', jwtMiddleware.verifyToken, controller.readProgressById);   // use readProgressById controller for GET request to /task_progress/:user_id
router.get('/:task_id', controller.getCountById);   // use getCountById controller for PUT request to /task_progress/:task_id
// router.delete('/:progress_id', controller.deleteProgressById);   // use deleteProgressById controller for DELETE request to /task_progress/:progress_id


//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;   // export router to be used in mainRoute.js as progressRoute