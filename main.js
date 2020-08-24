const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')
const Store = require('electron-store');
const store = new Store();

let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 1100, height: 700})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'src/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //win.webContents.openDevTools()
  
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  var menu = Menu.buildFromTemplate([
    {
      label: 'Menu',

      submenu: [ 
        { label: 'Portfolio', click(){
            const modalPath = path.join('file://', __dirname, 'src/portofolio.html')
            let win = new BrowserWindow({frame: true, alwaysOnTop: true, width: 350, height:600})
            win.on('close', function() {win=null})
            win.loadURL(modalPath)
            win.show()
            //win.webContents.openDevTools()
            }
        },

        { label: 'Change Theme',
          click(){
            themeCount = store.get('theme');
            console.log(themeCount)
            if(themeCount === null){
              store.set('theme', '1');
              console.log('themeSetToOne')
            }
            else {
              store.set('theme', parseFloat(themeCount) * -1);
              console.log('themeChnagedBy*-1')
            }
            console.log('finalCount = ' + themeCount)
          }
        },

        { label: 'Exit',
          click(){
            app.quit()
          }
        }
      ]
    }
  ])

  Menu.setApplicationMenu(menu);

}




app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})