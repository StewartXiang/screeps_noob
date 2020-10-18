var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        console.log("2");
        //console.log(creep.store.getUsedCapacity())
        // if (!creep.memory.do){
        //     console.log(3);
        //     creep.memory.do == "transfer";
        // }
	    if((creep.store.getUsedCapacity(RESOURCE_ENERGY) < 50 && creep.memory.do == "transfer") || (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && creep.memory.do != "transfer" || (!creep.memory.target))){
	        console.log(33)
	        creep.memory.do = "har";
            var sources = creep.room.find(FIND_SOURCES);
            console.log(sources[0]);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_TOWER ||
                    structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            // console.log(targets, targets.length)
            if (targets.length > 0){
                // creep.memory.target = targets[-1].id;
                creep.memory.target = targets[Math.floor(Math.random() * targets.length)].id;
            } else {
                creep.memory.role = "upgrader";
            }
        }
        else {
            const target = Game.getObjectById(creep.memory.target);
            // creep.memory.num = Math.floor(Math.random()*)
            // var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.memory.do = "transfer";
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }else if (creep.transfer(target, RESOURCE_ENERGY) == ERR_FULL){
                // creep.moveTo(Math.floor(Math.random()*40+5), Math.floor(Math.random()*40+5));
                
                var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                console.log(11111);
                var harvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
                var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
                if (upgraders.length < 1 && harvester.length > 2){
                    creep.memory.role = "upgrader";
                }else if (targets.length > 0){
                // creep.memory.target = targets[-1].id;
                    creep.memory.target = targets[Math.floor(Math.random() * targets.length)].id;
                } else {
                    creep.memory.role = "upgrader";
                }
            }
        }
	}
};

module.exports = roleHarvester;