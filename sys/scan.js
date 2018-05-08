var child_process = require('child_process');
var os = require('os');
var fs = require('fs');
var walk = require('walk');
var path = require('path');
var glob = require('glob');

var commonDirs = ['Desktop', 'Documents', 'Downloads', 'Music'];

function scan(mainWindow, scanPath) {
  var mp3 = [];
  // var homedir = os.homedir();
  commonDirs.map((item, i) => {

  })
  var walker = walk.walk(scanPath || path.join(os.homedir(), 'Desktop') || os.homedir()); //

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


function scan2(mainWindow, globRules) {
  let rules = path.resolve(os.homedir(), 'Desktop/**/*.mp3');
  // let rules2 = path.resolve(os.homedir(), 'M**/**/*.mp3');
  var mp3 = [];

  glob2([rules], function (err, matches) {
    matches.map(function (item, i) {
      // let t
      let pathArr = item.split('/');
      let name = pathArr[pathArr.length - 1];
      let sourcePath = item.replace(/\s/g, '\\ ');
      let destPath = path.join(__dirname, '../tmpData/mp3');
      let quotePath = path.join('/tmpData/mp3/', name);
      console.log(name, quotePath)
      // let quotePath = path.join('/tmpData/mp3/', name.replace(/\s/g, '\\ '));
      let cp = `cp ${sourcePath} ${destPath}`;
      //将音乐拷贝过来
      child_process.exec(cp);
      mp3.push({
        path: quotePath,
        name: name.split('.mp3')[0]
      });

      mainWindow.webContents.send('scan:mp3', mp3);
    })

    // console.log(stat.name, roots, path.resolve(roots, stat.name), path.join(roots, stat.name));

  });
}

function glob2(pattern, options, callback) {
  if (Array.isArray(pattern)) {
    pattern.map((item, i) => {
      glob(item, options, callback)
    })
  } else {
    glob(pattern, options, callback);
  }
}
// scan();
module.exports = {
  scan: scan2
}
