/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: db.js
// Content: create a connection pool to mysql CA2 database
/* ==================================================== */

require('dotenv').config(); //read .env file and set environment variables

const postgre = require('@vercel/postgres');

const setting = {
    connectionLimit : 10, //set limit to 10 connection
    host     : process.env.POSTGRES_HOST, //get host from environment variable
    user     : process.env.POSTGRES_USER, //get user from environment variable
    password : process.env.POSTGRES_PASSWORD, //get password from environment variable
    database : process.env.POSTGRES_DATABASE, //get database from environment variable
    multipleStatements: true, //allow multiple sql statements
    dateStrings: true, //return date as string instead of Date object
    ssl: {
        rejectUnauthorized: (process.env.DB_SSL_REJECT_AUTHORISE=="true")  // Set to `true` to enforce server certificate verification
    }
}

const pool = postgre.createPool(setting);

module.exports = pool;