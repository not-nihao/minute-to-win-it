/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: inventoryModel.js
// Content: contains all sql queries used to complete
// inventory related endpoints
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require("../services/db"); //import pool to send query to mysql server

//////////////////////////////////////////////////////
// MODEL FOR CREATE
//////////////////////////////////////////////////////
//function to create new inventory item
module.exports.insertSingle = (data, callback) => {
    // add new row in Inventory table with the data in local storage, and get the row with the newly created inventory_id
    const SQLSTATMENT = `
    INSERT INTO inventory (item_id, item_name, item_description))
    VALUES (?, ?, ?);
    SELECT * FROM inventory WHERE inventory_id = LAST_INSERT_ID();
    `;
    const VALUES = [data.item_id, data.item_name, data.item_description];
    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// MODEL FOR READ
//////////////////////////////////////////////////////
//function to fetch all inventory items
module.exports.selectAll = (callback) => {
    // get all rows from Inventory table
    const SQLSTATMENT = `
    SELECT * FROM Inventory;
    `;
    pool.query(SQLSTATMENT, callback);
}


//function to fetch inventory item by name
module.exports.selectById = (data, callback) => {
    // get the row with inventory_id matching the id given in the request body
    const SQLSTATMENT = `
    SELECT * FROM inventory WHERE inventory_id = ?;
    `;
    const VALUES = [data.inventory_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//function to check if item is still in inventory for useItem controller in inventoryController.js
module.exports.checkForUse = (data, callback) => {
    // get the row with inventory_id matching the id given in the request body
    const SQLSTATMENT = `
    SELECT count FROM Inventory WHERE inventory_id = ?;
    SELECT stamina, experience FROM Hero WHERE hero_id = (SELECT hero_id FROM Game WHERE game_id = ?);
    `;
    const VALUES = [data.inventory_id, data.game_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//////////////////////////////////////////////////////
// MODEL FOR UPDATE
//////////////////////////////////////////////////////
//function to reduce item count by 1 after use
module.exports.useStamina = (data, callback) => {
    // update the count column of the row with item_id matching the id given in the request body, and get the row with the given item_id
    const SQLSTATMENT = `
    UPDATE Inventory SET count = count-1 WHERE inventory_id = ?;
    UPDATE Hero SET stamina = stamina+20 WHERE hero_id = (SELECT hero_id FROM (SELECT last_insert_id(game_id) AS xqc FROM Game ORDER BY xqc DESC LIMIT 1) AS abc);
    SELECT * FROM Inventory WHERE inventory_id = ?;
    `;
    const VALUES = [data.inventory_id, data.inventory_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//function to reduce item count by 1 after use
module.exports.useExperience = (data, callback) => {
    // update the count column of the row with item_id matching the id given in the request body, and get the row with the given item_id
    const SQLSTATMENT = `
    UPDATE Inventory SET count = count-1 WHERE inventory_id = ?;
    UPDATE Hero SET experience = experience+1 WHERE hero_id = (SELECT hero_id FROM (SELECT last_insert_id(game_id) AS xqc FROM Game ORDER BY xqc DESC LIMIT 1) AS abc);
    SELECT * FROM Inventory WHERE inventory_id = ?;
    `;
    const VALUES = [data.inventory_id, data.inventory_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}
//////////////////////////////////////////////////////
// MODEL FOR DELETE
//////////////////////////////////////////////////////
//function to delete inventory item by id
module.exports.deleteById = (data, callback) => {
    // delete the row with inventory_id matching the id given in the request body
    const SQLSTATMENT = `
    DELETE FROM inventory WHERE inventory_id = ?;
    `;
    const VALUES = [data.inventory_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}