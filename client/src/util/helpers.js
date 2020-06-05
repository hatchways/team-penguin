import validator from "validator";

export function isEmailValid(email) {
  email += '';
  return validator.isEmail(email);
}

export const getPrettyTime = (dateMs) => {
  let dt = new Date(dateMs);
  let hours = dt.getHours().toString();
  let minutes = dt.getMinutes().toString();

  if (hours.length === 1) hours = `0${hours}`;
  if (minutes.length === 1) minutes = `0${minutes}`;

  return `${hours}:${minutes}`;
}