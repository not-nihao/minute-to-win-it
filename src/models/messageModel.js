/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: messageModel.js
// Content: contains all sql queries used to complete
// message related endpoints
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require("../services/db"); //import pool to send query to mysql server

//////////////////////////////////////////////////////
// MODEL FOR CREATE
//////////////////////////////////////////////////////

module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Messages (message_text, user_id)
    VALUES (?, ?);
    `;
    const VALUES = [data.message_text, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


//////////////////////////////////////////////////////
// MODEL FOR READ
//////////////////////////////////////////////////////

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT User.username, messages.message_id, messages.message_text, messages.user_id, messages.created_at
    FROM User
    RIGHT JOIN messages
    ON User.user_id = messages.user_id;

    `;

    pool.query(SQLSTATMENT, callback);
}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Messages
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectIdByTimestamp = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT message_id FROM Messages
    WHERE created_at = ?;
    `;
    const VALUES = [data.timestamp];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// MODEL FOR UPDATE
//////////////////////////////////////////////////////

module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Messages 
    SET message_text = ?, user_id = ?
    WHERE id = ?;
    `;
    const VALUES = [data.message_text, data.user_id, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


//////////////////////////////////////////////////////
// MODEL FOR DELETE
//////////////////////////////////////////////////////

module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Messages 
    WHERE message_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}