const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const User = require('../models/user');
const registrationValidator = require('../controllers/userRegistrationValidator');
const loginValidator = require('../controllers/userLoginValidator');
const secretKey = require('../db-credentials.json');

router.post('/register', (req, res) => {
  const {validationErrors, isRegistrationValid} = registrationValidator(req.body);

  if(!isRegistrationValid) {
    return res.status(400).json(validationErrors);
  }

  User.findOne({ email: req.body.email })
      .then(user => {
        if(user) {
          return res.status(400).json({email: "Email you entered already exists"});
        }
        else {
          const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            language: req.body.language
          });
          bcrypt.genSalt(12, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save().then(user => res.status(201).json({ success: `${user.email} successfully registered`}))
                            .catch(err => console.error(err));
            });
          });
        }
      });
});

router.post('/login', (req, res) => {
  const {validationErrors, isLoginValid} = loginValidator(req.body);

  if(!isLoginValid) {
    return res.status(400).json(validationErrors);
  }

  User.findOne({ email: req.body.email })
      .then(user => {
        if(!user) {
          return res.status(404).json({ missingData: "User not found"});
        }
        bcrypt.compare(req.body.password, user.password)
              .then(isPasswordValid => {
                if(isPasswordValid) {
                  const payload = {
                    id: user._id,
                    email: user.email
                  };
                  jwt.sign(payload, secretKey["secretOrKey"], {
                    expiresIn: 86400 //expires in 1 day
                  },
                  (err, token) => {
                    res.json({
                      success: `${user.email} is logged in successfully`,
                      token: `Bearer ${token}`
                    });
                  }
                );
               }
               else {
                 return res.status(401).json({ validationError: "Invalid login credentials"});
               }
              });
      });
});

router.get("/:fromEmail/referralId",
  //passport.authenticate('jwt', { session: false }),
  function(req, res, next) {
    const {fromEmail} = req.params
    User.findOne({email: fromEmail}, function(err, user) {
      if (err) return console.error(err);
      if (!user) {
        res.status(500).json({type: 'error', message: 'A user with that email could not be found.'})
      }
      if (user) {
        res.json({type: 'success', referralId: user.referral_id.toString()})
      }
    });
  }
);

router.post('/register/referral', (req, res) => {
  const {validationErrors, isRegistrationValid} = registrationValidator(req.body);
  const {referralId} = req.body;

  if(!isRegistrationValid) {
    return res.status(400).json(validationErrors);
  }

  User.findOne({ email: req.body.email })
      .then(user => {
        if(user) {
          return res.status(400).json({email: "Email you entered already exists"});
        }
        else {
          const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            language: req.body.language
          });
          bcrypt.genSalt(12, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  User.findOne({referralId})
                    .then(user => {
                      let from_user_email = user.email;
                      let invite = {from_user_email, to_user_email: email};
                      Invitation.save(invite)
                        .then(invitation => {
                          res.status(201).json({type: 'success', message: `${user.email} was  registered. An invitation from ${from_user_email} was created.`})
                        })
                        .catch(err => console.error('New invitation could not be created.', err));
                    })
                    .catch(err => console.error('Invitation sender could not be found', err))
                })
                .catch(err => console.error(err));
            });
          });
        }
      });
});

module.exports = router;
