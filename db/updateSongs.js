const sqlite3 = require('sqlite3');

const database = new sqlite3.Database('./testdb.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err);
  };
});

database.each('SELECT id, text FROM psalms', function(err, row) {
  console.log(`${row.id}: ${row.text}`);
  if (!row.text.endsWith('?') && !row.text.endsWith('!') && !row.text.endsWith('.')) {
    database.run(`UPDATE psalms SET text = ? WHERE id = ${row.id}`, [`${row.text}.`] , function(err) {
      if (err) {
        console.error(err);
      }
    });
  }
});

database.close();
