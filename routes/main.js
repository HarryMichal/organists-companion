var express = require('express');
var router = express.Router();
var psalms = require("./public/data/psalms.json");
var bodyParse = require('body-parser');
var sqlite3 = require('sqlite3');

/* GET main page. */
router.get('/', function(req, res, next) {
  res.render('Main', { title: 'Main' });
  });

module.exports = router;
