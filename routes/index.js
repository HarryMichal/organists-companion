var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

gettest();

function gettest(req, res){
  var db = new sqlite3.Database('./db/testdb.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the testdb database.');
  });
db.each("SELECT rowid AS number, text FROM psalms", function(err, result, next){
  if(err){
    return console.error("Error running querry");
  };
  console.log(result.number + ': ' + result.text);
  var sql_output = result.number + ': ' + result.text;
});
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', psalms: sql_output});
  res.end();
});

module.exports = router;
