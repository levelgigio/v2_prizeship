'use strict'
const config = require('./configuracao.json').Saver;

module.exports = class Saver {
    constructor(database) {
        console.log("Criando o saver...");
        this._database = database;

        this._timers = [];
        this._polls = [];
        this._naves = [];
    }

    _update(callback) {
        for(var i = 0; i < this._timers.length; i++) 
            this._database.saveTimer(this._timers[i].getTimerJson());
        for(var i = 0; i < this._polls.length; i++) 
            this._database.savePoll(this._polls[i].getPollJson());
        for(var i = 0; i < this._naves.length; i++) 
            this._database.saveNave(this._naves[i].getNaveJson());
            
        this.save();
    }
    
    save() {
        setTimeout(this._update.bind(this), config.SAVER_AMOSTRAGEM_EM_MILISSEGUNDOS);
    }
    
    addTimer(timer) {
        this._timers.push(timer);
    }
    
    addPoll(poll) {
        this._polls.push(poll);
    }
    
    addNave(nave) {
        this._naves.push(nave);
    }
    
    setDatabase(database) {
        this._database = database;
    }

}