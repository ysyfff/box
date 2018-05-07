var child_process = require('child_process');
var os = require('os');
var fs = require('fs');
var walk = require('walk');

var mp3 = [];
// var homedir = os.homedir();
var walker = walk.walk(os.homedir());

walker.on('file', function(roots, stat, next){
  if(stat.name.indexOf('.mp3') !== -1) {
    console.log(stat.name, roots);
  }
  next();
})
