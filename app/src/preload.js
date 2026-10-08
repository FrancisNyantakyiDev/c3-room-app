const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("c3room", {});
