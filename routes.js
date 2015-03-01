'use strict'

var classroom = require('./classroom')
var me = require('./me')
var readFolder = require('./folder')
var fse = require('fs-extra')

module.exports = function (app) {
    app.post('/hello', function*() {
        classroom.saveNode(this.request.body)
        this.body = me
    })

    app.get('/file', function*() {
        var folder = []
        readFolder('', folder)
        this.body = folder
    })

    app.post('/getFileContent', function*() {
        var content = fse.readFileSync(__dirname + "/projects/" + this.request.body.path, {encoding: 'utf8'})
        this.body = content
    })

    app.get('/node', function*() {
        this.body = classroom.nodes
    })

    app.get('/user', function*() {
        this.body = me
    })

    app.post('/user', function*() {
        var user = this.request.body
        me.nickname = user.nickname
        me.studentId = user.studentId
        me.save()

        classroom.broadcast()
        classroom.saveNode(me)
        this.body = classroom.nodes
    })
}

