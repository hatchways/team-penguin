//performs deep equal check where order matching is ignored
const areArraysEqual = (ar1, ar2) {
  if (ar1.length !== ar2.length) {
    return false;
  }
  ar1.sort();
  ar2.sort();
  for (let i = 0; i < ar1.length; i++) {
    if (ar1[i] !== ar2[i]) return false;
  }
  return true;
}

module.exports = {areArraysEqual}