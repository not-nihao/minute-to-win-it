/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: heroModel.js
// Content: contains all sql queries used to complete
// hero related endpoints
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require("../services/db"); //import pool to send query to mysql server

//////////////////////////////////////////////////////
// MODEL FOR CREATE
//////////////////////////////////////////////////////
//function to search if name already exists in hero table for createNewHero controller in heroController.js
module.exports.searchForCreate = (data, callback) => {
    // get all rows with Hero_name matching the name given in the request body
    const SQLSTATMENT = `
    SELECT * FROM hero WHERE hero_name = ?;
    `;
    const VALUES = [data.name];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//function to create new user
module.exports.insertSingle = (data, callback) => {
    // add new row in Hero table with the given data, and get the row with the newly created hero_id
    const SQLSTATMENT = `
    INSERT INTO Hero (hero_name, class, stamina)
    VALUES (?, ?, ?);
    SELECT * FROM Hero WHERE hero_id = LAST_INSERT_ID();
    `;
    const VALUES = [data.name, data.class, data.stamina];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//////////////////////////////////////////////////////
// MODEL FOR READ
//////////////////////////////////////////////////////
// function to fetch all heroes
module.exports.selectAll = (callback) => {
    // get all rows from Hero table
    const SQLSTATMENT = `
    SELECT * FROM Hero;
    `;
    pool.query(SQLSTATMENT, callback);
}


//function to fetch hero by id
module.exports.selectById = (data, callback) => {
    // get the row with hero_id matching the id given in the request body
    const SQLSTATMENT = `
    SELECT * FROM Hero WHERE hero_id = ?;
    `;
    const VALUES = [data.hero_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//////////////////////////////////////////////////////
// MODEL FOR UPDATE
//////////////////////////////////////////////////////
//function to update user by id
module.exports.updateById = (data, callback) => {
    // update the row with user_id matching the id given in the request body with the given data, and get the row with the given user_id
    const SQLSTATMENT = `
    UPDATE Hero SET hero_name = ?, class = ?, stamina = ?, experience = ? WHERE hero_id = ?;
    SELECT * FROM Hero WHERE hero_id = ?;
    `;
    const VALUES = [data.name, data.class, data.stamina, data.experience, data.hero_id, data.hero_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//////////////////////////////////////////////////////
// MODEL FOR DELETE
//////////////////////////////////////////////////////
//function to delete user by id
module.exports.deleteById = (data, callback) => {
    // delete the row with user_id matching the id given in the request body, and reset the auto increment value
    const SQLSTATMENT = `
    DELETE FROM Hero WHERE hero_id = ?;
    ALTER TABLE Hero AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}