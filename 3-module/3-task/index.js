/**
 * @param {string} str
 * @returns {string}
 */


/*async function camelize(str) {

  const  _ = await require('lodash.camelcase');

  let result = _(str);
  return Promise.resolve(result);

} */
//const  _ =  require('lodash.camelcase');
import {camelCase} from 'lodash';

 function camelize(str) {

return camelCase(str);

 }
