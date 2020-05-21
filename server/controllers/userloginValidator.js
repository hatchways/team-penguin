const Validator = require("validator");
const isEmpty = require("is-empty");

const userLoginValidator = formData => {

  const validationErrors = {};

  formData.email = !isEmpty(formData.email) ? formData.email : '';
  formData.password = !isEmpty(formData.password) ? formData.password : '';

  if(Validator.isEmpty(formData.email)) {
    validationErrors.email = 'Email is a required field';
  }
  else if(Validator.isEmail(formData.email)) {
    validationErrors.email = 'Please enter a valid email';
  }

  if(Validator.isEmpty(formData.password)) {
    validationErrors.password = 'Password is a required field';
  }

  return {
    validationErrors,
    isRegistrationValid: isEmpty(validationErrors)
  }

}