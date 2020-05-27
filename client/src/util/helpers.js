import validator from "validator";

export function isEmailValid(email) {
  email += '';
  return validator.isEmail(email);
}