"use strict";

const path = require('path');
const { readFile, writeFile } = require('node:fs/promises');
const showdown = require('showdown');

const puppeteer = require('puppeteer');

const fP = require('../config/properties') ; 


const fileConverters = require("../utils/fileConverters");



const filePathObj = {
    mdFile: path.join(__dirname, '../public/markdownFile.md'),
    htmlFile: path.join(__dirname, '../public/htmlFile.html'),
    pdfFile: path.join(__dirname, '../public/pdfFile.pdf'),
    cssFile: path.join(__dirname, '../public/cssFile.html'),
}

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
        console.log(filePathObj['mdFile'])
        const mdData = await readFile(fP.mdFile, { encoding: 'utf8' });
        console.log("converting  md to html file");
        const converter = new showdown.Converter();
        const mainHtml = converter.makeHtml(mdData);
        console.log("Writing HTML File");
        await writeFile(filePathObj['htmlFile'], fileConverters.htmlBeg + mainHtml + fileConverters.htmlEnd);
        res.sendFile(path.join(filePathObj['htmlFile']));
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
        const website_url = 'http://localhost:3000/htmlFile.html';
        // Open URL in current page
        await page.goto(website_url, { waitUntil: 'networkidle0' });
        //To reflect CSS used for screens instead of print
        await page.emulateMediaType('screen');
        const footerTemplate = `<div style="margin: 0 2cm; width: 75%; font-size: 9px; text-align: center;">https://dliv.com/ltmelchiorre.pdf</div>`;

        const pdf = await page.pdf({
            format: "Letter",
            path: filePathObj['pdfFile'],
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
        res.sendFile(filePathObj['pdfFile']);
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
        console.log(fP.txtFile)
        res.json(fP.txtFile);
    } catch (err) {
        console.error(err.message);
        res.json({
            status: 500,
            message: err.message
        })
    }
}
