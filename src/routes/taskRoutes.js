/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: taskRoutes.js
// Content: contains all task related endpoints
// using RESTful API
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');   // import express module
const controller = require('../controllers/taskController');   // import taskController.js that contains all task related controllers
const progressController = require('../controllers/progressController');   // import progressController.js that contains all task_progress related controllers

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();   // create a router object for task related endpoints


//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
// router.post('/', controller.createNewTask);   // use createNewTask controller for POST request to /tasks
router.get('/',  controller.readAllTasks);   // use readAllTasks controller for GET request to /tasks
router.get('/:task_id', progressController.getCountById, progressController.getDateById, controller.readTaskById);   // use readTaskById controller for GET request to /tasks/:task_id
// router.put('/:task_id', controller.updateTaskById);   // use updateTaskById controller for PUT request to /tasks/:task_id
// router.delete('/:task_id', controller.deleteTaskById);   // use deleteTaskById controller for DELETE request to /tasks/:task_id


//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;   // export router to be used in mainRoute.js as taskRoute