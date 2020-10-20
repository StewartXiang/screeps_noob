var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            var sources = creep.room.find(FIND_SOURCES);
            // creep.memory.harvest_num = Math.floor(Math.random()*sources.length);
            creep.memory.harvest_num = 1;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }
	    if(!creep.memory.harvest_num){
            var sources = creep.room.find(FIND_SOURCES);
            creep.memory.harvest_num = 1;
            // creep.memory.harvest_num = Math.floor(Math.random()*sources.length);
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            var n = creep.memory.harvest_num;
            if(creep.harvest(sources[n]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[n], {visualizePathStyle: {stroke: '#ffaa00'}});
            }else if(creep.harvest(sources[1]) == ERR_NOT_ENOUGH_RESOURCES) {
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            const har_tar = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return (s.structureType == STRUCTURE_EXTENSION ||
                            s.structureType == STRUCTURE_SPAWN) &&
                        s.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            if (har_tar.length > 0 && harvesters.length < 2){
                creep.memory.role = "harvester";
            }
        }
	}
};

module.exports = roleUpgrader;