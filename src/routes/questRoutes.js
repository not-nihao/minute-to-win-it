/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: questRoute.js
// Content: contains all quest related endpoints
// using RESTful API
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');
const controller = require('../controllers/questController');

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
// router.get('/', controller.readAllQuests);   // use readAllQuests controller for GET request to /quests
// router.post('/', controller.createNewQuest);   // use createNewQuest controller for POST request to /quests
// router.get('/filter/trait/:trait', controller.readQuestByTrait);   // use readQuestByTrait controller for GET request to /quests/filter/trait/:trait
// router.get('/filter/difficulty/:difficulty', controller.readQuestByDifficulty);   // use readQuestByDifficulty controller for GET request to /quests/filter/difficulty/:difficulty
// router.get('/filter/incomplete', controller.readIncompleteQuests);   // use readIncompleteQuests controller for GET request to /quests/incomplete
// router.get('/filter/completed', controller.readCompletedQuests);   // use readCompletedQuests controller for GET request to /quests/completed
// router.get('/rank', controller.rankQuests);   // use rankQuests controller for GET request to /quests/rank
// router.get('/:quest_id', controller.checkForComplete, controller.completeQuest);   // use checkForComplete and completeQuest controllers for GET request to /quests/:quest_id
// router.put('/:quest_id', controller.updateQuestById);   // use updateQuestById controller for PUT request to /quests/:quest_id
// router.delete('/:quest_id', controller.deleteQuestById);   // use deleteQuestById controller for DELETE request to /quests/:quest_id

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;   // export router to be used in mainRoute.js as questRoute