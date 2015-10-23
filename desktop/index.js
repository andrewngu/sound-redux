import app from 'app';
import BrowserWindow from 'browser-window';
import globalShortcut from 'global-shortcut';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // Load app from webpack dev server.
  mainWindow.loadUrl('http://localhost:8080');

  // Open the DevTools.
  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  globalShortcut.register('MediaNextTrack', () => {
    mainWindow.webContents.executeJavaScript('Player.nextSong()');
  });

  globalShortcut.register('MediaPreviousTrack', () => {
    mainWindow.webContents.executeJavaScript('Player.prevSong()');
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
