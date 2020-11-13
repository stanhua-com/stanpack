// lib/jslist.js

'use strict'

const fs = require('fs')
const path = require('path')

const fileUtil = require('../utils/file')

/**
 * 统计指定文件夹js文件列表
 * @param folderName   文件夹名
 * @param isExt        是否显示扩展名
 */
module.exports = function (args) {
  // 文件夹名
  const folderName = args[3] || 'pages'
  // 是否显示扩展名
  const isExt = args[4] || false

  const cwd = process.cwd()
  let folderNamePath = path.join(cwd, folderName)
  if (!fs.existsSync(folderNamePath)) {
    console.error(`${folderNamePath} does not exist.`)
    return
  }

  let list = []
  fileUtil.readFile(folderNamePath, (file, extname) => {
    if (extname === '.js') {
      let name = file.replace(cwd + '\\', '').replace(extname, '').replace(/\\/g, '/')
      list.push(name + (isExt ? '.js' : ''))
    }
  })
  fs.writeFileSync(path.join(cwd, 'pages-bak.json'), JSON.stringify(list))
}
