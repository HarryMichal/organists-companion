var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParse = require('body-parser');
var sqlite3 = require('sqlite3');

var psalms = require("../public/data/psalms.json");

/* ============================================================================== */

// Route to /; Main page
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
  res.end();
});

// Route to /users
router.get('/users', (req, res, next) => {
  if (req.user) {
    return res.json({user: req.user, authenticated: true});
  } else {
    return res.status(401).json({error: 'User is not authenticated', authenticated: false});
  }
});

// Route to /register
router.post('/register', passport.authenticate('register', function(req, username, password, done) {
  // find a user whose email is the same as the forms email
  // we are checking to see if the user trying to login already exists
  db.each("SELECT username FROM users WHERE username = ?", [username], function(err, rows) {
    if (err)
      return done(err);
    if (rows.length) {
      return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
    } else {
      // if there is no user with that username
      // create the user;
      var newUserSQLite = {
        username: username,
        password: bcrypt.hashSync(password, null, null) // use the generateHash function in our user model
      };

      var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";

      db.run(insertQuery, [
        newUserSQLite.username, newUserSQLite.password
      ], function(err, rows) {
        newUserSQLite.id = rows.insertId;

        return done(null, newUserSQLite);
      });
    }
  });
}));

/*
(req, res, next) => {
  console.log('/register handler', req.body);
  Account.register(new Account({username: req.body.username}), req.body.password, (err, account) => {
    if (err) {
      return res.status(500).send({error: err.message});
    }

    passport.authenticate('local')(req, res, () => {
      req.session.save((err) => {
        if (err) {
          console.error("Passport (Route): Error during register");
        }
        res.status(200).send('OK');
      });
    });
  });
});
*/

// Route to /login
router.post('/login', passport.authenticate('login', {
  successRedirect: '/protected',
  failureRedirect: '/?error=LoginError',
  failureFlash: true
}), (req, res, next) => {
  console.log('/login handler');
  req.session.save((err) => {
    if (err) {
      return next(err);
    }
    res.send('OK');
  });
});

/*
  Example of not using failureRedirect:
  router.post('/login', function(req, res, next) {
  	passport.authenticate('local', function(err, user, info) {
  		console.log('/login handler', req.body);
  		if (err) { return next(err); }
  		if (!user) { return res.status(500).json({ error: 'User not found.' }); }
  		req.session.save((err) => {
  				if (err) {
  						return next(err);
  				}
  				res.status(200).json({ success: true });
  		});
  	})(req, res, next);
  });
  */

// Route to /logout
router.get('/logout', (req, res, next) => {
  req.logout();
  req.session.save((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).send('OK');
  });
});

// Route for testing API
router.get('/ping', (req, res) => {
  res.send("Pong!");
});

// Route to /output
router.get('/output', function(req, res, next) {
  res.render('output', {
    title: 'Output - Deprecated',
    outputText: "Isn't defined now. Deprecated"
  });
  res.end();
});

// Route to /settings
router.get('/settings', function(req, res, next) {
  res.render('settings', {title: 'Settings'});
});

// Route to /users - shows a test JSON file
router.get('/users_old', function(req, res, next) {
  res.json([
    {
      id: 1,
      username: "HarryPhoon"
    }, {
      id: 2,
      username: "Rockhon"
    }
  ]);
});

/* These routes should be handled on front-end in React, React Router */
/*
  router.get('/', (req, res) => {
  		res.render('index', { user : req.user });
  });
  router.get('/register', (req, res) => {
  		res.render('register', { });
  });
  router.get('/login', (req, res) => {
  		res.render('login', { user : req.user, error : req.flash('error')});
  });
  */

module.exports = router;
