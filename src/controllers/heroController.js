/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: heroController.js
// Content: contains controllers that are part of the
// MVC for hero related endpoints
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const model = require("../models/heroModel.js");   // import sql queries for heroes

//////////////////////////////////////////////////////
// CONTROLLER FOR CREATE
//////////////////////////////////////////////////////
//handle error & response in search function used in createNewHero
module.exports.searchForCreate = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error search in db:", error);
            res.status(500).json(error);
        }
        // if hero already exists return 409 with error already exists
        else if (results.length !== 0) {   // results array will not be empty if hero already exists in database
            res.status(409).json({
                Error: "hero already exists"
            });
        }
        else {
            next();   // if name does not exist, proceed to createNewHero
        }

    }
    const data = {
        name: req.body.name,
    }

    model.searchForCreate(data, callback);   // call the searchForCreate function in heroModel
}


//handle error & response in createNewHero
module.exports.createNewHero = (req, res, next) => {
    // if req body does not have name or class or stamina return 400 with error undefined
    if (!(req.body.name && req.body.class && req.body.stamina)) {
        res.status(400).json({
            Error: "name or class or stamina is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error createNewHero:", error);
            res.status(500).json(error);
        }
        else {
            res.status(201).json(results[1][0]);   // return 201 with the newly created Hero ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        name: req.body.name,
        class: req.body.class,
        stamina: req.body.stamina
    }

    model.insertSingle(data, callback);   // call the insertSingle function in userModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR READ
//////////////////////////////////////////////////////
//handle error & response in readAllHeroes
module.exports.readAllHeroes = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error readAllHeroes:", error);
            res.status(500).json(error);
        }
        else {
            res.status(200).json(results);   // return 200 with all heroes
        }
    }

    model.selectAll(callback);   // call the selectAll function in heroModel
}


//handle error & response in readHeroById
module.exports.readHeroById = (req, res, next) => {
    // if req params does not have hero_id return 400 with error undefined
    if (!(req.params.hero_id)) {
        res.status(400).json({
            Error: "hero_id is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        // if hero not found return 404 with error not found
        if (results.length === 0) {
            res.status(404).json({
                Error: "Hero not found"
            });
        }
        // if any unexpected error occurs return 500 with error
        else if(error) {
            console.error("Error readHeroById:", error);
            res.status(500).json(error);
        }
        else {
            res.status(200).json(results[0]);   // return 200 with the hero ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        hero_id: req.params.hero_id,
    }

    model.selectById(data, callback);   // call the selectBy function in heroModel
}
//////////////////////////////////////////////////////
// CONTROLLER FOR UPDATE
//////////////////////////////////////////////////////
// handle error & response in switchHero
module.exports.switchHero = (req, res, next) => {
    // if req params does not have game_id return 400 with error undefined
    if (!(req.params.game_id && req.body.hero_id)) {
        res.status(400).json({
            Error: "game_id is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        // if hero not found return 404 with error not found
        if (error.errno == 1452) {  // error.errno == 1452 if hero_id does not exist in hero table
            res.status(404).json({
                Error: "Hero not found"
            });
        }
        // if game not found return 404 with error not found
        else if (results.affectedRows == 0) {
            res.status(404).json({
                Error: "Game not found"
            });
        }
        // if any unexpected error occurs return 500 with error
        else if(error) {
            console.error("Error switchHero:", error);
            res.status(500).json(error);
        }
        else {
            res.status(200).json(results);   // return 200 with the updated game
        }
    }

    const data = {
        game_id: req.params.game_id,
        hero_id: req.body.hero_id
    }

    model.switchHero(data, callback);   // call the switchHero function in gameModel
}


//handle error & response in updateHeroById
module.exports.updateHeroById = (req, res, next) => {
    // if req params does not have hero_id return 400 with error undefined
    if (!(req.params.hero_id)) {
        res.status(400).json({
            Error: "hero_id is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        // if hero not found return 404 with error not found
        if (results.affectedRows == 0) {
            res.status(404).json({
                Error: "Hero not found"
            });
        }
        // if any unexpected error occurs return 500 with error
        else if(error) {
            console.error("Error updateHeroById:", error);
            res.status(500).json(error);
        }
        else {
            res.status(200).json(results);   // return 200 with the updated hero
        }
    }

    const data = {
        hero_id: req.params.hero_id,
        name: req.body.name,
        class: req.body.class,
        stamina: req.body.stamina
    }

    model.updateById(data, callback);   // call the updateById function in heroModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR DELETE
//////////////////////////////////////////////////////
//handle error & response in deleteHeroById
module.exports.deleteHeroById = (req, res, next) => {
    // if req params does not have hero_id return 400 with error undefined
    if (!(req.params.hero_id)) {
        res.status(400).json({
            Error: "hero_id is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        // if hero not found return 404 with error not found
        if (results.affectedRows == 0) {
            res.status(404).json({
                Error: "Hero not found"
            });
        }
        // if any unexpected error occurs return 500 with error
        else if(error) {
            console.error("Error deleteHeroById:", error);
            res.status(500).json(error);
        }
        else {
            res.status(200).json(results);   // return 200 with the deleted hero
        }
    }

    const data = {
        hero_id: req.params.hero_id,
    }

    model.deleteById(data, callback);   // call the deleteById function in heroModel
}