/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	       // creep.memory.building_num = Math.floor(Math.random()*5);
	        creep.memory.building_num = 0;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
			const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			const needs = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.hits / structure.hitsMax < 0.5) && 
                    (structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_ROAD ||
                        structure.structureType == STRUCTURE_RAMPART ||
                        // structure.structureType == STRUCTURE_WALL ||
                        structure.structureType == STRUCTURE_TOWER);
                }
            });
            const needs2 = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.hits / structure.hitsMax < 0.00005) &&
                        structure.structureType == STRUCTURE_WALL;
                }})
            if (needs.length){
                const status = creep.repair(needs[0]);
                if(status == ERR_NOT_IN_RANGE){
                    creep.moveTo(needs[0],  {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
// 			// console.log("targets: ",  targets);
            else if(targets.length) {
				const n = creep.memory.building_num;
				// const n = 1;
				console.log(targets[n]);
                if(creep.build(targets[n]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[n], {visualizePathStyle: {stroke: '#ffffff'}});
                }else if(creep.build(targets[n]) == ERR_INVALID_TARGET){
                // 	creep.memory.building_num = Math.floor(Math.random()*5);
                	creep.memory.building_num = 0;
				}
            } else if(needs2.length){

                const status = creep.repair(needs2[0]);
                if(status == ERR_NOT_IN_RANGE){
                    creep.moveTo(needs2[0],  {visualizePathStyle: {stroke: '#ffffff'}});
                }
            	// Room.createConstructionSite();
			}
	    } else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }else if(creep.harvest(sources[1]) == ERR_NOT_ENOUGH_RESOURCES) {
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
	    }
	}
};

module.exports = roleBuilder;