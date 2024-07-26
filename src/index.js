const { app, BrowserWindow } = require('electron');
const path = require('path');

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

console.log(__dirname);

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        transparent: true, // Make the window transparent
        frame: false, // Remove window frame
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        }
    });
    //
    mainWindow.loadFile('index.html');

    // Wait for the DOM to be fully loaded before changing colors
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.executeJavaScript(
        `setInterval(changeDotColors, 100);`
    );
    });

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});




