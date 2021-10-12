const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const {Server} = require('socket.io');
/** @type{Server} */
const io = require('socket.io')(3000);
const {spawn} = require('child_process');

/** @type {BrowserWindow} */
let mainWindow;

/**
 * Create a new window
 * @return {BrowserWindow} The new window created
 */
function createWindow() {
  const window = new BrowserWindow({
    width: 1280,
    height: 720,
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

app.whenReady().then(()=> {
  mainWindow = createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) mainWindow = createWindow();
  });
  const child = spawn('matrix_processor\\bin\\main.exe', [], {shell: false});
});

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('receiveMatrix', (msg) => {
    mainWindow.webContents.send('receiveMatrix', JSON.parse(msg)[0]);
  });
  ipcMain.on('stop', () => {
    socket.emit('stop');
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
