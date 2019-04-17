const electron = require('electron');

const { app } = electron;
const { BrowserWindow } = electron;
const path = require('path');
const url = require('url');

let mainWindow = null;
// listen for app to be ready
function CreateWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
  });
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'html/LoginComp.html'),
    protocol: 'file',
    slashes: true,
  }));
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
app.on('ready', CreateWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    CreateWindow();
  }
})