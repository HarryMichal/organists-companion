// config/database.js
module.exports = {
  'filename': '../db/testdb.db',
  'mode': 'sqlite3.OPEN_READWRITE',
  'callback': '(err) => {
    if (err) {
      console.error(err.message);
    }'
};
