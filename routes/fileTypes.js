"use strict" ; 

const express = require('express');

const router = express.Router();

const multer  = require('multer') ; 
// { dest: './public' }
const upload = multer() ;


const displayFileTypeController = require('../controllers/displayFileType') ; 
const uploadFileTypeController = require('../controllers/uploadFile') ; 

router.get('/txtfile',displayFileTypeController.txtFile) ;
router.get('/mdfile',displayFileTypeController.mdFile) ; 
router.get('/htmlfile',displayFileTypeController.htmlFile) ; 
router.get('/pdffile',displayFileTypeController.pdfFile) ; 
router.post('/upload',upload.none(), uploadFileTypeController.uploadFiles) ; 


module.exports = router;