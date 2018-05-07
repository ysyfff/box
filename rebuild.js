var fs = require('fs');
var child_process = require('child_process');

fs.watch('./', {recursive: true}, function(eventType, filename){
  if(eventType === 'change' && filename.includes('src/')){
    console.log(filename, '999')
    child_process.exec('yarn run build:dev');
  }
})