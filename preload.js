const {contextBridge, ipcRenderer} = require('electron');


contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    const validChannels = ['stop', 'sendMatrix'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    const validChannels = ['receiveMatrix', 'receivePath'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
