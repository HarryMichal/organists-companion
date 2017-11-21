var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var json = require('json');
const sqlite3 = require('sqlite3').verbose();


// routes variables
var index = require('./routes/index');
var users = require('./routes/users');
var settings = require('./routes/settings');
var output = require('./routes/output');
var api_psalms_request = require('./routes/api/get_psalms_all');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// Routes that Express serves; variables at the top
app.use('/', index);
app.use('/users', users);
app.use('/settings', settings);
app.use('/output', output);

// API Routes
app.use('/api/data/psalms', api_psalms_request);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// connect to the test database
var db = new sqlite3.Database('./db/testdb.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the testdb database.');
});

function create_table() {
  db.run("CREATE TABLE psalms(id INTEGER, text TEXT, rows INTEGER)")
};

// del_psalms();

function del_psalms() {
  db.run("DELETE FROM psalms", function(err, result, next){
    if(err){
      return console.error("Error deleting rows");
    };
    console.log(`Row(s) deleted ${this.changes}`);
  });
};

var psalms_list = fs.readFileSync('./psalms.json');
var psalms = JSON.parse(fs.readFileSync('./psalms.json'));
/*
for (i = 0; i < 8; i++) {
  console.log("JSON: " + psalms.psalms[i].id + ", " + psalms.psalms[i].text);
}
*/

query_psalms();

function query_psalms() {
  db.all("SELECT id, text FROM psalms ORDER BY id", function(err, result){
    if(err){
      return console.error("Error querrying entries");
    };
    console.log(result[2].text);
  });
};

//add_psalms();

function add_psalms() {
  for (i = 0; i < 8; i++) {
    db.run("INSERT INTO psalms(id, text) VALUES (?, ?) ", psalms.psalms[i].id, psalms.psalms[i].text, function(err){
      if(err){
        return console.error("Error adding entries");
      };
      console.log(`Row(s) added ${this.changes}`);
    });
  }
}

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Closed the database connection.')
})

module.exports = app;
