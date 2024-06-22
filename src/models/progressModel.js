/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: progressModel.js
// Content: contains all sql queries used to complete
// progress related requirements outlined in CA1 brief
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require("../services/db"); //import pool to send query to mysql server


//////////////////////////////////////////////////////
// MODEL FOR CREATE
//////////////////////////////////////////////////////

// function to search if user_id and task_id already exists in database for createNewProgress controller in progressController.js
module.exports.searchForCreate = (data, callback) => {
    // get all rows with user_id and task_id matching the ids' given in the request body
    const SQLSTATMENT = `
    SELECT * FROM User WHERE user_id = ?;
    SELECT * FROM Task WHERE task_id = ?;
    `;
    const VALUES = [data.user_id, data.task_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//function to create new progress
module.exports.insertSingle = (data, callback) => {
    // add new row in taskprogress table with the given data, and get the row with the newly created progress_id
    const SQLSTATMENT = `
    INSERT INTO taskprogress (user_id, task_id)
    VALUES (?, ?);
    SELECT * FROM taskprogress WHERE progress_id = LAST_INSERT_ID();
    `;
    const VALUES = [data.user_id, data.task_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


//////////////////////////////////////////////////////
// MODEL FOR READ
//////////////////////////////////////////////////////

// function to fetch progress by id
module.exports.selectById = (data, callback) => {
    // get all rows with user_id matching the id given in the request body
    const SQLSTATMENT = `
    SELECT * FROM taskprogress WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

// function to fetch the date at which the task was accepted by task_id
module.exports.getDateById = (data, callback) => {
    // get all rows with user_id matching the id given in the request body
    const SQLSTATMENT = `
    SELECT completion_date FROM taskprogress WHERE task_id = ?;
    `;
    const VALUES = [data.task_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


// function to get the count of users who have accepted a task by task_id
module.exports.getCountById = (data, callback) => {
    // get the count of users who have accepted a task by task_id
    const SQLSTATMENT = `
    SELECT COUNT(user_id) AS count FROM taskprogress WHERE task_id = ?;
    `;
    const VALUES = [data.task_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//////////////////////////////////////////////////////
// MODEL FOR UPDATE
//////////////////////////////////////////////////////

//function to update progress by id
module.exports.updateById = (data, callback) => {
    // update the row with progress_id matching the id given in the request body, and get the row with the given progress_id
    const SQLSTATMENT = `
    UPDATE taskprogress SET notes = ? WHERE progress_id = ?;
    SELECT * FROM taskprogress WHERE progress_id = ?;
    `;
    const VALUES = [data.notes, data.progress_id, data.progress_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//////////////////////////////////////////////////////
// MODEL FOR DELETE
//////////////////////////////////////////////////////

//function to delete progress by id
module.exports.deleteById = (data, callback) => {
    // delete the row with progress_id matching the id given in the request body, and reset the auto increment value
    const SQLSTATMENT = `
    DELETE FROM taskprogress 
    WHERE progress_id = ?;

    ALTER TABLE taskprogress AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.progress_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}