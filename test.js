const fs = require('fs');
const data = fs.readFileSync('./txt', 'utf-8');
console.table(JSON.parse(data));
