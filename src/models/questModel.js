/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: questpModel.js
// Content: contains all sql queries used to complete
// quest related endpoints
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require("../services/db"); //import pool to send query to mysql server

//////////////////////////////////////////////////////
// MODEL FOR COMPLETING QUESTS
//////////////////////////////////////////////////////
// function to check if quest is completed
module.exports.checkCompleted = (data, callback) => {
    // get the row from Quest table with the given quest_id
    const SQLSTATMENT = `
    SELECT completed FROM Quest WHERE quest_id = ?;
    `;
    const VALUES = [data.quest_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


// function to complete quest
module.exports.completeQuest = (data, callback) => {
    // update the row with quest_id matching the id given in the request body with the given data, and get the row with the given quest_id
    const SQLSTATMENT = `
    SELECT trait, wait_time FROM Quest WHERE quest_id = ?;
    SELECT class, experience From Hero where hero_id = (SELECT hero_id FROM Game WHERE game_id = (SELECT * FROM (SELECT last_insert_id(game_id) AS xqc FROM Game ORDER BY xqc DESC LIMIT 1) AS abc));
    UPDATE Quest SET completed = true WHERE quest_id = ?;
    UPDATE Game SET points = points+(SELECT points FROM Quest WHERE quest_id = ?) WHERE game_id = (SELECT * FROM (SELECT last_insert_id(game_id) AS xqc FROM Game ORDER BY xqc DESC LIMIT 1) AS abc);
    SELECT * FROM Quest WHERE quest_id = ?;
    `;
    const VALUES = [data.quest_id, data.quest_id, data.quest_id, data.quest_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// MODEL FOR CREATE
//////////////////////////////////////////////////////
//function to create new quest
module.exports.insertSingle = (data, callback) => {
    // add new row in Quest table with the given data, and get the row with the newly created quest_id
    const SQLSTATMENT = `
    INSERT INTO Quest (title, trait, difficulty, points, wait_time)
    VALUES (?, ?, ?, ?, ?);
    SELECT * FROM Quest WHERE quest_id = LAST_INSERT_ID();
    `;
    const VALUES = [data.title, data.trait, data.difficulty, data.points, data.wait_time];
    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// MODEL FOR READ
//////////////////////////////////////////////////////
// function to fetch all quests
module.exports.selectAll = (callback) => {
    // get all rows from quest table
    const SQLSTATMENT = `
    SELECT * FROM Quest;
    `;
    pool.query(SQLSTATMENT, callback);
}


// function to fetch all quests
module.exports.selectAll = (callback) => {
    // get all rows from quest table
    const SQLSTATMENT = `
    SELECT * FROM Quest;
    `;
    pool.query(SQLSTATMENT, callback);
}


//function to fetch all incomplete quests
module.exports.selectIncomplete = (callback) => {
    // get all rows from quest table where completed is false
    const SQLSTATMENT = `
    SELECT * FROM Quest WHERE completed = false;
    `;
    pool.query(SQLSTATMENT, callback);
}


//function to fetch all completed quests
module.exports.selectCompleted = (callback) => {
    // get all rows from quest table where completed is true
    const SQLSTATMENT = `
    SELECT * FROM Quest WHERE completed = true;
    `;
    pool.query(SQLSTATMENT, callback);
}


//function to fetch quest by difficulty
module.exports.selectByDifficulty = (data, callback) => {
    // get all rows from quest table where difficulty matches the given difficulty
    const SQLSTATMENT = `
    SELECT * FROM Quest WHERE difficulty = ?;
    `;
    const VALUES = [data.difficulty];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//function to fetch quest by trait
module.exports.selectByTrait = (data, callback) => {
    // get all rows from quest table where trait matches the given trait
    const SQLSTATMENT = `
    SELECT * FROM Quest WHERE trait = ?;
    `;
    const VALUES = [data.trait];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//function to rank quests by points or wait_time in ascending or descending order
module.exports.rankQuests = (data, callback) => {
    if (data.type == "points") {
        console.log('a')
        if (data.order == "ascending") {
            console.log('b')
            // get all rows from quest table and order by points in ascending order
            const SQLSTATMENT = `
            SELECT * FROM Quest ORDER BY points ASC;
            `;
            pool.query(SQLSTATMENT, callback);
            console.log('c')
        } else if (data.order == "descending") {
            console.log('d')
            // get all rows from quest table and order by points in descending order
            const SQLSTATMENT = `
            SELECT * FROM Quest ORDER BY points DESC;
            `;
            pool.query(SQLSTATMENT, callback);
        }
        else{ return;}
    }
    else if (data.type == "wait_time") {
        if (data.order == "ascending") {
            // get all rows from quest table and order by wait_time in ascending order
            const SQLSTATMENT = `
            SELECT * FROM Quest ORDER BY wait_time ASC;
            `;
            pool.query(SQLSTATMENT, callback);
        }
         else if (data.order == "descending") {
            // get all rows from quest table and order by wait_time in descending order
            const SQLSTATMENT = `
            SELECT * FROM Quest ORDER BY wait_time DESC;
            `;
            pool.query(SQLSTATMENT, callback);
        }
        else{return;}
    }
}
//////////////////////////////////////////////////////
// MODEL FOR UPDATE
//////////////////////////////////////////////////////
// function to update quest by id
module.exports.updateById = (data, callback) => {
    // update the row with quest_id matching the id given in the request body with the given data, and get the row with the given quest_id
    const SQLSTATMENT = `
    UPDATE Quest SET title = ?, trait = ?, difficulty = ?, points = ?, wait_time = ?, completed = ? WHERE quest_id = ?;
    SELECT * FROM Quest WHERE quest_id = ?;
    `;
    const VALUES = [data.title, data.trait, data.difficulty, data.points, data.wait_time, data.completed, data.quest_id, data.quest_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// MODEL FOR DELETE
//////////////////////////////////////////////////////
// function to delete quest by id
module.exports.deleteById = (data, callback) => {
    // delete the row with quest_id matching the id given in the request body, and reset the auto increment value
    const SQLSTATMENT = `
    DELETE FROM Quest WHERE quest_id = ?;
    ALTER TABLE Quest AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.quest_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}