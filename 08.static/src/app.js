const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')
const chalk = require('chalk')
const debug = require('debug')('static:*')
// const config = require("./config");
const mime = require('mime')
const { promisify, inspect } = require('util')
const pro = {
  stat: promisify(fs.stat),
  readdir: promisify(fs.readdir)
}
const nunjucks = require('nunjucks')

class Server {
  constructor (config) {
    this.config = config
    this.server = http.createServer()
    this.start()
  }

  start () {
    this.server.on('request', this.request.bind(this))

    this.server.listen(this.config.port, () => {
      debug(`server is start on ${chalk.green(this.config.port)}`)
    })
  }

  async request (req, res) {
    const { pathname } = url.parse(req.url)
    if (pathname == '/favicon.ico') {
      return this.sendError(req, res)
    };
    const filepath = path.join(this.config.root, pathname)
    try {
      const statObj = await pro.stat(filepath)
      if (statObj.isDirectory()) {
        const dirObj = await pro.readdir(filepath)
        const files = dirObj.map(o => {
          return {
            name: o,
            path: path.join(pathname, o)
          }
        })
        const temPage = this._tmp(files)
        res.setHeader('Content-Type', 'text/html')
        res.end(temPage)
      } else {
        this.sendFile(req, res, filepath, statObj)
      }
    } catch (error) {
      debug(inspect(error))
      this.sendError(req, res)
    }
  }

  sendError (req, res) {
    res.statusCode = 500
    res.end('wrong in server')
  }

  sendFile (req, res, filepath, statObj) {
    res.setHeader('Content-Type', mime.getType(filepath))
    fs.createReadStream(filepath).pipe(res)
  }
  // Numjucks  的模板  路径问题
  _tmp (data) {
    return nunjucks.renderString(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <ul>
            {% for item in data %}
            <li>
                <a href="{{item.path}}">{{item.name}}</a>
            </li>
            {% endfor %}
        </ul>
    </body>
    </html>`, {
      data
    })
  }
}

// const server = new Server();
module.exports = Server
