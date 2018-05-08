var child_process = require('child_process');
var os = require('os');
var fs = require('fs');
var walk = require('walk');
var path = require('path');



function scan(mainWindow, scanPath) {
  var mp3 = [];
  // var homedir = os.homedir();
  var walker = walk.walk(scanPath || os.homedir());

  walker.on('file', function (roots, stat, next) {
    if (stat.name.indexOf('.mp3') !== -1) {
      
      mp3.push({
        path: path.resolve(roots, stat.name),
        name: stat.name.split('.mp3')[0]
      });
      // console.log(stat.name, roots, path.resolve(roots, stat.name), path.join(roots, stat.name));
      mainWindow.webContents.send('scan:mp3', mp3);
    }
    next();
  });
}

// scan();
module.exports = {
  scan: scan
}
