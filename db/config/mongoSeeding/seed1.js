const { createFakeData } = require('./seedHelper');

console.time('createFakeData');
createFakeData(1, 2500000, './data1.js');
console.timeEnd('createFakeData');