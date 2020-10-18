module.exports = function () {
    _.assign(Room.prototype, mountRoom)
}
const mountRoom = {
    // run() {
    // }
    getSource() {
        const sources = this.find(FIND_SOURCES);
        this.memory.sources = [];
        for (let i=0; i<sources.length; i++){
            let s = sources[i];
            let area = this.lookAtArea(
                s.pos.y-1,
                s.pos.x-1,
                s.pos.y+1,
                s.pos.x+1,
                true,
            )
            let container = _.filter(area, (cube) => cube.structure.structureType === STRUCTURE_CONTAINER)
            if (container){
                container = container[0].id;
            }else {
                container = null;
            }
            let data = {
                _id: sources[i].id,
                container: container,
            }
            this.memory.sources.push(data);
        }
    },



}

// module.exports = mountRoom;