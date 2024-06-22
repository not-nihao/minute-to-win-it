/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: shopController.js
// Content: contains controllers that are part of the
// MVC for shop related endpoints
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////

const model = require("../models/shopModel.js");   // import sql queries for shop

//////////////////////////////////////////////////////
// CONTROLLER FOR BUYING ITEMS
//////////////////////////////////////////////////////
//handle error & response in check function used in buyItem
module.exports.checkForBuy = (req, res, next) => {
    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error search in db:", error);
            res.status(500).json(error);
        }
        // if item_id does not exist return 409 with error invalid
        else if (results[0].length == 0) {   // results array will not be empty if item_id exists in database
            res.status(404).json({
                Error: "Invalid item_id"
            });
        }
        // if player does not have enough points return 409 with error not enough points
        else if (results[1][0].points < results[0][0].price) {  // results[1][0].points is the points of the player, results[0][0].price is the price of the item
            res.status(409).json({
                Error: "Not enough points"
            });
        }
        else {
            next();   // if item_id exists and player has enough points, proceed to buyItem
        }

    }
    const data = {
        item_id: req.params.item_id
    }

    model.checkForBuy(data, callback);   // call the checkForBuy function in shopModel
}


//handle error & response in buyItem
module.exports.buyItem = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            // if item is out of stock return 409 with error out of stock
            if (error.errno == 3819) {  // error.errno == 3819 if remaining column in shop table is < 0
                res.status(409).json({
                    Error: "Item out of stock"
                });
            }
            // if any unexpected error occurs return 500 with error
            else {
                console.error("Error in buyItem:", error);
                res.status(500).json(error);
            }
        }
        else {
            res.status(200).json({
                Message: "Item purchased"
            });
        }

    }
    const data = {
        item_id: req.params.item_id
    }

    model.buyItem(data, callback);   // call the buyItem function in shopModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR CREATE
//////////////////////////////////////////////////////
//handle error & response in createNewItem
module.exports.createNewItem = (req, res, next) => {
    // if req body does not have name or description or price return 400 with error undefined
    if (!(req.body.name && req.body.description && req.body.price)) {
        res.status(400).json({
            Error: "name or description or price is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error createNewItem:", error);
            res.status(500).json(error);
        }
        else {
            res.status(201).json(results[1][0]);   // return 201 with the newly created item ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    }

    model.insertSingle(data, callback);   // call the insertSingle function in shopModel
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
        else res.status(200).json(results);   // return 200 with all items
    }
    model.selectAll(callback);   // call the selectAll function in shopModel
}

//////////////////////////////////////////////////////
// CONTROLLER FOR UPDATE
//////////////////////////////////////////////////////
//handle error & response in updateItemById
module.exports.updateItemById = (req, res, next) => {
    // if req body does not have name or description or price or remaining return 400 with error undefined
    if (!(req.body.name && req.body.description && req.body.price && req.body.remaining)) {
        res.status(400).json({
            Error: "name or description or price or remaining is undefined"
        });
        return;
    }

    const callback = (error, results, fields) => {
        // if any unexpected error occurs return 500 with error
        if (error) {
            console.error("Error updateItemById:", error);
            res.status(500).json(error);
        } else {
            // if item_id does not exist return 404 with error does not exist
            if (results[0].affectedRows == 0) {   // since this is an update endpoint, number of affectedRows will be 0 only if nothing was updated, indicating that item_id does not exist
                res.status(404).json({
                    Error: "Item not found"
                });
            }
            else res.status(200).json(results[1][0]);   // return 200 with the updated item ([0] to get rid of square bracket in response)
        }
    }

    const data = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        remaining: req.body.remaining,
        item_id: req.params.item_id
    }

    model.updateById(data, callback);   // call the updateById function in shopModel
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
        } else {
            // if item_id does not exist return 404 with error does not exist
            if (results[0].affectedRows == 0) {   // since this is a delete endpoint, number of affectedRows will be 0 only if nothing was deleted, indicating that item_id does not exist
                res.status(404).json({
                    Error: "Item not found"
                });
            }
            else res.status(204).send();   // return 204 with no content (send instead of json because there's no response body)
        }
    }
    const data = {
        item_id: req.params.item_id
    }

    model.deleteById(data, callback);   // call the deleteById function in shopModel
}