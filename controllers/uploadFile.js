
"use strict" ; 
const path = require('path');

const fileConverters = require("../utils/fileConverters");
// const { restart } = require('nodemon');

exports.uploadFiles = (req, res) => {

    try {
        const requestBody = req.body;
        Object.keys(requestBody).forEach(key => {
            console.log(key)
            console.log(requestBody[key])
            if (fileConverters.saveFile(key, requestBody[key] === false)) {
                res.json({
                    status: 500,
                    message: "did not save file"
                })
            }
        });
        res.json({
            status: 200,
            message: "OK"
        })
    }
    catch (err) {
        console.error(err.message);
        res.json({
            status: 500,
            message: "did not save file"
        })
    }

}

