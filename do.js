var fs = require('fs');

var names = fs.readFileSync('./names.txt', 'utf-8');
names = names.split('\n').forEach(function(item){
  console.log('\"' + item + '\",');
})

