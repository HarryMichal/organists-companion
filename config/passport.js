var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var sqlite3 = require('sqlite3');
var bcrypt = require('bcrypt-nodejs');

// ====================================================================

// expose this function to our app using module.exports
module.exports = function(app) {
  var db = new sqlite3.Database('./db/testdb.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    };
    console.log('Passport: Connected to the testdb file');
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

  passport.use('register', new LocalStrategy({
    usernameField: 'username', passwordField: 'password', passReqToCallback: true // allows us to pass back the entire request to the callback
  }, function(req, username, password, done) {
    // check if the username is already used
    db.get("SELECT username FROM users WHERE username = ?", [req.body.username], function(err, rows) {
      if (err) // error during database querry
        return done(err);
      if (rows) {
        console.error('This username is already used'); // The username is not unique --> throw an error; stop the function
        return done(null, false);
      } else {
        var new_username = username; // The username is unique --> insert to database
        var new_password = bcrypt.hashSync(password, null, null); // Hash provided password and insert into database
        var insertQuery = "INSERT INTO users (username, password ) values (?,?)";
        db.run(insertQuery, [
          new_username, new_password
        ], function(err, rows) {
          return console.log(rows);
          if (err)
            return console.error('Error while inserting user into the database');
          }
        );
      }
    });
  }));

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('login', new LocalStrategy({
    username: 'username', passwordpassword: 'password', passReqToCallback: true // allows us to pass back the entire request to the callback
  }, function(req, username, password, done) { // callback with email and password from our form
    // Checks whether the user is in the database
    db.each("SELECT * FROM users WHERE username = ?", username, function(err, rows) {
      if (err)
        return done(err);
      if (!rows.length) {
        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
      }
      // if the user is found but the password is wrong
      if (!bcrypt.compareSync(password, rows[0].password))
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

      // all is well, return successful user
      return done(null, rows[0]);
    });
  }));
};
