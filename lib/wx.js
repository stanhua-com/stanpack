// lib/wx.js

'use strict'

const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

const fileUtil = require('./utils/file')

const uglifyUtil = require('./utils/uglify')
const sassUtil = require('./utils/sass')

module.exports = function (args) {
  // 模式(dev,package)
  let mode = args[3] || 'dev'
  // 保存路径名
  let fileDir = args[4] || 'package'
  // sass data文件路径
  let dataFilePath = args[5] || './styles/variables.scss'

  const cwd = process.cwd()

  const savePathName = path.resolve(cwd, `../${path.basename(cwd)}_${fileDir}`)

  rimraf.sync(savePathName)

  uglifyUtil(savePathName, mode === 'package')

  fileUtil.readFile(cwd, (file, extname) => {
    let fileName = path.join(savePathName, file.replace(cwd, ''))
    if (extname === '.scss') {
      sassUtil(file, dataFilePath, fileDir, 'wxss')
    }
    else if (extname === '.wxml') {
      fs.copyFileSync(file, fileName)
      console.info(`${fileName} created.`)
    }
  }, [fileDir])

  if (fs.existsSync(path.join(cwd, 'images'))) {
    fileUtil.copyFile(path.join(cwd, 'images'), path.join(savePathName, 'images'))
  }
}
