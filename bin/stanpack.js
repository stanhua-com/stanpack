#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')
const serverLib = require('../lib/server')
const wxLib = require('../lib/wx')
const antLib = require('../lib/ant')
const pageLib = require('../lib/page')
const lineLib = require('../lib/line')

program
  .version(pkg.version)
  .usage('<command> [options]')
  .option('-s, --server [fileDir]', 'Server project packaging')
  .option('-w, --wx [mode] [fileDir] [dataFilePath]', 'Weixin project packaging')
  .option('-a, --ant [mode] [fileDir] [dataFilePath]', 'AntApp project packaging')
  .option('-p, --page', 'Project page list')
  .option('-l, --line [ext]', 'Statistics code line number')
  .parse(process.argv)

if (program.server) {
  serverLib(process.argv)
}
if (program.wx) {
  wxLib(process.argv)
}
if (program.ant) {
  antLib(process.argv)
}
if (program.page) {
  pageLib(process.argv)
}
if (program.line) {
  lineLib(process.argv)
}