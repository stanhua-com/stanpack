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
 * @param {String} file              文件名
 * @param {String} dataPath          sass data文件路径
 * @param {String} outExt            输出格式
 * @param {String} folderNameSuffix  保存文件夹名后缀
 */
module.exports = (file, dataPath, folderNameSuffix, outExt = 'css') => {
  const cwd = process.cwd()
  if (file.indexOf('styles') > -1) return
  if (dataPath && file.indexOf(path.basename(dataPath)) > -1) return

  const savePathName = path.resolve(cwd, `../${path.basename(cwd)}_${folderNameSuffix}`)

  let fileName = path.join(savePathName, file.replace(cwd, ''))
  outExt = outExt.indexOf('.') > -1 ? outExt : `.${outExt}`
  fileName = fileName.replace('.scss', outExt)

  let result = sass.renderSync({
    file: file,
    // data: dataPath ? `@import "${dataPath}";` : null,
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
    result = null
    process.exit(1)
    return
  }

  console.info(`${fileName} created.`)
}
