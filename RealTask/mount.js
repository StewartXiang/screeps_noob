const mountRoom = require("mount.room");
const mountCreep = require("mount.screep");
const mountTask = require("taskSet");
const mountDigger = require("digger");

module.exports = function () {
    if (!global.hasMount){
        console.log("remount!");
        global.hasMount = true;
        mountRoom();
        mountTask();
        mountCreep();
        mountDigger();
    }
}