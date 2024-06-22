/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: taskModel.js
// Content: contains all sql queries used to complete
// task related requirements outlined in CA1 brief
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require("../services/db"); //import pool to send query to mysql server


//////////////////////////////////////////////////////
// MODEL FOR CREATE
//////////////////////////////////////////////////////

//function to create new task
module.exports.insertSingle = (data, callback) => {
    // add new row in task table with the given data, and get the row with the newly created task_id
    const SQLSTATMENT = `
    INSERT INTO task (title, description, points)
    VALUES (?, ?, ?);
    SELECT * FROM task WHERE task_id = LAST_INSERT_ID();
    `;
    const VALUES = [data.title, data.description, data.points];

    pool.query(SQLSTATMENT, VALUES, callback);
}


//////////////////////////////////////////////////////
// MODEL FOR READ
//////////////////////////////////////////////////////

// function to fetch all tasks
module.exports.selectAll = (callback) => {
    // get all rows from task table
    const SQLSTATMENT = `
    SELECT * FROM task;
    `;
    pool.query(SQLSTATMENT, callback);
}

//function to fetch task by id
module.exports.selectById = (data, callback) => {
    // get the row with task_id matching the id given in the request body
    const SQLSTATMENT = `
    SELECT * FROM task WHERE task_id = ?;
    `;
    const VALUES = [data.task_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//////////////////////////////////////////////////////
// MODEL FOR UPDATE
//////////////////////////////////////////////////////

//function to update task by id
module.exports.updateById = (data, callback) => {
    // update the row with task_id matching the id given in the request body with the given data, and get the row with the given task_id
    const SQLSTATMENT = `
    UPDATE task SET title = ?, description = ?, points = ? WHERE task_id = ?;
    SELECT * FROM task WHERE task_id = ?;
    `;
    const VALUES = [data.title, data.description, data.points, data.task_id, data.task_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//////////////////////////////////////////////////////
// MODEL FOR DELETE
//////////////////////////////////////////////////////

//function to delete task by id
module.exports.deleteById = (data, callback) => {
    // delete the row with task_id matching the id given in the request body, and reset the auto increment value
    const SQLSTATMENT = `
    DELETE FROM task 
    WHERE task_id = ?;

    ALTER TABLE user AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.task_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}