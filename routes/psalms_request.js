var express = require('express');
var router = express.Router();

router.get('/api/data/psalms', (req, res) => {
  // connect to the test database
  var db = new sqlite3.Database('./db/testdb.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    };
    console.log('API - Connected to the testdb database.');
  });

  db.each("SELECT number, text FROM psalms", function(err, result, next){
    if(err){
      return console.error("Error running querry");
    };
    let psalm = result.text;
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('API - Closed the database connection.');
  });
});

module.exports = router;
