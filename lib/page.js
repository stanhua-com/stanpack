// lib/page.js

'use strict'

const fs = require('fs')
const path = require('path')

const fileUtil = require('./utils/file')

module.exports = function () {

  const cwd = process.cwd()
  let list = []
  fileUtil.readFile(path.join(cwd, 'pages'), (file, extname) => {
    if (extname === '.js') {
      list.push(file.replace(cwd + '\\', '').replace(extname, '').replace(/\\/g, '/'))
    }
  })
  fs.writeFileSync(path.join(cwd, 'pages-bak.json'), JSON.stringify(list))
}
