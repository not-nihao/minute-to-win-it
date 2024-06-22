/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: userController.js
// Content: contains controllers that are part of the
// MVC for user related endpoints
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////

const model = require("../models/userModel.js");   // import sql queries for users

//////////////////////////////////////////////////////
// CONTROLLER FOR REGISTER
//////////////////////////////////////////////////////
module.exports.checkUsernameOrEmailExist = (req, res, next) => {
    try {
        const requiredFields = ['username', 'email'];

        for (const field of requiredFields) {
            if (req.body[field] === undefined || req.body[field] === "") {
                res.status(400).json({ message: `${field} is undefined or empty` });
                return;
            }
        };
    
        const data = {
            email: req.body.email,
            username: req.body.username
        };

        const callback = (error, results) => {
            if(error){
                console.error("Error readUserByEmailAndUsername callback: ", error);
                res.status(500).json(error);
            } else {
                if(results[1].length != 0 || results[0].length != 0){
                    res.status(409).json({message: "Username or email already exists"});
                } else {
                    next();
                }
            }
        };

        model.readUserByEmailAndUsername(data, callback);

    } catch (error) {
        console.error("Error readUserByEmailAndUsername: ", error);
        res.status(500).json(error);
    }

};

module.exports.register = (req, res, next) => {
        try { 
            const data = {
                email: req.body.email,
                username: req.body.username,
                password: res.locals.hash
            };
    
            const callback = (error, results) => {
                if(error){
                    console.error("Error register callback: ", error);
                    res.status(500).json(error);
                } else {
                    res.locals.userId = results.insertId
                    res.locals.username = req.body.username
                    //res.status(200).json({message: "Registration successful!"}); 
                    next();
                }
            };
    
            model.register(data, callback);
    
        } catch (error) {
            console.error("Error register: ", error);
            res.status(500).json(error);
        }
};

module.exports.readLastUser = (req, res) => {
    try {
        
        const callback = (error, results) => {
            if(error){
                console.error("Error: readLastUser callback:", error);
                res.status(500).json(error);
            } else {
                res.status(200).json({message: `User ${results[0].username} created successfully.`})
            }
        };

        model.readLastUser(callback);

    } catch (error) {
        console.error("Error: readLastUser:", error);
        res.status(500).json(error);
    }
}

//////////////////////////////////////////////////////
// CONTROLLER FOR LOGIN
//////////////////////////////////////////////////////
module.exports.login = (req, res, next) => {
    try { 
            const requiredFields = ['email', 'password'];
            for (const field of requiredFields) {
                if (req.body[field] === undefined || req.body[field] === "") {
                    res.status(400).json({ message: `${field} is undefined or empty` });
                    return;
                }
            };

        const data = {
            email: req.body.email,
            password: res.locals.hash
        };

        const callback = (error, results) => {
            if(error){
                console.error("Error login callback: ", error);
                res.status(500).json(error);
            } else {
                if(results.length == 0){
                    res.status(404).json({message: "User not found"});
                } else {
                    res.locals.userId = results[0].user_id
                    res.locals.username = results[0].username
                    res.locals.hash = results[0].password
                    next();
                }
            }
        };

        model.login(data, callback);

    } catch (error) {
        console.error("Error login: ", error);
        res.status(500).json(error);
    }
};

//////////////////////////////////////////////////////
// CONTROLLER FOR CREATE
//////////////////////////////////////////////////////
//handle error & response in search function used in createNewUser
module.exports.searchForCreate = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if req body does not have username or email return 400 with error undefined
        if (error) {
            console.error("Error search in db:", error);
            res.status(500).json(error);
        }
        // if email already exists return 409 with error already exists
        else if (results.length !== 0) {   // results array will not be empty if email already exists in database
            res.status(409).json({
                Error: "email already exists"
            });
        }
        else {
            next();   // if email does not exist, proceed to createNewUser
        }

    }
    const data = {
        email: req.body.email
    }

    model.searchForCreate(data, callback);   // call the searchForCreate function in userModel
}


//handle error & response in createNewUser
module.exports.createNewUser = (req, res, next) => {
    // if req body does not have username or email return 400 with error undefined
    if (!(req.body.username && req.body.email)) {
        res.status(400).json({
            Error: "username or email is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error);
        }
        else {
            res.status(201).json(results[1][0]);   // return 201 with the newly created user ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
    }

    model.insertSingle(data, callback);   // call the insertSingle function in userModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR READ
//////////////////////////////////////////////////////
//handle error & response in readAllUsers
module.exports.readAllUsers = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error readAllUsers:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);   // return 200 with all users
    }
    model.selectAll(callback);   // call the selectAll function in userModel
}


