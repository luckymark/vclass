/**
 * User: luckystar
 * Date: 15/2/16
 * Time: 下午11:13
 */
"use strict"

var fse = require('fs-extra')
var path = require('path')
var base = __dirname + '/projects'

function readFolder(pathName, folder) {
    var files = fse.readdirSync(pathName != '' ? (base + '/' + pathName) : base)
    for (var i in files) {
        var file = files[i]
        var stats = fse.statSync(base + '/' + pathName + '/' + file)

        var _path = pathName != '' ? (pathName + '/' + file) : file
        if (stats.isDirectory()) {
            var _folder = {path: _path, name: file, type: 'folder', children: []}
            folder.push(_folder)
            readFolder(_folder.path, _folder.children)
        } else if (isSourceFile(file)) {
            folder.push({path: _path, name: file, type: 'file'})
        }
    }
}

function isSourceFile(file) {
    var extname = path.extname(file)
    if (extname === '.c' || extname == '.cpp' || extname == '.cc' || extname == '.h') {
        return true
    }
    return false
}

module.exports = readFolder