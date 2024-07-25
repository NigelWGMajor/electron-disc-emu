#  Nix notes

tl;dr

I want a simplest possible compact UI element to render a color/visual-based focus timer.

It needs to be able to

- run on top
- be compact
- be transparent
- be super simple

Purpose: to provide time-managed cycles to better manage immersive tasks.

🔽------🤖

Step-by-Step Guide to Host Your HTML Page in an Electron App

Install `Node.js` and `npm`: Ensure you have Node.js and npm installed on your machine. You can download them from nodejs.org.

Set Up Your Project:

Create a new directory for your project.
Initialize a new Node.js project with `npm init -y`.
Install Electron:

`Run npm install electron --save-dev` to install Electron as a development dependency.
Create the Electron Main Script:

Create a file named `main.js` in your project directory.
Modify Your HTML File:

Ensure your `test.html` file is in the project directory.
Create the Electron Configuration:

Update `main.js` to load your `test.html` file.
Directory Structure:

your-project/
├── main.js
├── package.json
└── test.html

**index.js**

```js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        transparent: true, // Make the window transparent
        frame: false, // <(-- Remove window frame by making this true
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        }
    });

    mainWindow.loadFile('index.html');
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
```

**package.json**

Ensure your package.json has a start script to run Electron:

```json
{
  "name": "your-project",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "electron ."
  },
  "devDependencies": {
    "electron": "^latest"
  }
}
```

**Running Your Electron App:**

Open a terminal in your project directory.

`Run npm install` to install dependencies.
`Run npm start` to start your Electron app.

***Explanation***:

`Transparent Window:` The `transparent: true` option in BrowserWindow makes the window background transparent.
`Frameless Window:` The `frame: false` option removes the default window frame, allowing your HTML/CSS to define the appearance.
`Load HTML:` The` mainWindow.loadFile('test.html') `line loads your HTML file into the Electron window.
This setup will host your HTML page in a semi-transparent Electron window, providing a desktop application experience.

🤖------⏹️

fetch✅ After a bit of back-and forth I was able to get the tasks and the launch json set up to where I can debug in vscode without error messages.

Getting to a git repo:

`git init`


`git add .`
`git commit -m "initial commit"`

Go to [git](https://github.com/NigelWGMajor) and create a public repo with no initializations.

`git remote add origin https://github.com/NigelWGMajor/electron-disc-emulator.git`

`git push -u origin main`


