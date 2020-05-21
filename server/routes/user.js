const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../database/models/user');
const registrationValidator = require('../controllers/userRegistrationValidator');
const loginValidator = require('../controllers/userLoginValidator');

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
            password: req.body.password
          });
          bcrypt.genSalt(12, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save().then(user => res.json({ "success": `${user.email} successfully registered`}))
                            .catch(err => console.error(err));
            });
          });
        }
      });
});

module.exports = router;

