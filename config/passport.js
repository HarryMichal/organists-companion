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
  console.log('Passport: DB Ready');
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
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  }, function(req, username, password, done) {
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    db.eacha("SELECT username FROM users WHERE username = ?", [req.body.username], function(err, rows) {
      if (err)
        return done(err);
      if (rows.username == req.body.username) {
        return done(null, false);
        console.error('This username is already used');
      } else {
        // if there is no user with that username
        // create the user
        console.log('/register handler', req.body.username);
        var new_username = username;
        var new_password = bcrypt.hashSync(password, null, null); // Hash provided password and insert into database
        var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";
        db.run(insertQuery, [
          new_username, new_password
        ], function(err, rows) {
          var new_id =  rows.rows.Id;
          return done(null, new_id);
        });
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
