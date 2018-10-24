'use strict';

var sqlite3 = require('sqlite3');

var database = new sqlite3.Database('./db/database.db', sqlite3.OPEN_READWRITE, (err) => {
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

module.exports.insert = function(destination, columns, values, callback) {
  var placeholders = values.map((value) => '?').join(',');
  
  database.run(`INSERT INTO ${destination} (${columns}) values (${placeholders})`, function(err) {
    if (err) {
      callback(err, null);
    }
    if (this.changes) {
      callback(null, this.changes);
    }
  });
}
module.exports.selectAll = function(item, source, orderBy) {
  var result = [];
  return new Promise((resolve, reject) => {
    database.all(`SELECT ${item} FROM ${source} ORDER BY ${orderBy}`, [], (err, rows) => {
      if (err) {
        reject(err);
      }
      if (rows) {
        resolve(rows);
      }
    });
  })
}

module.exports.selectPromise = function(items, source, search, searched) {
  return new Promise(function(resolve, reject) {
    database.get(`SELECT ${items} FROM ${source} WHERE ${search} = ?`, [searched], function(err, result) {
      if (err) {
        reject(err);
      }
      if (source == "users" && !result) {
        resolve(null);
      }
      if (!result) {
        reject("NO SUCH RECORD IN THE DATABASE");
      }
      if (result) {
        resolve(result);
      }
    })
  });
};

module.exports.updatePromise = function(destination, items, search, searched) {
  return new Promise(function(resolve, reject) {
    database.run(`UPDATE ${destination} SET ${items} WHERE ${search}`, searched, function(err) {
      if (err) {
        reject(err);
      }
      if (!this.changes) {
        reject("NO CHANGES IN THE DATABASE");
      }
      if (this.changes) {
        resolve(this.changes);
      }
    });
  })
}

module.exports.insertPromise = function(destination, columns, values) {
  return new Promise(function(resolve, reject) {
    var placeholders = values.map((value) => '?').join(',');
    
    database.run(`INSERT INTO ${destination} (${columns}) values (${placeholders})`, values, function(err) {
      if (err) {
        reject(err);
      }
      if (!this.changes) {
        reject("NO INSERTS INTO THE DATABASE");
      }
      if (this.lastID) {
        resolve(this.lastID);
      }
    });
  })
}
