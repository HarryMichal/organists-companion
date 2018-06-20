'use strict';

var sqlite3 = require('sqlite3');

var database = new sqlite3.Database('./db/testdb.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err);
  };
});

module.exports.select = function(items, source, search, searched, callback) {
  database.get(`SELECT ${items} FROM ${source} WHERE ${search} = ?`, [searched], function(err, result) {
    if (err) {
      callback(err, null);
    }
    if (result) {
      callback(null, result);
    }
  })
};

module.exports.update = function(destination, items, search, searched, callback) {
  database.run(`UPDATE ${destination} SET ${items} WHERE ${search}`, searched, function(err) {
    if (err) {
      callback(err, null);
    }
    if (this.changes) {
      callback(null, this.changes);
    }
  });
};
