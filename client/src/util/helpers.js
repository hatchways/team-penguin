
export function isEmailValid(email) {
  const regex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/g
  return email.match(regex);
}