//handle error & response in readUserById
module.exports.readUserById = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            // if user_id does not exist return 404 with error does not exist
            if (results[0].length == 0) {   // results[0] array will not be empty if user_id exists in the database
                res.status(404).json({
                    Error: "User not found"
                });
            }
            // if user_id exists, return 200 with the specific user and the total number of points earned by the user
            else {
                res.status(200).json(results[0].concat(results[1]).reduce((a, b) => Object.assign(a, b), {}));   // results[0] is an array of 1 object that contains the user details, results[1] is another array of 1 object that contains the total points; concat to get 1 array of 2 objects, then reduce to get 1 object
            }
        }
    }

    const data = {
        user_id: req.params.user_id
    }

    model.selectById(data, callback);   // call the selectById function in userModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR UPDATE
//////////////////////////////////////////////////////
//handle error & response in search function used in updateUserById
module.exports.searchForUpdateUsername = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error search in db:", error);
            res.status(500).json(error);
        }
        // if username or email already exists return 409 with error already exists
        else if (results.length !== 0) {   // results[0] array will not be empty if username already exists in database
            res.status(409).json({
                message: "username already taken"
            });
            return;
        }
        else {
            next();   // if username do not exist, proceed to updateUsernameById
        }

    }
    const data = {
        username: req.body.username,
    }

    model.searchForUpdateUsername(data, callback);   // call the searchForUpdateUsername function in userModel
}



//handle error & response in search function used in updateUserById
module.exports.searchForUpdateEmail = (req, res, next) => {
    if (!req.body.email) {
        res.status(400).json({
            message: "email is undefined"
        });
        return;
    }
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error search in db:", error);
            res.status(500).json(error);
        }
        // if username or email already exists return 409 with error already exists
        else if (results.length !== 0) {   // results[0] array will not be empty if username already exists in database
            res.status(409).json({
                message: "Email already taken"
            });
            return;
        }
        else {
            next();   // if email do not exist, proceed to updateEmailById
        }

    }
    const data = {
        email: req.body.email
        }

    model.searchForUpdateEmail(data, callback);   // call the searchForUpdateEmail function in userModel
}


//handle error & response in updateUserById
module.exports.updateUsernameById = (req, res, next) => {

    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            // if user_id does not exist return 404 with error does not exist
            if (results[0].affectedRows == 0) {   // since this is an update endpoint, number of affectedRows will be 0 only if nothing was updated, indicating that user_id does not exist
                res.status(404).json({
                    message: "Please login/register to change username"
                });
            }
            else res.status(200).json(results[1][0]);   // return 200 with the updated user ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        user_id: req.params.user_id,
        username: req.body.username
    }

    model.updateUsernameById(data, callback);   // call the updateById function in userModel
}


//handle error & response in updateUserById
module.exports.updateEmailById = (req, res, next) => {

    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            // if user_id does not exist return 404 with error does not exist
            if (results[0].affectedRows == 0) {   // since this is an update endpoint, number of affectedRows will be 0 only if nothing was updated, indicating that user_id does not exist
                res.status(404).json({
                    message: "Please login/register to change email"
                });
            }
            else res.status(200).json(results[1][0]);   // return 200 with the updated user ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        user_id: req.params.user_id,
        email: req.body.email
    }

    model.updateEmailById(data, callback);   // call the updateById function in userModel
}

//handle error & response in updatePasswordById
module.exports.updatePasswordById = (req, res, next) => {

    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            // if user_id does not exist return 404 with error does not exist
            if (results[0].affectedRows == 0) {   // since this is an update endpoint, number of affectedRows will be 0 only if nothing was updated, indicating that user_id does not exist
                res.status(404).json({
                    message: "Please login/register to change password"
                });
            }
            else res.status(200).json(results[1][0]);   // return 200 with the updated user ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        user_id: req.params.user_id,
        new_password: res.locals.hash
    }

    model.updatePasswordById(data, callback);   // call the updateById function in userModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR DELETE
//////////////////////////////////////////////////////
// handle error & response in readUserPassword
module.exports.readUserPassword = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserPassword:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0 || req.params.user_id == null) {
                res.status(404).json({
                    message: "User not found"
                });
            } else {
                res.locals.hash = results[0].password;
                next();
            }
        }
    }
    const data = {
        user_id: req.params.user_id
    }
    model.selectPasswordById(data, callback);
};


//handle error & response in deleteUserById
module.exports.deleteUserById = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error deleteUserById:", error);
            res.status(500).json(error);
        } else {
            res.status(204).send();   // return 204 with no content (send instead of json because there's no response body)
        }
    }
    const data = {
        user_id: req.params.user_id
    }

    model.deleteById(data, callback);   // call the deleteById function in userModel
}