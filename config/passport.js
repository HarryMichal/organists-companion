var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var sqlite3 = require('sqlite3');
var bcrypt = require('bcrypt');
var bcryptUtils = require('../utils/bcrypt.js');
var jwt = require('jsonwebtoken');
var database = require('../utils/database.js');

function generateHashTag() {
  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return '#' + s4();
}

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
  }, async function registerUser(req, username, password, done) {
    try {
      var nameExists = await database.selectPromise("username", "users", "username", username);
      
      if (nameExists) {
        throw "This username is already used";
      }
      
      var hashTag = generateHashTag();
      var hashedPassword = await bcryptUtils.hashPromise(password, 11);
      
      var inserted = await database.insertPromise("users", "username, hashTag, email, password", [username, hashTag, req.body.email, hashedPassword]);
      
      var user = await database.selectPromise("username, hashTag", "users", "id", inserted);
      
      return done(null, user);
    }
    catch (e) {
      console.log(e);
      return done(e, false)
    }
    /*
    db.get("SELECT username FROM users WHERE username = ?", [username], function(err, rows) {
      // error during database querry
      if (err) {
        return done(err)// The username is not unique --> throw an error; stop the function);
      }
      if (rows) {
        console.error('This username is already used');
        return done(null, false);
      } else { // The username is unique --> hash provided password and insert into the database
        var salt = bcrypt.genSaltSync(11);
        bcrypt.hash(password, salt, function(err, new_password) { // Hash provided password and insert into database;
          db.run("INSERT INTO users (username, hashtag, email, password) values (?,?,?,?)", [
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
    */
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
