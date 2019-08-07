'use strict';

const {app, BrowserWindow} = require('electron')
const fs = require('fs')
const readFile = (file) => fs.readFileSync(file, 'utf8')

function createWindow() {
  let mainWindow

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('index.html')
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  const envContent = readFile('/etc/environment')

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('sending', envContent)
  })
}

app.on('ready', createWindow)
