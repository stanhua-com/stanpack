// lib/ant.js

'use strict'

const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

const fileUtil = require('../utils/file')

const uglifyUtil = require('../utils/uglify')
const sassUtil = require('../utils/sass')

/**
 * 支付宝小程序打包
 * @param mode               模式(dev,package)
 * @param folderNameSuffix   保存文件夹名后缀
 * @param sassDataPath       sass data文件路径
 */
module.exports = function (args) {
  // 模式(dev,package)
  const mode = args[3] || 'dev'
  // 保存文件夹名后缀
  const folderNameSuffix = args[4] || 'package'
  // sass data文件路径
  const sassDataPath = args[5] || './styles/variables.scss'

  const cwd = process.cwd()
  const savePathName = path.resolve(cwd, `../${path.basename(cwd)}_${folderNameSuffix}`)

  // 删除已存在的文件夹
  rimraf.sync(savePathName)

  // js,json最小化
  uglifyUtil(savePathName, mode === 'package')

  fileUtil.readFile(cwd, (file, extname) => {
    let fileName = path.join(savePathName, file.replace(cwd, ''))
    if (extname === '.scss') {
      sassUtil(file, sassDataPath, folderNameSuffix, 'acss')
    }
    else if (extname === '.axml') {
      fs.copyFileSync(file, fileName)
      console.info(`${fileName} created.`)
    }
  }, [folderNameSuffix])

  if (fs.existsSync(path.join(cwd, 'images'))) {
    fileUtil.copyFile(path.join(cwd, 'images'), path.join(savePathName, 'images'))
  }
}
