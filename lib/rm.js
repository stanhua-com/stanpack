// lib/rm.js

'use strict'

const path = require('path')
const rimraf = require('rimraf')

/**
 * 删除文件或文件夹
 * @param filePath 文件或文件夹路径
 */
module.exports = function (args) {
  // 文件或文件夹
  const filePath = args[3] || 'dist'

  const cwd = process.cwd()
  const pathName = path.resolve(cwd, filePath)

  console.info(`${pathName}  is being deleted...`)
  // 删除已存在的文件夹
  rimraf.sync(pathName)
  console.info(`${pathName} deleted successfully.`)
}
