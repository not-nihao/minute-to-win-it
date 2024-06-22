/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: taskController.js
// Content: contains controllers that are part of the
// MVC for task related endpoints
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////

const { title } = require("process");
const model = require("../models/taskModel.js");   // import sql queries for tasks
const { count } = require("console");

//////////////////////////////////////////////////////
// CONTROLLER FOR CREATE
//////////////////////////////////////////////////////
//handle error and response in createNewTask
module.exports.createNewTask = (req, res, next) => {
    // if req body does not have title or description or points return 400 with error undefined
    if (!(req.body.title && req.body.description && req.body.points)) {
        res.status(400).json({
            Error: "title or description or points is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error createNewTask:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results[1][0]);    // return 201 with the newly created task ([0] to get rid of square brackets in response)
        }
    }

    const data = {
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    model.insertSingle(data, callback);   // call the insertSingle function in taskModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR READ
//////////////////////////////////////////////////////
//handle error & response in readAllTasks
module.exports.readAllTasks = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error readAllTasks:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);   // return 200 with all tasks
    }
    model.selectAll(callback);
}


//check for error in readTaskById
module.exports.readTaskById = (req, res, next) => {

    const callback = (error, results, fields) => {
        console.log("results:", results);
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error);
        } else {
            // if task_id does not exist return 404 with error does not exist
            if (results.length == 0) {   // results array will not be empty if task_id exists
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else {
                const data_new = {
                    task_id: req.params.task_id,
                    title: results[0].title,
                    description: results[0].description,
                    completed_on: res.locals.completion_date,
                    count: res.locals.count
                }
                res.status(200).json(data_new);
            }   // return 200 with the specific task
        }
    }

    const data = {
        task_id: req.params.task_id,
    }

    model.selectById(data, callback);   // call the selectById function in taskModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR UPDATE
//////////////////////////////////////////////////////
//callback to check for error in updateTaskById
module.exports.updateTaskById = (req, res, next) => {
    // if req body does not have title or description or points return 400 with error undefined
    if (!(req.body.title && req.body.description && req.body.points)) {
        res.status(400).json({
            Error: "title or description or points is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error updateTaskById:", error);
            res.status(500).json(error);
        } else {
            // if task_id does not exist return 404 with error does not exist
            if (results[0].affectedRows == 0) {   // since this is an update endpoint, number of affectedRows will be 0 only if nothing was updated, indicating that task_id does not exist
                res.status(404).json({
                    Error: "Task not found"
                });
            }
            else res.status(200).json(results[1][0]);   // return 200 with the updated task ([0] to get rid of square brackets in response)
        }
    }

    const data = {
        task_id: req.params.task_id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    model.updateById(data, callback);   // call the updateById function in taskModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR DELETE
//////////////////////////////////////////////////////
//callback to check for error in deleteTaskById
module.exports.deleteTaskById = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error deleteTaskById:", error);
            res.status(500).json(error);
        } else {
            // if task_id does not exist return 404 with error does not exist
            if (results[0].affectedRows == 0) {   // since this is a delete endpoint, number of affectedRows will be 0 only if nothing was deleted, indicating that task_id does not exist
                res.status(404).json({
                    Error: "Task not found"
                });
            }
            else res.status(204).send();   // return 204 with no content (send instead of json because there's no response body)
        }
    }
    const data = {
        task_id: req.params.task_id
    }

    model.deleteById(data, callback);   // call the deleteById function in taskModel
}