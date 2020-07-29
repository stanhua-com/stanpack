// lib/utils/sass.js

'use strict'

const fs = require('fs')
const path = require('path')
const sass = require('node-sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')

const fileUtil = require('./file')

/**
 * sass
 * @param {String} file          文件名
 * @param {String} dataFilePath  sass data文件路径
 * @param {String} outExt        输出格式
 * @param {String} fileDir       保存路径名
 */
module.exports = (file, dataFilePath, fileDir, outExt = 'css') => {
  const cwd = process.cwd()
  if (file.indexOf('styles') > -1) return
  if (dataFilePath && file.indexOf(path.basename(dataFilePath)) > -1) return

  let fileName = path.join(cwd, fileDir, file.replace(cwd, ''))
  outExt = outExt.indexOf('.') > -1 ? outExt : `.${outExt}`
  fileName = fileName.replace('.scss', outExt)

  let result = sass.renderSync({
    file: file,
    // data: dataFilePath ? `@import "${dataFilePath}";` : null,
    // includePaths: includePaths,
    outputStyle: 'compressed',
    outFile: null,
    sourceMap: false
  })

  if (result.css) {
    if (fileUtil.createDir(path.dirname(fileName))) {
      fs.writeFileSync(fileName, postcss([autoprefixer]).process(result.css))
    }
    result = null
  }
  else {
    console.error(result)
    process.exit(1)
    result = null
    return
  }

  console.info(`${fileName} created.`)
}
