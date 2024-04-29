import electron from 'electron';
const { app, BrowserWindow } = electron;
import { join } from 'path';
import isDev from 'electron-is-dev';

let mainWindow = null;
app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 1024,
    title: "Flame 🔥",
    webPreferences: {
      nodeIntegration: true // Enable Node.js integration
    }
  });
  mainWindow.loadURL(isDev ? 'https://5173-fabc14-flame-abd6lqo9nxj.ws-us110.gitpod.io/' : `file://${join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  mainWindow.on('page-title-updated', function (e) {
    e.preventDefault()
  });
}
