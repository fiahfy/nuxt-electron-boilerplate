/*
 **  Nuxt
 */
const http = require('http')
const { Nuxt, Builder } = require('nuxt')

// Import and Set Nuxt.js options
let config = require('./nuxt.config.js')
config.rootDir = __dirname // for electron-builder
config.dev = !(process.env.NODE_ENV === 'production')

let url
async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware
  const server = http.createServer(nuxt.render)

  // Listen the server
  server.listen()
  url = `http://localhost:${server.address().port}`
  console.log(`Server listening on ${url}`)
}
start()

/*
 ** Electron
 */
const { app, BrowserWindow } = require('electron')
const path = require('path')

let mainWindow = null

const createWindow = () => {
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, 'static/icon.png'),
    width: 820,
    height: 600,
    show: false
  })
  mainWindow.on('closed', () => (mainWindow = null))
  mainWindow.on('ready-to-show', () => mainWindow.show())

  if (config.dev) {
    // Install vue dev tool and open chrome dev tools
    const {
      default: installExtension,
      VUEJS_DEVTOOLS
    } = require('electron-devtools-installer')
    installExtension(VUEJS_DEVTOOLS.id)
      .then((name) => {
        console.log(`Added Extension: ${name}`)
        mainWindow.webContents.openDevTools()
      })
      .catch((err) => console.log('An error occurred: ', err))

    // Wait for nuxt to build
    const pollServer = () => {
      if (!url) {
        setTimeout(pollServer, 300)
        return
      }
      http
        .get(url, (res) => {
          if (res.statusCode === 200) {
            mainWindow.loadURL(url)
          } else {
            setTimeout(pollServer, 300)
          }
        })
        .on('error', pollServer)
    }
    pollServer()
  } else {
    mainWindow.loadURL(url)
  }
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => mainWindow === null && createWindow())
