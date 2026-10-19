const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("c3room", {
  startRoom: (settings = {}) =>
    ipcRenderer.invoke("c3room:start-room", settings),

  exitRoom: () => ipcRenderer.invoke("c3room:exit-room"),
});
