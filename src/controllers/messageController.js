/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: messageController.js
// Content: contains controllers that are part of the
// MVC for message related endpoints
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////

const model = require("../models/messageModel.js");   // import sql queries for messages

//////////////////////////////////////////////////////
// CONTROLLER FOR CREATE
//////////////////////////////////////////////////////

module.exports.createMessage = (req, res, next) => {
    if(req.body.message_text == undefined || req.body.message_text == "")
    {
        res.status(400).json({message: "message field is empty"});
        return;
    }
    else if(req.body.user_id == undefined)
    {
        res.status(400).json({message: "please login/register to send messages"});
        return;
    }

    const data = {
        user_id: req.body.user_id,
        message_text: req.body.message_text
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }

    model.insertSingle(data, callback);
}


//////////////////////////////////////////////////////
// CONTROLLER FOR READ
//////////////////////////////////////////////////////

module.exports.readAllMessage = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
            }
    }

    model.selectAll(callback);
}

module.exports.readMessageById = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readMessageById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Message not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

module.exports.readIdByTimestamp = (req, res, next) => {
    const data = {
        timestamp: req.body.timestamp
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readIdByTimestamp:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Message not found"
                });
            }
            else {
                res.locals.messageId = results[0].message_id;
                next();}
        }
    }

    model.selectIdByTimestamp(data, callback);

}


//////////////////////////////////////////////////////
// CONTROLLER FOR UPDATE
//////////////////////////////////////////////////////

module.exports.updateMessageById = (req, res, next) => {
    if(req.params.id == undefined)
    {
        res.status(400).send("Error: id is undefined");
        return;
    }
    else if(req.body.message_text == undefined || req.body.message_text == "")
    {
        res.status(400).send("Error: message_text is undefined or empty");
        return;
    }
    else if(req.body.user_id == undefined)
    {
        res.status(400).send("Error: userId is undefined");
        return;
    }

    const data = {
        id: req.params.id,
        user_id: req.body.user_id,
        message_text: req.body.message_text
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateMessageById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.updateById(data, callback);
}


//////////////////////////////////////////////////////
// CONTROLLER FOR DELETE
//////////////////////////////////////////////////////

module.exports.deleteMessageById = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteMessageById:", error);
            res.status(500).json(error);
        } else {
            console.log("results", results);
            res.status(204).send();
        }
    }

    model.deleteById(data, callback);
}