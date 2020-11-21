/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @returns {number[]}
 */
function filterRange(arr, a, b) {

const filtered = [];
for (let num of arr) {
  if (a <= num  && num <=b)
    filtered.push(num);
}

//console.log(filtered);
return filtered;
}
