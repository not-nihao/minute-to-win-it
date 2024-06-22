/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: logModel.js
// Content: contains all sql queries used to complete
// gameLog and questLog related endpoints
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require("../services/db"); //import pool to send query to mysql server

//////////////////////////////////////////////////////
// MODEL FOR CREATE
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////
// MODEL FOR READ
//////////////////////////////////////////////////////
//function to fetch all games by specific user
module.exports.selectByUserId = (data, callback) => {
    // get row from game table with the given user_id
    const SQLSTATMENT = `
    SELECT * FROM GameLog WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//function to fetch the best score of a user
module.exports.selectBestScoreByUserId = (data, callback) => {
    // get row from game table with the given user_id
    const SQLSTATMENT = `
    SELECT username FROM User RIGHT JOIN GameLog ON User.user_id = GameLog.user_id where GameLog.points = (SELECT MAX(points) FROM GameLog WHERE user_id = ? Order By points DESC LIMIT 1);
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//function to fetch the top 10 point scorers
module.exports.selectCount = (callback) => {
    // get row from game table with the given user_id
    const SQLSTATMENT = `
    SELECT user.user_id, user.username, gamelog.glog_id, gamelog.points FROM User RIGHT JOIN GameLog ON User.user_id = GameLog.user_id Order By points DESC LIMIT 10;
    `;
    pool.query(SQLSTATMENT, callback);
}

//////////////////////////////////////////////////////
// MODEL FOR UPDATE
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////
// MODEL FOR DELETE
//////////////////////////////////////////////////////