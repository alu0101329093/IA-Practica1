const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const { Server } = require('socket.io');
/** @type{Server} */
const io = require('socket.io')(3000);
const { spawn } = require('child_process');

/** @type {BrowserWindow} */
let mainWindow;
let child;

/**
 * Create a new window
 * @return {BrowserWindow} The new window created
 */
function createWindow() {
  const window = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nativeWindowOpen: true,
    },
    backgroundColor: '#FFF',
  });
  window.loadFile('index.html');
  window.once('ready-to-show', () => {
    window.show();
  });
  return window;
}

let stop = false;

app.whenReady().then(() => {
  mainWindow = createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) mainWindow = createWindow();
  });
  if (process.platform === 'win32') {
    child = spawn('matrix_processor\\bin\\main.exe');
  } else {
    child = spawn('matrix_processor/bin/main');
  }
  child.stdout.on('data', (msg) => {
    console.log(msg.toString());
  });
  child.on('close', () => {
    stop = true;
    mainWindow.close();
  });
});

io.on('connection', (socket) => {
  console.log('user connected');
  // socket.on('receiveMatrix', (msg) => {
  //   mainWindow.webContents.send('receiveMatrix', JSON.parse(msg)[0]);
  // });

  socket.on('receivePath', (msg) => {
    mainWindow.webContents.send('receivePath', JSON.parse(msg));
  });

  ipcMain.on('stop', () => {
    socket.emit('stop');
  });

  ipcMain.on('sendMatrix', (_event, msg) => {
    socket.emit('sendMatrix', JSON.stringify(msg));
  });

  mainWindow.on('close', (event) => {
    if (!stop) {
      event.preventDefault();
      socket.emit('stop');
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // while (!stop) continue;
    app.quit();
  }
});
