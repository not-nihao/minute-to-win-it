/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: inventoryRoute.js
// Content: contains all inventory related endpoints
// using RESTful API
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');
const controller = require('../controllers/inventoryController');

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();   // create a router object for inventory related endpoints

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
// router.get('/', controller.readAllItems);   // use readAllItems controller for GET request to /inventory
// router.post('/', controller.createNewItem);   // use createNewHero controller for POST request to /inventory
// router.get('/:inventory_id', controller.readItemById);   // use readItemById controller for GET request to /inventory/:inventory_id
// router.get('/use/:inventory_id', controller.checkForUse, controller.useItem);   // use checkForUse and useItem controllers for GET request to /inventory/use/:inventory_id
// router.put('/:item_id', controller.updateItemById);   // use updateItemById controller for PUT request to /inventory/:inventory_id
// router.delete('/:item_id', controller.deleteItemById);   // use deleteItemById controller for DELETE request to /inventory/:inventory_id

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;   // export router to be used in mainRoute.js as inventoryRoute