/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: questController.js
// Content: contains controllers that are part of the
// MVC for quest related endpoints
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////

const model = require("../models/questModel.js");   // import sql queries for quests

//////////////////////////////////////////////////////
// CONTROLLER FOR COMPLETING QUESTS
//////////////////////////////////////////////////////
//handle error & response in check function used in completeQuest
module.exports.checkForComplete = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error search in db:", error);
            res.status(500).json(error);
        }
        // if quest_id does not exist return 409 with error invalid
        else if (results[0].length == 0) {   // results[0] array will not be empty if quest_id exists in database
            res.status(404).json({
                Error: "Invalid quest_id"
            });
        }
        // if quest is already completed return 409 with error already completed
        else if (results[0].completed == 1) {  // results[0] is completed value (1 if quest is completed, 0 if quest is not completed)
            res.status(409).json({
                Error: "Quest already completed"
            });
        }
        else {
            next();  // if quest_id exists and quest is not completed, proceed to completeQuest after wait_time is over
        }

    }
    const data = {
        quest_id: req.params.quest_id
    }

    model.checkCompleted(data, callback);   // call the checkForComplete function in questModel
}


//handle error & response in completeQuest
module.exports.completeQuest = (req, res, next) => {

    const callback = (error, results, fields) => {
        if (error) {
            // if any unexpected error occurs return 500 with error
            console.error("Error in completeQuest:", error);
            res.status(500).json(error);
        }
        else {
            const base = results[0][0].wait_time;
            const bonus_exp = results[1][0].experience;
            const bonus_class = results[1][0].class;
            const trait = results[0][0].trait;
            var wait_time = base - (base/100)*(bonus_exp*10)
            if (trait == bonus_class) {
               wait_time = (wait_time/100)*90;
            }
            setTimeout(() => {res.status(200).json(results[4][0]); console.log('task completed')}, wait_time*1000) // return the row with the given quest_id after wait_time is over
        }
    }
    const data = {
        quest_id: req.params.quest_id
    }

    model.completeQuest(data, callback);   // call the completeQuest function in questModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR CREATE
//////////////////////////////////////////////////////
//handle error & response in createNewQuest
module.exports.createNewQuest = (req, res, next) => {
    // if req body does not have title or trait or difficulty or points or wait_time or completed return 400 with error undefined
    if (!(req.body.title && req.body.trait && req.body.difficulty && req.body.points && req.body.wait_time)) {
        res.status(400).json({
            Error: "title or trait or difficulty or points or wait_time undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error createNewQuest:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results[1][0]);   // return 201 with the newly created quest ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        title: req.body.title,
        trait: req.body.trait,
        difficulty: req.body.difficulty,
        points: req.body.points,
        wait_time: req.body.wait_time
    }

    model.insertSingle(data, callback);   // call the insert function in questModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR READ
//////////////////////////////////////////////////////
//handle error & response in readAllQuests
module.exports.readAllQuests = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error readAllQuests:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);   // return 200 with all quests
    }
    model.selectAll(callback);   // call the selectAll function in questModel
}


//handle error & response in readIncompleteQuests
module.exports.readIncompleteQuests = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error readIncompleteQuests:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);   // return 200 with all incomplete quests
    }
    model.selectIncomplete(callback);   // call the selectIncomplete function in questModel
}


//handle error & response in readCompletedQuests
module.exports.readCompletedQuests = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error readCompletedQuests:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);   // return 200 with all completed quests
    }
    model.selectCompleted(callback);   // call the selectCompleted function in questModel
}


//handle error & response in readQuestByTrait
module.exports.readQuestByTrait = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error readQuestByTrait:", error);
            res.status(500).json(error);
        }
        else if (results.length == 0) {   // if results array is empty, return 404 with error
            res.status(404).json({
                Error: "Invalid trait"
            });
        }
        else res.status(200).json(results);   // return 200 with all quests with the given trait
    }
    const data = {
        trait: req.params.trait
    }
    model.selectByTrait(data, callback);   // call the selectByTrait function in questModel
}

//handle error & response in readQuestByDifficulty
module.exports.readQuestByDifficulty = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error readQuestByDifficulty:", error);
            res.status(500).json(error);
        }
        else if (results.length == 0) {   // if results array is empty, return 404 with error
            res.status(404).json({
                Error: "Invalid difficulty"
            });
        }
        else res.status(200).json(results);   // return 200 with all quests with the given difficulty
    }
    const data = {
        difficulty: req.params.difficulty
    }
    model.selectByDifficulty(data, callback);   // call the selectByDifficulty function in questModel
}


//handle error & response in rankQuests
module.exports.rankQuests = (req, res, next) => {
    // if req body does not have type or order return 400 with error undefined
    if (!(req.body.type && req.body.order)) {
        res.status(400).json({
            Error: "type or order undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error rankQuests:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);   // return 200 with all quests sorted by the given type and order
    }
}

//////////////////////////////////////////////////////
// CONTROLLER FOR UPDATE
//////////////////////////////////////////////////////
//handle error & response in updateQuestById
module.exports.updateQuestById = (req, res, next) => {
    // if req body does not have title or trait or difficulty or points or wait_time or completed return 400 with error undefined
    if (!(req.body.title && req.body.trait && req.body.difficulty && req.body.points && req.body.wait_time && req.body.completed)) {
        res.status(400).json({
            Error: "title or trait or difficulty or points or wait_time or completed undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        console.log(results);
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error updateQuestById:", error);
            res.status(500).json(error);
        } else {
            // if item_id does not exist return 404 with error does not exist
            if (results[0].affectedRows == 0) {   // since this is an update endpoint, number of affectedRows will be 0 only if nothing was updated, indicating that quest_id does not exist
                res.status(404).json({
                    Error: "Quest not found"
                });
            }
            else res.status(200).json(results[1][0]);   // return 200 with the updated quest ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        title: req.body.title,
        trait: req.body.trait,
        difficulty: req.body.difficulty,
        points: req.body.points,
        wait_time: req.body.wait_time,
        completed: req.body.completed,
        quest_id: req.params.quest_id
    }

    model.updateById(data, callback);   // call the updateById function in questModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR DELETE
//////////////////////////////////////////////////////
//handle error & response in deleteQuestById
module.exports.deleteQuestById = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error deleteQuestById:", error);
            res.status(500).json(error);
        } else {
            // if quest_id does not exist return 404 with error does not exist
            if (results[0].affectedRows == 0) {   // since this is a delete endpoint, number of affectedRows will be 0 only if nothing was deleted, indicating that quest_id does not exist
                res.status(404).json({
                    Error: "Quest not found"
                });
            }
            else res.status(204).send();   // return 204 with no content (send instead of json because there's no response body)
        }
    }
    const data = {
        quest_id: req.params.quest_id
    }

    model.deleteById(data, callback);   // call the deleteById function in questModel
}