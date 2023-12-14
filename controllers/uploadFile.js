
"use strict" ; 
const path = require('path');
const { writeFile } = require('node:fs/promises');

const fP = require('../config/properties') ; 

exports.uploadFiles = async (req, res) => {

    try {
        const requestBody = req.body;
        await writeFile(fP.mdFile, requestBody['mdFile']);
        res.json({
            status: 200,
            message: "OK"
        })
        /*
        Object.keys(requestBody).forEach( async key => {
            let fileName = key ;
            console.log(fileName) ; 
            let content = requestBody[key] ;
            console.log(content) ; 
            await writeFile(fP.txtFile, content);
            res.json({
                status: 200,
                message: "OK"
            })
        });
        */ 
    }
    catch (err) {
        console.error(err.message);
        res.json({
            status: 500,
            message: "did not save file"
        })
    }

}

