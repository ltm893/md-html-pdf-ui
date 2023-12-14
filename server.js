"use strict" ; 
const path = require('path');
const express = require("express");
 
const bodyParser = require('body-parser') ;

const fileTypeRoutes = require('./routes/fileTypes') ;

const PORT = process.env.PORT || 3000 ; 
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()) ; 
// app.use(express.static(path.join(__dirname,'public')));
app.use(express.static('public'));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

/*
app.post('/upload', upload.none() , function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 
  const requestBody = req.body
  console.log(requestBody)
  const stringValue = requestBody['rawTextName']
  //   rawTextName: 'bcvnbvncvncvnbcvnbcvnbcvnbcvnb'
  console.log(stringValue)
});
*/



app.use('/',fileTypeRoutes) ; 

app.use((req, res, next ) => {
  res.status(404).send('<h1>Page not Found</h1>') ; 
}) ; 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});