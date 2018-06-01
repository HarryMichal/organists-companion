var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var sqlite3 = require('sqlite3');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

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

  passport.use('signup', new LocalStrategy({
    usernameField: 'username', passwordField: 'password', passReqToCallback: true/* allows us to pass back the entire request to the callback */
  }, function(req, username, password, done) {
    // check if the username or email are already used
    db.get("SELECT username FROM users WHERE username = ?", [username], function(err, rows) {
      // error during database querry
      if (err) {
        return done(err)// The username is not unique --> throw an error; stop the function);
      }
      if (rows) {
        console.error('This username  is already used');
        return done(null, false);
      } else { // The username is unique --> hash provided password and insert into the database
        var salt = bcrypt.genSaltSync(11);
        bcrypt.hash(password, salt, function(err, new_password) { // Hash provided password and insert into database;
          db.run("INSERT INTO users (username, email, password) values (?,?,?)", [
            username, req.body.email, new_password
          ], function(err) {
            if (err) {
              console.error('Error while inserting user into the database');
              return done(null, false);
            };
            return done(null, rows);
          }); // db.run function + cb
        }); // bcrypt.hash function + cb
      }; // else
    }); //db.get function + cb
  })); //passport.use function + callback

  /*
  db.get("SELECT email FROM users WHERE email = ?", [req.body.user.email], function(err, rows) {
    if (err) // error during database querry
      return done(err);
    if (rows) {
      console.error('This email address is already used');
      return done(null, false);
    } else {
*/

// LOCAL LOGIN
passport.use('login', new LocalStrategy({
  usernameField: 'username', passwordField: 'password', passReqToCallback: true // allows us to pass back the entire request to the callback
  }, function(req, username, password, done) { // callback with email and password from our form
    console.log(username + ' ' + password);
    db.get("SELECT * FROM users WHERE username = ?", [username], function(err, rows) { // Checks whether the user is in the database
      if (err) // when error during query happens
        return done(err);
      else if (!rows) { // Check username validity
        return done(null, false); // Tells that password or username are wrong
      } else {
        bcrypt.compare(password, rows.password, function(err, res) { // Check password validity
          if (err) {
            return done(err);
          }
          if (!res) {
            return done(null, false);
          }
          else {
            return done(null, rows); // all is well, return successful user
          }
        });
      };
    });
  }));
};
