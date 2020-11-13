#!/usr/bin/env node

const { program } = require('commander')

const pkg = require('../package.json')
const serveLib = require('../lib/serve')
const wxLib = require('../lib/wx')
const antLib = require('../lib/ant')
const jslistLib = require('../lib/jslist')
const lineLib = require('../lib/line')
const rmLib = require('../lib/rm')

program
  .version(pkg.version)
  .usage('<command> [options]')
  .option('-s, --serve', 'Service package')
  .option('-w, --weapp [mode] [folderNameSuffix] [sassDataPath]', 'WeChat applet package')
  .option('-a, --antapp [mode] [folderNameSuffix] [sassDataPath]', 'Alipay applet package')
  .option('-j, --jslist [folderName] [isExt]', 'Statistic list of js files in specified folder')
  .option('-l, --line [exts]', 'Count the number of code comment lines and blanks')
  .option('-r, --rm [filePath]', 'Delete files or folders')

if (program.serve) serveLib()
if (program.weapp) wxLib(process.argv)
if (program.antapp) antLib(process.argv)
if (program.jslist) jslistLib(process.argv)
if (program.line) lineLib(process.argv)
if (program.rm) rmLib(process.argv)

program
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

program
  .command('help', { isDefault: true })
  .description('Print this help')
  .action(function () {
    program.outputHelp()
  })

program.parse(process.argv)