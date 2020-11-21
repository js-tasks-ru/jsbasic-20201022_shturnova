/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  // ваш код...

const trueusers = users.filter(function(userObj) {
return userObj.age  <= age;
});

const namesSalaries = trueusers.map(function (userObj) {
return userObj.name + ", " + userObj.balance;
})

  return namesSalaries.join('\n');

}
