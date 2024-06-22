/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: logController.js
// Content: contains controllers that are part of the
// MVC for log related endpoints
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////

const model = require("../models/logModel.js");   // import sql queries for gameLog & questLog

//////////////////////////////////////////////////////
// CONTROLLER FOR CREATE
//////////////////////////////////////////////////////
//handle error & response in check function used in CreateGameLog
module.exports.checkForCreateGameLog = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if req body does not have username or email return 400 with error undefined
        if (error) {
            console.error("Error checkForCreate:", error);
            res.status(500).json(error);
        }
        // if email already exists return 409 with error already exists
        else if (results.length !== 0) {   // results array will not be empty if email already exists in database
            res.status(409).json({
                message: "email already exists"
            });
        }
        else {
            next();   // if email does not exist, proceed to createNewUser
        }

    }
    const data = {
        email: req.body.email
    }

    model.checkF(data, callback);   // call the searchForCreate function in userModel
}


// handle error & response for createGameLog
module.exports.createGameLog = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error createGameLog:", error);
            res.status(500).json(error);
        }
        else {
            res.status(201).json(results);   // return 201 with all game logs
        }
    }

    model.insertGameLog(req.body, callback);   // call the insertGameLog function in logModel
}


// handle errer & response for createQuestLog
module.exports.createQuestLog = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error createQuestLog:", error);
            res.status(500).json(error);
        }
        else {
            res.status(201).json(results);   // return 201 with all quest logs
        }
    }

    model.insertQuestLog(req.body, callback);   // call the insertQuestLog function in logModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR READ
//////////////////////////////////////////////////////
// handle error & response for readLeaderboard
module.exports.readLeaderboard = (req, res, next) => {

    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error read:", error);
            res.status(500).json(error);
        }
        else if(results.length === 0){
            res.status(202).json({message: "No content to show"});   // return 204 no content
        }
        else {
            res.status(200).json(results);   // return 201 with all higehest scores by users
        }
    }
    
model.selectCount(callback);  // call the selectCount function in logModel
}

//handle error & response in readQuestLogs
module.exports.readQuestLogs = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error readQuestLogs:", error);
            res.status(500).json(error);
        }
        else {
            res.status(200).json(results);   // return 200 with all quests completed by the user in all game ever (for new achievement unlocked)
        }
    }

    model.selectQuestLogs(callback);   // call the selectQuestLogs function in logModel
}


//handle error & response in readGameLogById
module.exports.readGameLogById = (req, res, next) => {
    // if req params does not have game_id return 400 with error undefined
    if (!(req.params.game_id)) {
        res.status(400).json({
            Error: "glog_id is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        // if game log not found return 404 with error not found
        if (results.length === 0) {
            res.status(404).json({
                Error: "Game Log not found"
            });
        }
        // if any unexpected error occurs return 500 with error
        else if(error) {
            console.error("Error readGameLogById:", error);
            res.status(500).json(error);
        }
        else {
            res.status(200).json(results[0]);   // return 200 with the game log ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        glog_id: req.params.glog_id
    }

    model.selectGameLogById(data, callback);   // call the selectGameLogById function in logModel
}


//handle error & response in readQuestLogById
module.exports.readQuestLogById = (req, res, next) => {
    // if req params does not have game_id return 400 with error undefined
    if (!(req.params.qlog_id)) {
        res.status(400).json({
            Error: "qlog_id is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        // if quest log not found return 404 with error not found
        if (results.length === 0) {
            res.status(404).json({
                Error: "Quest Log not found"
            });
        }
        // if any unexpected error occurs return 500 with error
        else if(error) {
            console.error("Error readQuestLogById:", error);
            res.status(500).json(error);
        }
        else {
            res.status(200).json(results[0]);   // return 200 with the quest log ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        qlog_id: req.params.qlog_id
    }

    model.selectQuestLogById(data, callback);   // call the selectQuestLogById function in logModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR UPDATE
//////////////////////////////////////////////////////
//handle error & response in updateGameLogById
module.exports.updateGameLogById = (req, res, next) => {
    // if req body does not have user_id or game_id or points return 400 with error undefined
    if (!(req.body.user_id && req.body.points && req.game_id)) {
        res.status(400).json({
            Error: "user_id or game_id or points is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        // if game not found return 404 with error not found
        if (results[1].length === 0) {
            res.status(404).json({
                Error: "Game Log not found"
            });
        }
        // if any unexpected error occurs return 500 with error
        else if(error) {
            console.error("Error updateGameLogById:", error);
            res.status(500).json(error);
        }
        else {
            res.status(200).json(results[1][0]);   // return 200 with the updated game ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        glog_id: req.params.glog_id,
        user_id: req.body.user_id,
        points: req.body.points,
    }

    model.updateGameLogById(data, callback);   // call the updateGameLogById function in gameModel
}


//handle error & response in updateQuestLogById
module.exports.updateQuestLogById = (req, res, next) => {
    // if req body does not have game_id or quest_id or return 400 with error undefined
    if (!(req.body.game_id && req.body.points)) {
        res.status(400).json({
            Error: "user_id or points is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        // if game not found return 404 with error not found
        if (results[1].length === 0) {
            res.status(404).json({
                Error: "Game Log not found"
            });
        }
        // if any unexpected error occurs return 500 with error
        else if(error) {
            console.error("Error updateGameById:", error);
            res.status(500).json(error);
        }
        else {
            res.status(200).json(results[1][0]);   // return 200 with the updated game ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        qlog_id: req.params.qlog_id,
        user_id: req.body.user_id,
        points: req.body.points,
    }

    model.updateGameLogById(data, callback);   // call the updateGameLogById function in gameModel
}


//////////////////////////////////////////////////////
// CONTROLLER FOR DELETE
//////////////////////////////////////////////////////
//handle error & response in deleteGameLogById
module.exports.deleteGameLogById = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error deleteGameLogById:", error);
            res.status(500).json(error);
        }
        // if glog_id does not exist return 404 with error invalid
        else if (results.affectedRows == 0) {   // results.affectedRows == 0 if glog_id does not exist in database
            res.status(404).json({
                Error: "Invalid glog_id"
            });
        }
        else res.status(204).send();   // return 204 no content
    }
    const data = {
        glog_id: req.params.glog_id
    }

    model.deleteById(data, callback);   // call the deleteById function in inventoryModel
}