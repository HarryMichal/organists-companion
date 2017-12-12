var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var sqlite3 = require('sqlite3');
var bcrypt = require('bcrypt-nodejs');

// ====================================================================

// expose this function to our app using module.exports
module.exports = function(app) {
  var db = new sqlite3.Database('./db/testdb.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err);
    };
  });

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    return done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    db.get('SELECT id, username FROM users WHERE id = ?', id, function(err, row) {
      if (!row)
        return done(null, false);
      return done(null, row);
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('signup', new LocalStrategy({
    usernameField: 'username', passwordField: 'password', passReqToCallback: true/* allows us to pass back the entire request to the callback */
  }, function(req, username, password, done) {
    console.log(username);
    console.log(password);
    console.log(req.body.email);
    // check if the username or email are already used
    db.get("SELECT username FROM users WHERE username = ?", [username], function(err, rows) {
      if (err) // error during database querry
        return done(err);
      if (rows) { // The username is not unique --> throw an error; stop the function
        console.error('This username is already used');
        return done(null, false);
      }
      else {
        var salt = bcrypt.genSaltSync(10);
        bcrypt.hash(password, salt, null, function(err, new_password) { // Hash provided password and insert into database;
          db.run("INSERT INTO users (username, password) values (?,?)", [username, new_password], function(err, rows) {
            return console.log(rows);
            if (err)
              return console.error('Error while inserting user into the database');
            }
          );
        });
      }
    });
  }
));

/*
  db.get("SELECT email FROM users WHERE email = ?", [req.body.user.email], function(err, rows) {
    if (err) // error during database querry
      return done(err);
    if (rows) {
      console.error('This email address is already used');
      return done(null, false);
    } else {
*/

// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

passport.use('login', new LocalStrategy({
usernameField: 'username', passwordField: 'password', passReqToCallback: true // allows us to pass back the entire request to the callback
}, function(req, username, password, done) { // callback with email and password from our form
console.log(username + ' ' + password);
db.get("SELECT * FROM users WHERE username = ?", [username], function(err, rows) { // Checks whether the user is in the database
  if (err)
    return done(err);
  if (!rows) { // Check username validity
    console.error("User wasn't found");
    return done(null, false);
  } else {
    bcrypt.compare(password, rows.password, function(err, res) { // Check password validity
      if (err) {
        console.error("Wrong password");
        return done(null, false);
      } else {
        console.log('Welcome ' + req.body.username);
        return done(null, rows); // all is well, return successful user
      }
    });
  };

});
}));
};
