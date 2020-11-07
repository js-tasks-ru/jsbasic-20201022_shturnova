/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */

function getMinMax(str) {


  let arr = str.split(' ')
    .toString().split(',');
  let arr2 = arr.map(Number);
  let arr3 = [];

  for (let num of arr2) {
    let check1 = num;
    if (!isNaN(num)) {
      arr3.push(num);
    }
  }

  let maximal = Math.max(...arr3);
  let minimal = Math.min(...arr3);

  //делаем объект
  return {
    min: minimal,
    max: maximal};
}
