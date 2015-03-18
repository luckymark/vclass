/**
 * User: luckystar
 * Date: 15/2/28
 * Time: 下午12:50
 */
"use strict"

var dgram = require('dgram')
    , server = dgram.createSocket('udp4')
    , client = dgram.createSocket('udp4')
    , classroom = require('./classroom')

var me = {
    name: "noname"
}

client.bind(function () {
    client.setBroadcast(true)

    setInterval(function () {
        var message = new Buffer(me.name ? me.name : "noname")
        client.send(message, 0, message.length, 3002, '255.255.255.255', function (err, bytes) {
            if (err) {
                console.log(err)
            }
        })
    }, 10000)
})

server.on('message', function (message, remote) {
    classroom[remote.address] = {ip: remote.address, user: message.toString('utf8')}
})

server.bind(3002)

module.exports = me