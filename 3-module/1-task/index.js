/**
 * @param   {{ name: string, age: number }[]} users
 * @returns {string[]}  объект
 */
function namify(users) {

  const names = users.map(function (userObj) {
    return userObj.name;
  });
return names;

}
