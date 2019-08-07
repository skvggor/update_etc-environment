'use strict';

const { BrowserWindow, app, ipcMain, dialog } = require('electron')
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
  mainWindow.setMenuBarVisibility(false)

  const envContent = readFile('/etc/environment')

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('sending', envContent)
  })

  ipcMain.on('synchronous-message', (event, arg) => {
    dialog.showOpenDialog(mainWindow)
    console.log(arg)
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)
