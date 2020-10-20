var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var structureTower = require('structure.tower');

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == "builder");
    // console.log('Harvesters: ' + harvesters.length);
    // console.log("Upgraders: " + upgraders.length);

    if (upgraders.length + harvesters.length < 4) {
        var newName = "harvester" + Game.time;
        Game.spawns["XiangHome"].spawnCreep(
            // [WORK, CARRY, MOVE, MOVE],
            // [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            // [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            [WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            newName,
            {memory: {role: "harvester"}});
    }

    if (builders.length < 2){
        var newName = "builder" + Game.time;
        Game.spawns["XiangHome"].spawnCreep(
            // [WORK, WORK, CARRY, MOVE],
            // [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE],
            // [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            // [WORK, WORK, WORK, WORK,
            // CARRY, CARRY, CARRY, CARRY,
            // MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            [WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            
            newName,
            {memory: {role: "builder"}}
        );
    }


    // if(harvesters.length < 1) {
    //     var newName = 'Harvester' + Game.time;
    //     console.log('Spawning new harvester: ' + newName);
    //     Game.spawns['XiangBase'].spawnCreep([WORK,CARRY,MOVE], newName,
    //         {memory: {role: 'harvester'}});
    // }
    
    // if(Game.spawns['Home'].spawning) {
    //     var spawningCreep = Game.creeps[Game.spawns['Home'].spawning.name];
    //     Game.spawns['Home'].room.visual.text(
    //         '🛠️' + spawningCreep.memory.role,
    //         Game.spawns['Home'].pos.x + 1,
    //         Game.spawns['Home'].pos.y,
    //         {align: 'left', opacity: 0.8});
    // }


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == "builder"){
            roleBuilder.run(creep);
        }
    }

    for (let s in Game.structures){
        let structure = Game.structures[s];
        if (structure.structureType === STRUCTURE_TOWER){
            structureTower.run(structure);
        }
    }
}
