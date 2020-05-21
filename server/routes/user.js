const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../database/models/user');
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

module.exports = router;

