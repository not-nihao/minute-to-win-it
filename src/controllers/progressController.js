/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: progressController.js
// Content: contains controllers that are part of the
// MVC for task_progress related endpoints
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////

const model = require("../models/progressModel.js");   // import sql queries for task_progress

//////////////////////////////////////////////////////
// CONTROLLER FOR CREATE
//////////////////////////////////////////////////////

//handle error & response in search function used in createNewProgress
module.exports.searchForCreate = (req, res, next) => {
    const callback = (error, results, fields) => {
        const requiredFields = ['user_id', 'task_id'];

        for (const field of requiredFields) {
            if (req.body[field] === undefined || req.body[field] === "") {
                res.status(400).json({ message: `${field} is undefined or empty` });
                return;
            }
        }
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error search in db:", error);
            res.status(500).json(error);
            return;
        }
        else {
            // if user_id or task_id does not exist return 404 with error does not exist
            if (results[0].length == 0) {   // results[0] will not be empty if user_id exists
                res.status(404).json({
                    message: "Please login/register before accepting task"
                });
                return;
            }
            else if (results[1].length == 0) {   // results[1] will not be empty if task_id exists
                res.status(404).json({
                    message: "Task not found"
                });
                return;
            }
            else {
                next()    // if user_id and task_id exist, proceed to createNewProgress
            }
        }

    }
    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id
    }

    model.searchForCreate(data, callback);   // call the searchForCreate function in progressModel
}


//handle error & response in createNewProgress
module.exports.createNewProgress = (req, res, back) => {

    const callback = (error, results, fields) => {
        if (error) {
            // if any unexpected error occurs return 500 with error
            console.error("Error createNewProgress:", error);
            res.status(500).json(error);
        }
        else {
            res.status(201).json(results[1][0]);   // return 201 with the newly created progress ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id
    }

    model.insertSingle(data, callback);   // call the insertSingle function in progressModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR READ
//////////////////////////////////////////////////////
//handle error & response in readProgressById
module.exports.readProgressById = (req, res, next) => {
    
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error readProgressById:", error);
            res.status(500).json(error);
        } 
        else if (results.length == 0) {    // results array will not be empty if user_id exists
            res.status(404).json({
                message: "No tasks found"
            });
        }
        else {
         res.status(200).json(results);    // return 200 with the total number of tasks completed by the user
        }
    }

    const data = {
        user_id: req.params.user_id
    }

    if (!req.params.user_id) {
        res.status(400).json({
            message: "Login/Register to view all community tasks"
        });
        return;
    }
    else{
    model.selectById(data, callback);   // call the selectById function in progressModel
    }
}

//handle error & response in getCountById
module.exports.getCountById = (req, res, next) => {
    const callback = (error, results, fields) => {
        console.log("count:", results);
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error getCountById:", error);
            res.status(500).json(error);
        } else {
            res.locals.count = results[0].count
            next()  // forward the count to the next controller
        }
    }
    data = {
        task_id: req.params.task_id
    }
    model.getCountById(data, callback);   // call the getCountById function in progressModel
}

//handle error & response in getCountById
module.exports.getDateById = (req, res, next) => {
    const callback = (error, results, fields) => {
        console.log("count:", results);
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error getCountById:", error);
            res.status(500).json(error);
        } else {
            res.locals.completion_date = results[0].completion_date
            next()  // forward the count to the next controller
        }
    }
    data = {
        task_id: req.params.task_id
    }
    model.getDateById(data, callback);   // call the getCountById function in progressModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR UPDATE
//////////////////////////////////////////////////////
//handle error & response in updateProgressById
module.exports.updateProgressById = (req, res, next) => {

    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error updatePlayerById:", error);
            res.status(500).json(error);
        } else {
            // if progress_id does not exist return 404 with error does not exist
            if (results[0].affectedRows == 0) {   // since this is an update endpoint, number of affectedRows will be 0 only if nothing was updated, indicating that progress_id does not exist
                res.status(404).json({
                    Error: "progress not found"
                });
            }
            // if notes is undefined return 400 with error undefined
            else if (!(req.body.notes)) {
                res.status(400).json({
                    Error: "notes is undefined"
                });
                return;
            }
            else res.status(200).json(results[1][0]);   // return 200 with the updated progress ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        notes: req.body.notes,
        progress_id: req.params.progress_id
    }

    model.updateById(data, callback);   // call the updateById function in progressModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR DELETE
//////////////////////////////////////////////////////
//handle error & response in deleteProgressById
module.exports.deleteProgressById = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error deleteProgressById:", error);
            res.status(500).json(error);
        } else {
            // if progress_id does not exist return 404 with error does not exist
            if (results[0].affectedRows == 0) {   // since this is a delete endpoint, number of affectedRows will be 0 only if nothing was deleted, indicating that progress_id does not exist
                res.status(404).json({
                    Error: "progress not found"
                });
            }
            else res.status(204).send();   // return 204 with no content (send instead of json because there's no response body)
        }
    }
    const data = {
        progress_id: req.params.progress_id
    }

    model.deleteById(data, callback);   // call the deleteById function in progressModel
}