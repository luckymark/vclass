/**
 * User: luckystar
 * Date: 15/2/28
 * Time: 下午12:50
 */
"use strict"

var os = require('os')

var fse = require('fs-extra')
var ip = require('ip')
var me = fse.readJsonSync(__dirname + '/projects/me.json', {throws: false})

if (!me) {
    me = {}
}

function getPrimaryIp() {
    var nics = os.networkInterfaces()

    for (var i in nics) {
        var _ip = ip.address(i, 'IPv4')
        console.log(i+" ip:" + _ip)
        if (ip.mask(_ip, '255.255.0.0') == '192.168.0.0') {
            return _ip
        }
    }
    return null
}

me.ip = getPrimaryIp()
console.log('my ip:' + me.ip)

me.save = function () {
    fse.writeJsonSync(__dirname + '/projects/me.json', me)
}

module.exports = me