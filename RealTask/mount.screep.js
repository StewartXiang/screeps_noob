// [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE],
// require("taskSet");
module.exports = function () {
    _.assign(Creep.prototype, mountCreep)
};

const mountCreep = {
    set role(role) {
        this.memory.role = role;
    },
    get role() {
        const role = this.memory.role;
        if (role){
            return role
        }
    },

    set task(task) {
        this.memory.task = task;
    },
    get task() {
        let task = this.memory.task;
        if (!task){
            task = {
                name: "spawn",
                args: {},
                status: "initTask",
            };
            this.task = task;
        }
        return task;
    },

    takeTask() {
        this.taskSet[this.role]();
    },


    run() {
        let task = this.task;
        if (!task){
            this.takeTask();
        }
        if (this.spawning){
            return true;
        }
        this.work[task.name](task.args)
    },

}