var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

// ======================================================

var db = new sqlite3.Database('./db/testdb.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err);
  };
});

<<<<<<< HEAD
function generateToken (username, permission, expiration) {
=======
var generateToken = function (username, permission, expiration) {
>>>>>>> d354be3d10c1e69966dbc6c9c99be3e0029d53bd
  var claims = {
    'sub': username,
    'perm': permission
  };
  return jwt.sign(claims, config.token.secret, { expiresIn: expiration });
};

var getTokenData = function(token) {
  return jwt.decode(token);
}

// ====================================================================

router.post('/signup', function(req, res, next) {
  passport.authenticate('signup', (error, user, info) => {
    req.session.save((err) => {
      if (err) {
        return next(err);
      }
    });
    res.json({success: true});
  })(req, res, next);
  return;
}); // runs the passport authenticate function; config in passport.js

router.post('/login', function(req, res, next) {
  passport.authenticate('login', (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.status(403).json({ error: 'User not found.' });
    }
    req.logIn(user, err => {
      if (err) {
        return res.status(401).json( { message: err } );
      }
      var token = generateToken(req.body.username, "general", config.token.expiresIn);
      
      return res.json({ token: token });
    });
  })(req, res, next);
}); // runs the passport authenticate function; config in passport.js

router.get('/logout', function(req, res, next) {
  req.logout();
  req.session.save((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).send('OK');
  });
});

<<<<<<< HEAD
=======
router.post('/getticket', (req, res, next) => {
  var decoded = getTokenData(req.body.token);
  var ticket = createTicket(decoded);
  return res.json({ "ticket": ticket});
})

>>>>>>> d354be3d10c1e69966dbc6c9c99be3e0029d53bd
router.post('/guest', function(req, res, next) {
  var guest = req.body;
  var token = generateToken(guest.sub, guest.perm, guest.exp);
  
  return res.json({token: token});
})
<<<<<<< HEAD
=======

router.post('/psalms', function(req, res) {
  console.log("POST API/psalms/");
  res.send("root of API calls regarding psalms");
});

router.post('/psalms/list', function(req, res, next) {
  var db = new sqlite3.Database('./db/testdb.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the testdb database.');
  });
  console.log("API/psalms/list POST - API call showing list of psalms or requested psalms");
  res.send();
});
>>>>>>> d354be3d10c1e69966dbc6c9c99be3e0029d53bd

module.exports = router;
