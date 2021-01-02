#!/usr/bin/env node

const commander = require('commander')

const pkg = require('../package.json')
const serveLib = require('../lib/serve')
const wxLib = require('../lib/wx')
const antLib = require('../lib/ant')
const jslistLib = require('../lib/jslist')
const lineLib = require('../lib/line')
const rmLib = require('../lib/rm')

const program = new commander.Command()

program
  .version(pkg.version)
  .usage('<command> [options]')
  .command('serve')
  .description('Service package')
  .action(function () { serveLib() })

program
  .command('weapp [mode] [folderNameSuffix] [sassDataPath]')
  .description('WeChat applet package')
  .action(function () { wxLib(process.argv) })

program
  .command('antapp [mode] [folderNameSuffix] [sassDataPath]')
  .description('Alipay applet package')
  .action(function () { antLib(process.argv) })

program
  .command('jslist [folderName] [isExt]')
  .description('Statistic list of js files in specified folder')
  .action(function () { jslistLib(process.argv) })

program
  .command('line [exts]')
  .description('Count the number of code comment lines and blanks')
  .action(function () { lineLib(process.argv) })

program
  .command('rm [filePath]')
  .description('Delete files or folders')
  .action(function () { rmLib(process.argv) })

program.parse(process.argv)