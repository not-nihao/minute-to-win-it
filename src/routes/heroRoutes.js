/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: heroRoute.js
// Content: contains all hero related endpoints
// using RESTful API
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');
const controller = require('../controllers/heroController');

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();   // create a router object for hero related endpoints

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
// router.get('/', controller.readAllHeroes);   // use readAllHeroes controller for GET request to /heroes
// router.post('/', controller.searchForCreate, controller.createNewHero);   // use createNewHero controller for POST request to /heroes
// router.get('/:hero_id', controller.readHeroById);   // use readHeroById controller for GET request to /heroes/:hero_id
// router.put('/:hero_id', controller.updateHeroById);   // use updateHeroById controller for PUT request to /heroes/:hero_id
// router.delete('/:hero_id', controller.deleteHeroById);   // use deleteHeroById controller for DELETE request to /heroes/:hero_id

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;   // export router to be used in mainRoute.js as heroRoute