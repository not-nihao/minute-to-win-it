/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: inventoryController.js
// Content: contains controllers that are part of the
// MVC for inventory related endpoints
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const model = require("../models/inventoryModel.js");   // import sql queries for inventory

//////////////////////////////////////////////////////
// CONTROLLER FOR CREATE
//////////////////////////////////////////////////////
//handle error & response in createNewItem
module.exports.createNewItem = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error createNewItem:", error);
            res.status(500).json(error);
        }
        else res.status(201).json(results[1][0]);   // return 201 with newly created item
    }
    const data = {
        name: req.body.name,
        count: req.body.count
    }

    model.insertSingle(data, callback);   // call the insertSingle function in inventoryModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR READ
//////////////////////////////////////////////////////
//handle error & response in readAllItems
module.exports.readAllItems = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error readAllItems:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results[0]);   // return 200 with all items
    }
    model.selectAll(callback);   // call the selectAll function in inventoryModel
}


//handle error & response in readItemById
module.exports.readItemById = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error readItemById:", error);
            res.status(500).json(error);
        }
        // if item_id does not exist return 404 with error invalid
        else if (results.length == 0) {   // results array will be empty if item_id does not exist in database
            res.status(404).json({
                Error: "Invalid inventory_id"
            });
        }
        else res.status(200).json(results[0]);   // return 200 with item
    }
    const data = {
        inventory_id: req.params.inventory_id
    }

    model.selectById(data, callback);   // call the selectById function in inventoryModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR UPDATE
//////////////////////////////////////////////////////
//handle error & response in buyItem
module.exports.useItem = (req, res, next) => {
    const data = {
        inventory_id: req.params.inventory_id
    }
switch (req.params.inventory_id) {
    case 1:
        const callback = (error, results, fields) => {
            if (error) {
                // if item is out of stock return 409 with error out of stock
                if (error.errno == 3819) {  // error.errno == 3819 if count column in inventory table is < 0
                    res.status(409).json({
                    Error: "Item all used up"
                    });
                }
                // if any unexpected error occurs return 500 with error
                else {
                    console.error("Error in UseItem:", error);
                    res.status(500).json(error);
                }
            }
            else {
                res.status(200).json(results[0]);  // return 200 with inventory table
            }

        }

        model.useStamina(data, callback);   // call the useStamina function in inventoryModel

        break;
    case 2:
        const callback1 = (error, results, fields) => {
            if (error) {
                // if item is out of stock return 409 with error out of stock
                if (error.errno == 3819) {  // error.errno == 3819 if count column in inventory table is < 0
                    res.status(409).json({
                    Error: "Item all used up"
                    });
                }
                // if any unexpected error occurs return 500 with error
                else {
                    console.error("Error in UseItem:", error);
                    res.status(500).json(error);
                }
            }
            else {
                res.status(200).json(results[0]);  // return 200 with inventory table
            }

        }

        model.useExperience(data, callback1);   // call the useExperience function in inventoryModel

        break;
}
}


//handle error & response in updateItemById
module.exports.updateItemById = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error updateItemById:", error);
            res.status(500).json(error);
        }
        // if item_id does not exist return 404 with error invalid
        else if (results[1].length == 0) {   // results[1] array will be empty if item_id does not exist in database
            res.status(404).json({
                Error: "Invalid inventory_id"
            });
        }
        else res.status(200).json(results[1][0]);   // return 200 with updated item
    }
    const data = {
        inventory_id: req.params.inventory_id,
        name: req.body.name,
        count: req.body.count
    }

    model.updateById(data, callback);   // call the updateById function in inventoryModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR DELETE
//////////////////////////////////////////////////////
//handle error & response in deleteItemById
module.exports.deleteItemById = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error deleteItemById:", error);
            res.status(500).json(error);
        }
        // if item_id does not exist return 404 with error invalid
        else if (results.affectedRows == 0) {   // results.affectedRows == 0 if item_id does not exist in database
            res.status(404).json({
                Error: "Invalid inventory_id"
            });
        }
        else res.status(200).json(results);   // return 200 with results
    }
    const data = {
        inventory_id: req.params.inventory_id
    }

    model.deleteById(data, callback);   // call the deleteById function in inventoryModel
}