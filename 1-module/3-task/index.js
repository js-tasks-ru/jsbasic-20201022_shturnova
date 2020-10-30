/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
  // ваш код...
str = str.charAt(0).toUpperCase()+ str.substr(1).toLowerCase();
return str;
}
