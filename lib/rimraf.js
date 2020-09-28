// lib/rimraf.js

'use strict'

const path = require('path')
const rimraf = require('rimraf')

module.exports = function (args) {
  // 文件或文件夹名
  const fileDir = args[3] || 'dist'

  const cwd = process.cwd()

  const pathName = path.resolve(cwd, fileDir)

  rimraf.sync(pathName)

  console.info(`${pathName} deleted successfully.`)
}
