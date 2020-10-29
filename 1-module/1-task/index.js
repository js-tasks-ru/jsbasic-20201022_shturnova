/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  // ваш код...
  let fact = 1
  for (i = 0; i < n; i++) {
    fact = fact * (n - i);
 }
  return fact;
    }
