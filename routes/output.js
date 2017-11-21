var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('output', { title: 'Output', outputText: sql_output});
  res.end();
});

module.exports = router;
