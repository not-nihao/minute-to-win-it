/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: logRoutes.js
// Content: contains all log related endpoints
// using RESTful API
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');   // import express module
const controller = require('../controllers/logController');   // import logController.js that contains all log related controllers

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();   // create a router object for log related endpoints

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
router.get('/leaderboard', controller.readLeaderboard);   // use readLeaderboard controller for GET request to /logs/leaderboard
// router.get('/games', controller.readGameLogs);   // use readGameLogs controller for GET request to /logs/games
// router.get('/quests', controller.readQuestLogs);   // use readQuestLogs controller for GET request to /logs/quests
// router.post('/games', controller.createGameLog);   // use createGameLog controllers for POST request to /logs/games
// router.post('/quests', controller.createQuestLog);   // use createQuestLog controllers for POST request to /logs/quests
// router.get('/games/:glog_id', controller.readGameLogById);   // use readGameLogById controller for GET request to /logs/games/:glog_id
// router.get('/quests/:qlog_id', controller.readQuestLogById);   // use readQuestLogById controller for GET request to /logs/quests/:qlog_id
// router.put('/games/:glog_id', controller.updateGameLogById);   // use updateGameLogById controller for PUT request to /logs/games/:glog_id
// router.put('/quests/:qlog_id', controller.updateQuestLogById);   // use updateQuestLogById controller for PUT request to /logs/quests/:qlog_id
// router.delete('/games/:glog_id', controller.deleteGameLogById);   // use deleteGameLogById controller for DELETE request to /logs/games/:glog_id
// router.delete('/quests/:qlog_id', controller.deleteQuestLogById);   // use deleteQuestLogById controller for DELETE request to /logs/quests/:qlog_id


//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;   // export router to be used in mainRoute.js as logRoute