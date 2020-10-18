const mountRoom = require("RealTask/mount/mount.room")

module.exports = function () {
    if (!global.hasMount){
        console.log("remount!")
        global.hasMount = true
        mountRoom()
    }
}