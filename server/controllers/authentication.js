const jwt = require('jsonwebtoken'),
      crypto = require('crypto'),
      User = require('../models/user'),
      config = require('../../config/project.config'),
      passport = require('passport')


function generateToken(user) {
  return jwt.sign(user, config.server_secret, {
    expiresIn: 10080 // in seconds
  });
}

// Set user info from request
function setUserInfo(request) {
  return {
    _id: request._id,
    email: request.email
  }
}

//========================================
// Login Route
//========================================

exports.login = function (req, res, next) {
  passport.authenticate('local', (err, result, info) => {
    if (err) { return next(err); }
    if (!result) {
      return res.status(401).json(info);
    }
    req.logIn(result, function(err) {
      if (err) { return next(err); }

      let userInfo = setUserInfo(req.user);
      res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
      });
    });
  })(req, res, next);
}

//========================================
// Registration Route
//========================================
exports.register = function(req, res, next) {
  // Check for registration errors
  const email = req.body.email;
  const password = req.body.password;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      // If user is not unique, return error
      if (existingUser) {
        return res.status(422).send({ error: 'That email address is already in use.' });
      }

      // If email is unique and password was provided, create account
      let user = new User({
        email: email,
        password: password,
      });

      user.save(function(err, user) {
        if (err) { return next(err); }

        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        // Respond with JWT if user was created
        let userInfo = setUserInfo(user);

        res.status(201).json({
          token: 'JWT ' + generateToken(userInfo),
          user: userInfo
        });
      });
  });
}
