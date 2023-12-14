"use strict";

const path = require('path');
const { readFile, writeFile } = require('node:fs/promises');
const showdown = require('showdown');

const puppeteer = require('puppeteer');

const fP = require('../config/properties') ; 

exports.mdFile = (req, res, next) => {
    try {
        res.sendFile(fP.mdFile);
        } catch (err) {
        console.error(err.message);
        res.json({
            status: 500,
            message: err.message
        })
    }
}

exports.htmlFile = async (req, res) => {
    try {
        console.log("reading md file ")
        console.log(fP.mdFile)
        const mdData = await readFile(fP.mdFile, { encoding: 'utf8' });
        console.log("converting  md to html file");
        const converter = new showdown.Converter();
        const mainHtml = converter.makeHtml(mdData);
        console.log("Writing HTML File");
        await writeFile(fP.htmlFile, fP.htmlBeg + mainHtml + fP.htmlEnd);
        res.sendFile(fP.htmlFile);
    } catch (err) {
        console.error(err.message);
        res.json({
            status: 500,
            message: err.message
        })

    }
}

exports.pdfFile = async (req, res, next) => {
    try {
        // Create a browser instance
        const browser = await puppeteer.launch({ headless: "new" });
        // Create a new page
        const page = await browser.newPage();
        const website_url = fP.localUrl;
        // Open URL in current page
        await page.goto(website_url, { waitUntil: 'networkidle0' });
        //To reflect CSS used for screens instead of print
        await page.emulateMediaType('screen');
        const footerTemplate = fP.pdfFooter 

        const pdf = await page.pdf({
            format: "Letter",
            path: fP.pdfFile,
            displayHeaderFooter: true,
            margin: {
                top: 30,
                left: 40,
                right: 20,
                bottom: 60
            },
            footerTemplate: footerTemplate,
            headerTemplate: "/",
            scale: .78,
            printBackground: true
        });

        // Close the browser instance
        await browser.close();
        res.sendFile(fP.pdfFile);
        
    } catch (err) {
        console.error(err.message);
        res.json({
            status: 500,
            message: err.message
        })
    }

}


exports.txtFile = async (req, res, next) => {
    try {
        const fileString = await readFile(fP.txtFile, { encoding: 'utf8' });
        console.log(fileString)
        res.json({body: fileString});
    } catch (err) {
        console.error(err.message);
        res.json({
            status: 500,
            message: err.message
        })
    }
}
