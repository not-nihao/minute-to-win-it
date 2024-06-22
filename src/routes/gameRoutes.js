/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA1
// Filename: gameRoute.js
// Content: contains all game related endpoints
// using RESTful API
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');
const controller = require('../controllers/gameController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();   // create a router object for game related endpoints

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
// router.get('/', controller.readAllGames);   // use readAllGames controller for GET request to /games
router.post('/:user_id', jwtMiddleware.verifyToken, controller.createNewGame);   // use createNewGame controller for POST request to /games/:user_id
router.get('/:game_id', controller.readGameById);   // use readGameById controller for GET request to /games/:game_id
router.put('/points/:game_id', controller.updatePoints);   // use updateGameById controller for PUT request to /games/:game_id
router.put('/hero/:game_id', controller.switchHero);   // use updateGameById controller for PUT request to /games/:game_id
router.delete('/:game_id', controller.deleteGameById);   // use deleteGameById controller for DELETE request to /games/:game_id

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;   // export router to be used in mainRoute.js as gameRoute
