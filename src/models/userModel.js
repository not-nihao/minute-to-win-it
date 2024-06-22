/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: userModel.js
// Content: contains all sql queries used to complete
// user related requirements outlined in CA1 brief
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require("../services/db"); //import pool to send query to mysql server


//////////////////////////////////////////////////////
// MODEL FOR LOGIN
//////////////////////////////////////////////////////
module.exports.login = (data, callback) => {

    const SQLSTATEMENT = `
        SELECT * FROM User WHERE email = ?;
    `;

    VALUES = [data.email];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// MODEL FOR REGISTER
//////////////////////////////////////////////////////
module.exports.readUserByEmailAndUsername = (data, callback) => {

    const SQLSTATEMENT = `
        SELECT User.email FROM User WHERE email = ?;
        SELECT User.username FROM User WHERE username = ?;
    `;

    VALUES = [data.email, data.username];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.register = (data, callback) => {

    const SQLSTATEMENT = `
        INSERT INTO User (username, email, password)
        VALUES (?, ?, ?);
    `;

    VALUES = [data.username, data.email, data.password];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.readLastUser = (callback) => {

    const SQLSTATEMENT = `
        SELECT * FROM User ORDER BY user_id DESC LIMIT 1;
    `;

    pool.query(SQLSTATEMENT, callback);
};


//////////////////////////////////////////////////////
// MODEL FOR CREATE
//////////////////////////////////////////////////////

//function to search if email already exists in user table for createNewUser controller in userController.js
module.exports.searchForCreate = (data, callback) => {
    // get all rows with email matching the email given in the request body
    const SQLSTATMENT = `
    SELECT * FROM user WHERE email = ?;
    `;
    const VALUES = [data.email];
    pool.query(SQLSTATMENT, VALUES, callback);
}

//function to create new user
module.exports.insertSingle = (data, callback) => {
    // add new row in user table with the given data, and get the row with the newly created user_id
    const SQLSTATMENT = `
    INSERT INTO user (username, email)
    VALUES (?, ?);
    SELECT * FROM user WHERE user_id = LAST_INSERT_ID();
    `;
    const VALUES = [data.username, data.email];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//////////////////////////////////////////////////////
// MODEL FOR READ
//////////////////////////////////////////////////////

// function to fetch all users
module.exports.selectAll = (callback) => {
    // get all rows from user table
    const SQLSTATMENT = `
    SELECT * FROM user;
    `;
    pool.query(SQLSTATMENT, callback);
}

//function to fetch user by id
module.exports.selectById = (data, callback) => {
    // get the row with user_id matching the id given in the request body
    const SQLSTATMENT = `
    SELECT * FROM user WHERE user_id = ?;
    SELECT SUM(points) as total_points FROM task WHERE task_id IN (SELECT task_id FROM taskprogress WHERE user_id = ?);
    `;
    const VALUES = [data.user_id, data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//function to fetch the number of users
module.exports.selectCount = (callback) => {
    // get row from game table with the given user_id
    const SQLSTATMENT = `
    SELECT COUNT(user_id) AS count FROM user;
    `;
    pool.query(SQLSTATMENT, callback);
}

//function to fetch user password by id
module.exports.selectPasswordById = (data, callback) => {
    // get the row with user_id matching the id given in the request body
    const SQLSTATMENT = `
    SELECT password FROM user WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// MODEL FOR UPDATE
//////////////////////////////////////////////////////

// function to search if username already exists in user table for updateUserById controller in userController.js
module.exports.searchForUpdateUsername = (data, callback) => {
    // get all rows with username matching the username given in the request body
    const SQLSTATMENT = `
    SELECT * FROM user WHERE username = ?;
    `;
    const VALUES = [data.username];
    pool.query(SQLSTATMENT, VALUES, callback);
}
// function to search if email already exists in user table for updateUserById controller in userController.js
module.exports.searchForUpdateEmail = (data, callback) => {
    // get all rows with email matching the email given in the request body
    const SQLSTATMENT = `
    SELECT * FROM user WHERE email = ?;
    `;
    const VALUES = [data.username];
    pool.query(SQLSTATMENT, VALUES, callback);
}

// function to update username by user_id
module.exports.updateUsernameById = (data, callback) => {
    // update the row with user_id matching the id given in the request body with the given username, and get the row with the given user_id
    const SQLSTATMENT = `
    UPDATE user SET username = ? WHERE user_id = ?;
    SELECT * FROM user WHERE user_id = ?;
    `;
    const VALUES = [data.username, data.user_id, data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

// function to update email by user_id
module.exports.updateEmailById = (data, callback) => {
    // update the row with user_id matching the id given in the request body with the given email, and get the row with the given user_id
    const SQLSTATMENT = `
    UPDATE user SET email = ? WHERE user_id = ?;
    SELECT * FROM user WHERE user_id = ?;
    `;
    const VALUES = [data.email, data.user_id, data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

// function to update password by user_id
module.exports.updatePasswordById = (data, callback) => {
    // update the row with user_id matching the id given in the request body with the given username, and get the row with the given user_id
    const SQLSTATMENT = `
    UPDATE user SET password = ? WHERE user_id = ?;
    SELECT * FROM user WHERE user_id = ?;
    `;
    const VALUES = [data.new_password, data.user_id, data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


//////////////////////////////////////////////////////
// MODEL FOR DELETE
//////////////////////////////////////////////////////

//function to delete user by id
module.exports.deleteById = (data, callback) => {
    // delete the row with user_id matching the id given in the request body, and reset the auto increment value
    const SQLSTATMENT = `
    DELETE FROM user 
    WHERE user_id = ?;

    ALTER TABLE user AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


