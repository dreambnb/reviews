const { createFakeData } = require('./seedHelper');

console.time('createFakeData');
createFakeData(2500001, 5000000, './data2.js');
console.timeEnd('createFakeData');