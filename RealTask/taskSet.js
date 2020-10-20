// [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE],
module.exports = function () {
    _.assign(Creep.prototype, mountCreepTask)
}

const mountCreepTask = {
    taskSet: {
        worker: function (){

        },
        digger: function (){
            let diggers = _.filter(Game.creeps, (creep) => creep.role === "digger")
            let unDigging = _.filter(
                this.room.source,
                (s) => {
                    for (let i=0; i<diggers.length; i++){
                        if (diggers[i].task.args["target"] === s._id){
                            return false;
                        }
                    }
                    return true;
                }
            )
            if (!unDigging){
                return {
                    name: "standby",
                    args: {},
                    status: "initTask",
                }
            }
            const unDiggingObj = unDigging.map((s) => Game.getObjectById(s._id));
            const closest = this.pos.findClosestByPath(unDiggingObj);
            const ctn = _.filter(
                unDigging,
                (s) => s._id === closest.id
            )[0].container
            return {
                name: "dig",
                args: {
                    source: closest.id,
                    container: ctn,
                },
                status: "initTask",
            }
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

    get args(){
        return this.memory.task.args;
    }
}