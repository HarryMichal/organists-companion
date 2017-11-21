var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3');

router.get('/', function(req, res, next) {
  var db = new sqlite3.Database('./db/testdb.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    };
    console.log('API - Connected to the testdb database.');
  });

  var psalms_ready = db.each("SELECT id, text FROM psalms ORDER BY id", function(err, result){
    if(err){
      return console.error("Error querrying entry");
    };
    console.log('API OUTPUT: ' + result.id + ": " + result.text);
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('API - Closed the database connection.');
  });
  res.end();
});

module.exports = router;
