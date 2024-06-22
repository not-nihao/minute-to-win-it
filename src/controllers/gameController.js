/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: gameController.js
// Content: contains controllers that are part of the
// MVC for game related endpoints
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const model = require("../models/gameModel.js");   // import sql queries for games

//////////////////////////////////////////////////////
// CONTROLLER FOR CREATE
//////////////////////////////////////////////////////
//handle error & response in createNewGame
module.exports.createNewGame = (req, res, next) => {
    // if req body does not have user_id return 400 with error undefined
    if (!(req.params.user_id)) {
        res.status(400).json({
            Error: "user_id is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        console.log(results);
        // if user not found return 409 with error not found
        // if any unexpected error occurs return 500 with error
        if(error) {
            console.error("Error createNewGame:", error);
            res.status(500).json(error);
        }
        else if (results[0].length == 0) {
            res.status(404).json({
                message: "Invalid user_id"
            })
        }
        else {
            res.status(201).json(results[2][0]);   // return 201 with the newly created Game ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        user_id: req.params.user_id,
    }

    model.insertSingle(data, callback);   // call the insertSingle function in gameModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR READ
//////////////////////////////////////////////////////
//handle error & response in readAllGames
module.exports.readAllGames = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error readAllGames:", error);
            res.status(500).json(error);
        }
        else {
            res.status(200).json(results);   // return 200 with all games
        }
    }

    model.selectAll(callback);   // call the selectAll function in gameModel
}


//handle error & response in readGameById
module.exports.readGameById = (req, res, next) => {
    // if req params does not have game_id return 400 with error undefined
    if (!(req.params.game_id)) {
        res.status(400).json({
            Error: "game_id is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        // if game not found return 404 with error not found
        if (results.length === 0) {
            res.status(404).json({
                Error: "Game not found"
            });
        }
        // if any unexpected error occurs return 500 with error
        else if(error) {
            console.error("Error readGameById:", error);
            res.status(500).json(error);
        }
        else {
            res.status(200).json(results[0]);   // return 200 with the game ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        game_id: req.params.game_id
    }

    model.selectById(data, callback);   // call the selectById function in gameModel
}


// handle error & response in readByUserId
module.exports.readGameByUserId = (req, res, next) => {
    // if req params does not have user_id return 400 with error undefined
    if (!(req.params.user_id)) {
        res.status(400).json({
            Error: "user_id is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        if (error.errno == 1452) {  // error.errno == 1452 if user_id does not exist in user table
            res.status(404).json({
                Error: "User not found"
            });
        }
        // if game not found return 404 with error not found
        if (results.length === 0) {
            res.status(404).json({
                Error: "user has not played any games"
            });
        }
        // if any unexpected error occurs return 500 with error
        else if(error) {
            console.error("Error readByUserId:", error);
            res.status(500).json(error);
        }
        else {
            res.status(200).json(results);   // return 200 with the game ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        user_id: req.params.user_id
    }

    model.selectByUserId(data, callback);   // call the selectByUserId function in gameModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR UPDATE
//////////////////////////////////////////////////////
//handle error & response in updatePoints
module.exports.updatePoints = (req, res, next) => {
    // if req params does not have game_id return 400 with error undefined
    if (!(req.params.game_id && req.body.points)) {
        res.status(400).json({
            Error: "game_id is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        // if game not found return 404 with error not found
        if (results[1].length === 0) {
            res.status(404).json({
                Error: "Invalid game_id"
            });
        }
        // if any unexpected error occurs return 500 with error
        else if(error) {
            console.error("Error updateGameById:", error);
            res.status(500).json(error);
        }
        else {
            res.status(201).json(results[1][0]);   // return 201 with the updated game ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        game_id: req.params.game_id,
        points: req.body.points,
    }

    model.updatePointsById(data, callback);   // call the updatePointsById function in gameModel
}


//handle error & response in switchHero
module.exports.switchHero = (req, res, next) => {
    // if req params does not have game_id return 400 with error undefined
    if (!(req.params.game_id && req.body.hero_id)) {
        res.status(400).json({
            Error: "game_id or hero_id is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        // if game not found return 404 with error not found
        if (results[1].length === 0) {
            res.status(404).json({
                Error: "Invalid game_id"
            });
        }
        // if any unexpected error occurs return 500 with error
        else if(error) {
            console.error("Error updateGameById:", error);
            res.status(500).json(error);
        }
        else {
            res.status(201).json(results[1][0]);   // return 201 with the updated game ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        game_id: req.params.game_id,
        hero_id: req.body.hero_id,
    }

    model.switchHero(data, callback);   // call the switchHero function in gameModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR DELETE
//////////////////////////////////////////////////////
// handle error & response in deleteGameById
module.exports.deleteGameById = (req, res, next) => {
    // if req params does not have game_id return 400 with error undefined
    if (!(req.params.game_id)) {
        res.status(400).json({
            Error: "game_id is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        // if game not found return 404 with error not found
        if (results.affectedRows == 0) {
            res.status(404).json({
                Error: "Game not found"
            });
        }
        // if any unexpected error occurs return 500 with error
        else if(error) {
            console.error("Error deleteGameById:", error);
            res.status(500).json(error);
        }
        else {
            res.status(200).json(results);   // return 200 with the deleted game
        }
    }

    const data = {
        game_id: req.params.game_id
    }

    model.deleteById(data, callback);   // call the deleteById function in gameModel
}
