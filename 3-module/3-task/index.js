/**
 * @param {string} str
 * @returns {string}
 */

function camelize(str) {

  let arr = str.split('-');

  let arrNew = [];
  arrNew.push(arr[0]);

  for (let i = 1; i < arr.length; i++) {
    arrNew.push(arr[i][0].toUpperCase() + arr[i].slice(1));
  }

  return arrNew.join(``);

}
