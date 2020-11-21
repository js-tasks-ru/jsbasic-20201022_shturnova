/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {

  let rowsNumber = table.rows.length;

  for (let i = 0; i < rowsNumber; i++) {

    table.rows[i].cells[i].style.backgroundColor = 'red';
  }
}
