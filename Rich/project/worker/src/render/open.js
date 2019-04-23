const btn = document.querySelector('button')
const BrowserWindow = require('electron').remote.BrowserWindow
let win = null
btn.onclick = () => {
  win = new BrowserWindow({
    width: 1000,
    height: 1000
  })

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/children/new.html`)

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}
