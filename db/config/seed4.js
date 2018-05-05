const { createFakeData } = require('./seedHelper');

console.time('createFakeData');
createFakeData(7500001, 10000000, './data4.js');
console.timeEnd('createFakeData');
