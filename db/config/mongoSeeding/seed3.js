const { createFakeData } = require('./seedHelper');

console.time('createFakeData');
createFakeData(5000001, 7500000, './data3.js');
console.timeEnd('createFakeData');