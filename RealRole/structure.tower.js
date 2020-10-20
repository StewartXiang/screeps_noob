const structureTower = {
    run: function (tower){
        const room = tower.room;
        let enemies = room.find(FIND_HOSTILE_CREEPS);
        if (enemies.length > 0){
            tower.attack(enemies[0]);
        }
    }
}

module.exports = structureTower