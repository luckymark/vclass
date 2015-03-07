/**
 * User: luckystar
 * Date: 15/2/28
 * Time: 下午12:03
 */
"use strict"

var ip = require('ip')
var request = require('request').defaults({json: true})

var me = require('./me')

var classroom = {
    nodes: {},
    sayHello: function () {
        for (var i = 2; i < 254; i++) {
            var targetUrl = "http://" + ip.or(ip.mask(me.ip, "255.255.255.0"), "0.0.0." + i) + ":3001/hello"
            hello(targetUrl)
        }
    },
    broadcast: function () {
        for (var i in this.nodes) {
            var targetUrl = "http://" + this.nodes[i].ip + ":3001/hello"
            hello(targetUrl)
        }
    },
    saveNode: function (node) {
        this.nodes[node.ip] = node
        console.log(node)
    }
}

function hello(targetUrl) {
    request.post({url: targetUrl, body: me}
        , function (error, response, body) {
            if (!error) {
                classroom.saveNode(body)
            } else {
                console.log('sayHello('+targetUrl+') error :' + error)
            }
        })
}

module.exports = classroom