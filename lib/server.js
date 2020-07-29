// lib/server.js

'use strict'

const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

const fileUtil = require('./utils/file')

const uglifyUtil = require('./utils/uglify')

module.exports = function (args) {
  // 保存路径名
  let fileDir = args[3] || 'build'

  rimraf.sync(fileDir)

  uglifyUtil(fileDir)

  const cwd = process.cwd()

  if (fs.existsSync(path.join(cwd, 'public'))) {
    fileUtil.copyFile(path.join(cwd, 'public'), path.join(cwd, fileDir, 'public'))
  }
}
