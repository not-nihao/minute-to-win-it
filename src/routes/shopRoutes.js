/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: shopRoutes.js
// Content: contains all user related endpoints
// using RESTful API
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');   // import express module
const controller = require('../controllers/shopController');   // import shopController.js that contains all shop related controllers

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();   // create a router object for user related endpoints


//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
// router.get('/', controller.readAllItems);   // use readAllItems controller for GET request to /shop
// router.post('/', controller.createNewItem);   // use createNewItem controller for POST request to /shop
// router.put('/buy/:item_id', controller.checkForBuy, controller.buyItem);   // use buyItem controller for GET request to /shop/buy/:item_id
// router.put('/:item_id', controller.updateItemById);   // use updateItemById controller for PUT request to /shop/:item_id
// router.delete('/:item_id', controller.deleteItemById);   // use deleteItemById controller for DELETE request to /shop/:item_id

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;   // export router to be used in mainRoute.js as shopRoute