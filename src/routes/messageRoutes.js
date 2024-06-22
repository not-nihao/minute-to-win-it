/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: messageRoutes.js
// Content: contains all message related endpoints
// using RESTful API
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');   // import express module
const controller = require('../controllers/messageController');   // import messageController.js that contains all message related controllers
const jwtMiddleware = require('../middlewares/jwtMiddleware');   // import jwtMiddleware.js to verify jwt token
//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();   // create a router object for message related endpoints

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
router.get('/', controller.readAllMessage);
router.post('/', jwtMiddleware.verifyToken, controller.createMessage);
// router.get('/:id', controller.readMessageById);
// router.put('/:id', controller.updateMessageById);
router.delete('/:id', controller.deleteMessageById);

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;   // export router to be used in mainRoute.js as messageRoute