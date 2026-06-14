const { app, BrowserWindow } = require("electron");
const path = require("path"); // Node helper for file paths

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 350,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    frame: false, 
    transparent: true,
    webPreferences: {
      contextIsolation: true, // Keep security context active
      nodeIntegration: false,  // Best practice safety fallback
      preload: path.join(__dirname, "preload.js") // Points to your new preload file
    }
  });

  win.loadFile("index.html");
  
  // Forces Electron's console window to open immediately on execution
  win.webContents.openDevTools({ mode: 'detach' });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
