'use strict'

var classroom = require('./classroom')
    , me = require('./me')
    , readFolder = require('./folder')
    , fse = require('fs-extra')

module.exports = function (app) {
    app.get('/file', function*() {
        var folder = []
        readFolder('', folder)
        this.body = folder
    })

    app.post('/getFileContent', function*() {
        var content = fse.readFileSync(__dirname + "/projects/" + this.request.body.path, {encoding: 'utf8'})
        this.body = content
    })

    app.get('/classroom', function*() {
        this.body = classroom
    })

    app.get('/user', function*() {
        this.body = me.name
    })

    app.post('/user', function*() {
        me.name = this.request.body.name
        this.status = 200
    })
}

