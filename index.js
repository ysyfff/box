const electron = require('electron');
const url = require('url');
const path = require('path');
const scan = require('./sys/scan.js');

const { app, Menu, BrowserWindow } = electron;

let mainWindow;

app.on('ready', function() {
  mainWindow = new BrowserWindow();
  // mainWindow.loadURL(url.format({
  //   // pathname: path.join(__dirname, 'mainWindow.html'),
  //   pathname: path.join(__dirname, '/prd/templates/pages/music.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }));
  mainWindow.loadURL('http://my.qunar.com:8888/music');
  // mainWindow.loadURL(`file://${__dirname}/prd/templates/pages/music.html`)
  // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
  scan.scan(mainWindow);
});
