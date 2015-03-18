/**
 * User: luckystar
 * Date: 15-2-21
 * Time: 下午16:08
 */
'use strict'

var app = require('koa')()
    , router = require('koa-router')
    , bodyParser = require('koa-bodyparser')
    , serve = require('koa-static')

app.use(bodyParser())
app.use(serve('./public', {maxage: 2 * 60 * 60 * 1000}))
app.use(router(app))

require('./routes')(app)

app.listen(3001)
console.log('vclass start on port 3001')







