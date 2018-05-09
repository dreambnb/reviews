// Generate random numbers between 1 and 30003120 (the size of my test database)
const fs = require('fs');

for (let i=0; i < 20; i++) {
  let rand = Math.floor(Math.random() * 3003120) + 1;
  fs.appendFile('popular.csv', rand + '\n', (err) => {
    if (err) throw err;
  });
}

console.log('Done!')