import validator from 'validator';

const validateSignUp = formValues => {
  let formErrors = {};
  const { email, password, confirmPassword } = formValues;
  if(validator.isEmpty(email)) {
    formErrors.email = 'Email is required';
  }
  else if(!validator.isEmail(email)) {
    formErrors.email = 'Email entered is invalid';
  }

  if(validator.isEmpty(password)) {
    formErrors.password = 'Password is required';
  }
  else if(!validator.isLength(password, {min: 6})) {
    formErrors.password = 'Password should have at least 6 characters';
  }

  if(!validator.equals(password, confirmPassword)) {
    formErrors.confirmPassword = 'Confirm Password should match with Password';
  }

  return formErrors;
};

export default validateSignUp;