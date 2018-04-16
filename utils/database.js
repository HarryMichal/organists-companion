var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('./db/testdb.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err);
  };
});
  

module.exports = database
