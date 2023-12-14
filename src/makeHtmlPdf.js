const fs = require('fs')
// const { mdToPdf } = require('md-to-pdf');
const showdown = require('showdown') ; 

const mdFile = './resume.md' ; 
const htmlFile = './ltmelchiorre.html' ; 
const pdfFile = './ltmelchiorre.pdf' ;
const mdText = fs.readFileSync(mdFile).toString()
const webServerFile = '/home/ltm893/projects/webServer/public/index.html' ; 
const webServerCssFile = '/home/ltm893/projects/webServer/public/resume.css' ; 

const htmlBeg = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Louis T. Melchiorre Resume</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="description" content="" />
  <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
  <link href='resume.css' rel='stylesheet' type='text/css'>
</head>
<body>` ; 

const converter      = new showdown.Converter() ; 
const htmlResume       = converter.makeHtml(mdText);

const htmlEnd = `</body>
</html>` ; 


fs.writeFile(htmlFile, htmlBeg + htmlResume + htmlEnd, function (err) {
    if (err) throw err;
    console.log('Saved!');
    fs.copyFile('/home/ltm893/projects/resume/ltmelchiorre.html', webServerFile, (err) => {
      if (err) {
        console.log("Error Found:", err);
      }
      else {
        console.log("\n html file copied") ; 
      }
    }) ; 
    fs.copyFile('/home/ltm893/projects/resume/resume.css', webServerCssFile, (err) => {
      if (err) {
        console.log("Error Found:", err);
      }
      else {
        console.log("\n css filed copied") ; 
        makePdf() ; 
      }
    }) ; 
  });



const puppeteer = require('puppeteer');

const makePdf = async  () => {

  // Create a browser instance
  const browser = await puppeteer.launch({headless: "new"});


  // Create a new page
  const page = await browser.newPage();


  const website_url = 'http://localhost:3000/' ; 

  // Open URL in current page
  await page.goto(website_url, { waitUntil: 'networkidle0' }); 

  //To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');


  const footerTemplate = `<div style="margin: 0 2cm; width: 75%; font-size: 9px; text-align: center;">https://dliv.com/ltmelchiorre.pdf</div>`;


const pdf = await page.pdf({
  format : "Letter",  
  path: pdfFile ,
  displayHeaderFooter : true ,
  margin: { 
    top: 30, 
    left: 40,
    right: 20,
    bottom: 60 
  },
  footerTemplate: footerTemplate,
  headerTemplate : "/",
  scale: .78 , 
  printBackground: true
  });

/*
  headerTemplate : "/",
  footerTemplate: footerTemplate, 
  margin: { top: 80, bottom: 80 },
*/


  // Close the browser instance
  await browser.close();
};