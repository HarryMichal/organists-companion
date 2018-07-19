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

function generateToken (username, permission, expiration) {
  var claims = {
    'sub': username,
    'perm': permission
  };
  return jwt.sign(claims, config.token.secret, { expiresIn: expiration });
};

function verifyToken(token, callback) {
  jwt.veriy(token, config.token.secret, function(err, token) {
    if (err) {
      callback(true, null);
    }
    if (token) {
      callback(false, token);
    }
  })
}

var getTokenData = function(token) {
  return jwt.decode(token);
}

// ====================================================================

router.post('/signup', function(req, res, next) {
  passport.authenticate('signup', (error, user, info) => {
    if (error) {
      return res.json({success: false});
    }
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
      return res.status(403).json({ success: false, error: 'User not found.' });
    }
    req.logIn(user, err => {
      if (err) {
        return res.status(401).json({ success: false, message: err });
      }
      var token = generateToken(req.body.username, "general", config.token.expiresIn);
      
      return res.json({ success: true, token: token });
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

router.post('/guest', function(req, res, next) {
  var guest = req.body;
  var token = generateToken(guest.sub, guest.perm, guest.exp);
  
  return res.json({token: token});
})

module.exports = router;
