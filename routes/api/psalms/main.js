var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3');

// ---------------------------------------------------

/*
 API/psalms/list
*/

router.post('/list', function(req, res, next) {
  var db = new sqlite3.Database('./db/testdb.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the testdb database.');
  });
  console.log("API/psalms/list POST - API call showing list of psalms or requested psalms");
  res.send();
});

/*
 API/psalms/
*/

router.post('/', function(req, res) {
  console.log("POST API/psalms/");
  res.send("root of API calls regarding psalms");
});

module.exports = router;
