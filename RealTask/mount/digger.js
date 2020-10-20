module.exports = function () {
    _.assign(Creep.prototype, mountDigger)
}


const mountDigger = {
    dig: {
        initTask: function (){
            this.say("init dig");
            this.status = "go";
            this.go();
        },
        go: function (){
            const ctn = Game.getObjectById(this.args.container);
            if (this.pos !== ctn.pos){
                this.moveTo(ctn);
            }else {
                this.status = "dig";
                // this.dig.dig();
            }
        },
        dig: function (){
            const ctn = Game.getObjectById(this.args.container);
            const ssc = Game.getObjectById(this.args.source);
            if (this.pos !== ctn.pos){
                this.status = "dig";
            }else if (ssc.energy < 1){
                this.status = "relax";
            }else{
                this.harvest(ssc);
            }
        },
        relax: function (){
            const ctn = Game.getObjectById(this.args.container);
            const ssc = Game.getObjectById(this.args.source);
            if (ctn.hits < ctn.hitsMax){
                if (this.store.getUsedCapacity() === 0){
                    this.withdraw(ctn);
                }
                this.repair(ctn);
            } else if (ssc.energy > 1){
                this.status = "dig";
            }
        }
    }

}
