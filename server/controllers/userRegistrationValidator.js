const Validator = require("validator");
const isEmpty = require("is-empty");

const userRegistrationValidator = formData => {

  const validationErrors = {};

  //validator wont work without converting empty fields to strings
  formData.email = !isEmpty(formData.email) ? formData.email : '';
  formData.password = !isEmpty(formData.password) ? formData.password : '';
  formData.language = !isEmpty(formData.language) ? formData.language : '';

  //validations check
  if(Validator.isEmpty(formData.email)) {
    validationErrors.email = 'Email is a required field';
  }
  else if(Validator.isEmail(formData.email)) {
    validationErrors.email = 'Please enter a valid email';
  }

  if(Validator.isEmpty(formData.password)) {
    validationErrors.password = 'Password is a required field';
  }
  else if(!Validator.isLength(formData.password, {min: 6})) {
    validationErrors.password = 'Password should have atleast 6 characters';
  }

  if(!Validator.equals(formData.password, formData.confirmPassword)) {
    validationErrors.confirmPassword = 'Confirm Password not matching with Password';
  }
  
  return {
    validationErrors,
    isRegistrationValid: isEmpty(validationErrors)
  }
}

module.exports = userRegistrationValidator;