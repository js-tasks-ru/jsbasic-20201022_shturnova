/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  // ваш код...

  if (str.toUpperCase().includes("1XBET")||str.toUpperCase().includes("XXX") )
  {return true;}
  return false;
}
