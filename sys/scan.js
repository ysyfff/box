var child_process = require('child_process');
var os = require('os');
var fs = require('fs');
var walk = require('walk');
var path = require('path');



function scan(mainWindow, scanPath) {
  var mp3 = [];
  // var homedir = os.homedir();
  var walker = walk.walk(scanPath || path.join(os.homedir(), 'Desktop'));

  walker.on('file', function (roots, stat, next) {
    const name = stat.name.replace(/\s/g, '\\ ');
    if (stat.name.indexOf('.mp3') !== -1) {
      const sourcePath = path.resolve(roots, name);
      const destPath = path.join(__dirname, '../tmpData/mp3');
      const quotePath = path.join('/tmpData/mp3/', stat.name);
      const cp = `cp ${sourcePath} ${destPath}`;
      //将音乐拷贝过来
      child_process.exec(cp)
      
      mp3.push({
        path: quotePath,
        name: stat.name.split('.mp3')[0]
      });
      // console.log(stat.name, roots, path.resolve(roots, stat.name), path.join(roots, stat.name));
      console.log('gun')
      
      mainWindow.webContents.send('scan:mp3', mp3);
    }
    next();
  });
}

// scan();
module.exports = {
  scan: scan
}
