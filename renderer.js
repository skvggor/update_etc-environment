'use strict'

const { ipcRenderer } = require('electron')

function renderFileContent(ipcRenderer) {
  const preTag = document.querySelector('#file-content')

  ipcRenderer.on('sending', (event, envContent) => {
    preTag.innerHTML = envContent
  })
}

function saveFile(ipcRenderer) {
  const saveButton = document.querySelector('#save-button')

  saveButton.addEventListener('click', () => {
    ipcRenderer.send('synchronous-message', 'saving')
  })
}

renderFileContent(ipcRenderer)
saveFile(ipcRenderer)
