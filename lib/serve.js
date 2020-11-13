// lib/serve.js

'use strict'

const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

const fileUtil = require('../utils/file')

const uglifyUtil = require('../utils/uglify')

module.exports = function () {
  const cwd = process.cwd()
  const savePathName = path.resolve(cwd, `../${path.basename(cwd)}_pkg`)

  // 删除已存在的文件夹
  rimraf.sync(savePathName)

  // js,json最小化
  uglifyUtil(savePathName)

  if (fs.existsSync(path.join(cwd, 'public'))) {
    fileUtil.copyFile(path.join(cwd, 'public'), path.join(savePathName, 'public'))
  }
}
