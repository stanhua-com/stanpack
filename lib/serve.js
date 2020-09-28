// lib/serve.js

'use strict'

const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

const fileUtil = require('./utils/file')

const uglifyUtil = require('./utils/uglify')

module.exports = function (args) {
  // 保存路径名
  const fileDir = args[3] || 'package'

  const cwd = process.cwd()

  const savePathName = path.resolve(cwd, `../${path.basename(cwd)}_${fileDir}`)

  rimraf.sync(savePathName)

  uglifyUtil(savePathName)

  if (fs.existsSync(path.join(cwd, 'public'))) {
    fileUtil.copyFile(path.join(cwd, 'public'), path.join(savePathName, 'public'))
  }
}
