// lib/utils/uglify.js

'use strict'

const fs = require('fs')
const path = require('path')
const UglifyJS = require('uglify-es')

const fileUtil = require('./file')

/**
 * js和json文件最小化
 * @param {String} folderNameSuffix    保存文件夹名后缀
 * @param {Boolean} isUglify  是否最小化
 */
module.exports = (folderNameSuffix, isUglify = true) => {
  const cwd = process.cwd()

  fileUtil.readFile(cwd, (file, extname) => {
    let fileName = path.join(folderNameSuffix, file.replace(cwd, ''))
    if (extname === '.js') {
      if (file.indexOf('.min.js') > -1) isUglify = false
      let code = fs.readFileSync(file, 'utf8')
      if (fileUtil.createDir(path.dirname(fileName))) {
        if (isUglify) {
          let result = UglifyJS.minify(code, {
            // toplevel: true,
            compress: {
              drop_console: true
            }
          })
          if (result.error) {
            console.error(result.error)
            result = null
            process.exit(1)
            return
          }

          fs.writeFileSync(fileName, result.code)
          result = null
        }
        else {
          fs.writeFileSync(fileName, code)
        }
      }

      console.info(`${fileName} created.`)

      code = null
    }
    else if (extname === '.json') {
      if (file.indexOf('package-lock.json') > -1) return

      let code = fs.readFileSync(file, 'utf8')

      if (fileUtil.createDir(path.dirname(fileName))) {
        if (isUglify) {
          code = JSON.stringify(JSON.parse(code))
        }
        fs.writeFileSync(fileName, code)
      }

      console.info(`${fileName} created.`)

      code = null
    }
  }, [folderNameSuffix])
}
