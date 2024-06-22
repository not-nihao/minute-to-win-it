/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: shopModel.js
// Content: contains all sql queries used to complete
// shop related endpoints
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require("../services/db"); //import pool to send query to mysql server

//////////////////////////////////////////////////////
// MODEL FOR BUYING ITEM
//////////////////////////////////////////////////////
//function to check if item still has stock, and you have enough points to purchase item for buyItem controller in shopController.js
module.exports.checkForBuy = (data, callback) => {
    // get the row with item_id matching the id given in the request body
    const SQLSTATMENT = `
    SELECT Remaining, price, item_name FROM Shop WHERE item_id = ?;
    SELECT points FROM Game WHERE game_id = ?;
    `;
    const VALUES = [data.item_id, data.game_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//function to reduce item remaining count by 1
module.exports.buyItem = (data, callback) => {
    // update the Remaining column of the row with item_id matching the id given in the request body, and get the row with the given item_id
    const SQLSTATMENT = `
    UPDATE Shop SET Remaining = Remaining-1 WHERE item_id = ?;
    UPDATE Inventory SET  count = count+1 WHERE item_name = ?;
    UPDATE Game SET points = points-? WHERE game_id = ?
    SELECT * FROM Shop WHERE item_id = ?;
    `;
    const VALUES = [data.item_id, data.name, data.price, data.game_id, data.item_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//////////////////////////////////////////////////////
// MODEL FOR CREATE
//////////////////////////////////////////////////////
//function to add new item to shop
module.exports.insertSingle = (data, callback) => {
    // add new row in Shop table with the given data, and get the row with the newly created item_id
    const SQLSTATMENT = `
    INSERT INTO Shop (item_name, description, price)
    VALUES (?, ?, ?);
    SELECT * FROM Shop WHERE item_id = LAST_INSERT_ID();
    `;
    const VALUES = [data.name, data.description, data.price];
    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// MODEL FOR READ
//////////////////////////////////////////////////////
// function to fetch all items
module.exports.selectAll = (callback) => {
    // get all rows from shop table
    const SQLSTATMENT = `
    SELECT * FROM Shop;
    `;
    pool.query(SQLSTATMENT, callback);
}

//////////////////////////////////////////////////////
// MODEL FOR UPDATE
//////////////////////////////////////////////////////
//function to update item by id
module.exports.updateById = (data, callback) => {
    // update the row with item_id matching the id given in the request body with the given data, and get the row with the given item_id
    const SQLSTATMENT = `
    UPDATE Shop SET item_name = ?, description = ?, price = ?, Remaining = ?  WHERE item_id = ?;
    SELECT * FROM Shop WHERE item_id = ?;
    `;
    const VALUES = [data.name, data.description, data.price, data.remaining, data.item_id, data.item_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// MODEL FOR DELETE
//////////////////////////////////////////////////////
//function to delete item by id
module.exports.deleteById = (data, callback) => {
    // delete the row with item_id matching the id given in the request body, and reset the auto increment value
    const SQLSTATMENT = `
    DELETE FROM Shop WHERE item_id = ?;
    ALTER TABLE Shop AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.item_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}