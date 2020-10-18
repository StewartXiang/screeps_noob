// [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE],
module.exports = function () {
    _.assign(Creep.prototype, mountCreepTask)
}

const mountCreepTask = {
    taskSet: {
        worker: function (){

        },
        digger: function (){

        },
        mover: function (){

        },
    },
    set status(status) {
        this.memory.task.status = status;
    },
    get status() {
        let status = this.memory.task.status;
        if (!status){
            status = "initTask";
            this.status(status);
        }
        return status
    },


}