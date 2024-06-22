/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: gameModel.js
// Content: contains all sql queries used to complete
// game related endpoints
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require("../services/db"); //import pool to send query to mysql server

//////////////////////////////////////////////////////
// MODEL FOR CREATE
//////////////////////////////////////////////////////
//function to create new game
module.exports.insertSingle = (data, callback) => {
    // add new row in game table with the userId in local storage, and get the row with the newly created game_id
    const SQLSTATMENT = `
    SELECT * FROM user WHERE user_id = ?;
    INSERT INTO game (user_id)
    VALUES (?);
    SELECT * FROM game WHERE game_id = LAST_INSERT_ID();
    `;
    const VALUES = [data.user_id, data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// MODEL FOR READ
//////////////////////////////////////////////////////
//function to fetch the current score of the user in the current game
module.exports.selectCurrentScore = (callback) => {
    // get current points from Game table with game_id stored in local storage
    const SQLSTATMENT = `
    SELECT points From Game as current_points where game_id = ?;
    `;
    VALUES = [data.game_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//function to fetch all games
module.exports.selectAll = (callback) => {
    // get all rows from Game table
    const SQLSTATMENT = `
    SELECT * FROM game;
    `;
    pool.query(SQLSTATMENT, callback);
}


//function to fetch game by game_id
module.exports.selectById = (data, callback) => {
    // get row from game table with the given game_id
    const SQLSTATMENT = `
    SELECT * FROM game WHERE game_id = ?;
    `;
    const VALUES = [data.game_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//function to fetch game by user_id
module.exports.selectByUserId = (data, callback) => {
    // get row from game table with the given user_id
    const SQLSTATMENT = `
    SELECT * FROM game WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//function to fetch the best score of a user
module.exports.selectBestScoreByUserId = (data, callback) => {
    // get row from game table with the given user_id
    const SQLSTATMENT = `
    SELECT MAX(points) AS points FROM game WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}
//////////////////////////////////////////////////////
// MODEL FOR UPDATE
//////////////////////////////////////////////////////
//function to update points by game_id
module.exports.updatePointsById = (data, callback) => {
    // update row in game table with the given game_id
    const SQLSTATMENT = `
    UPDATE game SET points = ? WHERE game_id = ?;
    SELECT * FROM game WHERE game_id = ?;
    `;
    const VALUES = [data.points, data.game_id, data.game_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//function to switch hero by game_id
module.exports.switchHero = (data, callback) => {
    // update row in game table with the given game_id
    const SQLSTATMENT = `
    UPDATE game SET hero_id = ? WHERE game_id = ?;
    SELECT * FROM game WHERE game_id = ?;
    `;
    const VALUES = [data.hero_id, data.game_id, data.game_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}
//////////////////////////////////////////////////////
// MODEL FOR DELETE
//////////////////////////////////////////////////////
//function to delete game by game_id
module.exports.deleteById = (data, callback) => {
    // delete row from game table with the given game_id
    const SQLSTATMENT = `
    DELETE FROM game WHERE game_id = ?;
    ALTER TABLE game AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.game_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}
