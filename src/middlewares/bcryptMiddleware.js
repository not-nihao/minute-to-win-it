/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: bcryptMiddleware.js
// Content: contains all controllers related to hashing
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULE
//////////////////////////////////////////////////////
const bcrypt = require("bcrypt");

//////////////////////////////////////////////////////
// SET SALT ROUNDS
//////////////////////////////////////////////////////
const saltRounds = 1;

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR COMPARING PASSWORD
//////////////////////////////////////////////////////
module.exports.comparePassword = (req, res, next) => {
    // Check password
    const callback = (err, isMatch) => {
      if (err) {
        console.error("Error bcrypt:", err);
        res.status(500).json(err);
      } else {
        if (isMatch) {
          next();
        } else {
          res.status(401).json({
            message: "Wrong password",
          });
        }
      }
    };
    bcrypt.compare(req.body.password, res.locals.hash, callback);
  };

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR HASHING PASSWORD
//////////////////////////////////////////////////////
module.exports.hashPassword = (req, res, next) => {
    const callback = (err, hash) => {
      if (err) {
        console.error("Error bcrypt:", err);
        res.status(500).json(err);
      } else {
        res.locals.hash = hash;
        next();
      }
    };
  
    bcrypt.hash(req.body.password, saltRounds, callback);
  };

module.exports.hashPasswordForUpdate = (req, res, next) => {
    const callback = (err, hash) => {
      if (err) {
        console.error("Error bcrypt:", err);
        res.status(500).json(err);
      } else {
        res.locals.hash = hash;
        next();
      }
    };
  
    bcrypt.hash(req.body.new_password, saltRounds, callback);
  };
