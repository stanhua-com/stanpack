// lib/line.js

'use strict'

const fs = require('fs')

const fileUtil = require('./utils/file')

module.exports = function (args) {
  // 后面的所有参数都是文件后缀
  const types = args.splice(3) || []
  const cwd = process.cwd()
  // 总计
  let total = {
    path: 'total',
    length: 0,
    comment: 0,
    blank: 0,
    percent: 1,
    commentPercent: 1,
    blankPercent: 1
  }
  // 统计结果
  let result = []

  // 文件统计结果
  let fileResult = {}

  fileUtil.readFile(cwd, (file, extname) => {
    if (types.length && !types.includes(extname)) return
    let code = fs.readFileSync(file).toString()

    const lines = code.split('\n')
    // 空白
    const blanklines = lines.filter(line => line.trim() === '')
    // 匹配出注释的行数
    const commentNum = lines.filter(line => new RegExp('^(//|/\\*|\\*|\\*/)', 'g').test(line.trimStart())).length

    let o = {
      path: file,
      length: lines.length,
      comment: commentNum,
      blank: blanklines.length,
      percent: (Math.round((lines.length - commentNum - blanklines.length) / lines.length * 10000) / 100),
      commentPercent: (Math.round(commentNum / lines.length * 10000) / 100),
      blankPercent: (Math.round(blanklines.length / lines.length * 10000) / 100)
    }

    result.push(o)

    !fileResult[extname] && (fileResult[extname] = [])
    fileResult[extname].push(o)

    total.length += lines.length
    total.comment += commentNum
    total.blank += blanklines.length
  })

  total.percent = (Math.round((total.length - total.comment - total.blank) / total.length * 10000) / 100)
  total.commentPercent = (Math.round(total.comment / total.length * 10000) / 100)
  total.blankPercent = (Math.round(total.blank / total.length * 10000) / 100)

  result.push(total)
  console.table(result)

  let fileStatistics = []
  for (const key in fileResult) {
    const list = fileResult[key]
    let o = {
      extension: key,
      length: list.map(l => l.length).reduce((p, n) => p + n),
      comment: list.map(l => l.comment).reduce((p, n) => p + n),
      blank: list.map(l => l.blank).reduce((p, n) => p + n)
    }
    o.percent = (Math.round((o.length - o.comment - o.blank) / o.length * 10000) / 100)
    o.commentPercent = (Math.round(o.comment / o.length * 10000) / 100)
    o.blankPercent = (Math.round(o.blank / o.length * 10000) / 100)

    fileStatistics.push(o)
  }

  fileStatistics.push({
    extension: 'total',
    length: total.length,
    comment: total.comment,
    blank: total.blank,
    percent: '-',
    commentPercent: '-',
    blankPercent: '-'
  })
  console.table(fileStatistics)
}
