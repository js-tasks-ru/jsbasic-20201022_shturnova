/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: '',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *   },
 *
 * @constructor
 */
export default class UserTable {
  constructor(rows) {
    let table = this.createThead();
    this.createTbody(rows, table);
    this.deleteRow();
  }

  createThead() {
    let table = document.createElement('table');
    this.elem = table;
    table.insertAdjacentHTML('afterbegin', '<thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr></thead><tbody></tbody>');
    return table;
  }

  createTbody(rows, table) {
    for (let i = 0; i < rows.length; i++) {
      let row = document.createElement('tr');
      table.querySelector('tbody').append(row);
      for (let key in rows[i]) {
        let cell = rows[i][key];
        row.insertAdjacentHTML('beforeend', `<td>${cell}</td>`);
      }
      row.insertAdjacentHTML('beforeend', `<td><button>X</button></td>`);
    }
  }

  deleteRow() {
    this.elem.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
          event.target.closest('tr').remove();

        }
      }
    );
  }


}

