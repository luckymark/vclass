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
            var targetIp = ip.or(ip.mask(me.ip, "255.255.255.0"), "0.0.0." + i)
            var targetUrl = "http://" + targetIp + ":3001/hello"
            request.post({url: targetUrl, body: me}
                , function (error, response, body) {
                    if (!error) {
                        classroom.saveNode(body)
                    } else {
                        //console.log('sayHello error :' + error)
                    }

                })
        }
    },
    broadcast: function () {
        for (var i in this.nodes) {
            var node=this.nodes[i]
            var targetUrl = "http://" + node.ip + ":3001/hello"
            request.post({url: targetUrl, body: me}
                , function (error, response, body) {
                    if (!error) {
                        classroom.saveNode(body)
                    } else {
                        console.log('sayHello error :' + error)
                    }

                })
        }

    },
    saveNode: function (node) {
        this.nodes[node.ip] = node
        console.log(node)
    }
}

module.exports = classroom