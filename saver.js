'use strict'
const config = require('./configuracao.json').Saver;

module.exports = class Saver {
    constructor(database) {
        console.log("Criando o saver...");
        this._database = database;

        this._prizes = [];
        this._timers = [];
        this._polls = [];
        this._wheels = [];
        this._charts = [];
    }

    _update() {
        for(var i = 0; i < this._timers.length; i++) 
            this._database.saveTimer(this._timers[i].getTimerJson());
        for(var i = 0; i < this._polls.length; i++) 
            this._database.savePoll(this._polls[i].getPollJson());
        for(var i = 0; i < this._wheels.length; i++) 
            this._database.saveWheel(this._wheels[i].getWheelJson());
        for(var i = 0; i < this._charts.length; i++) 
            this._database.saveChart(this._charts[i].getPontos());
        for(var i = 0; i < this._prizes.length; i++) 
            this._database.savePrize(this._prizes[i].getPrizeJson());    

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
    
    addWheel(wheel) {
        this._wheels.push(wheel);
    }

    addChart(chart) {
        this._charts.push(chart);
    }

    addPrize(prize) {
        this._prizes.push(prize);
    }
    
    setDatabase(database) {
        this._database = database;
    }

}