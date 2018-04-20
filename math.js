const add = (a, b) => {
  return a + b;
};

const power = (base, exponent) => {
  let result = 1;
  for (let i = 1; i <= exponent; i += 1) {
    result *= base;
  }
  return result;
};

module.exports = {
  add,
  power,
};
