'use strict';

const Nave = require('./nave');
const Saver = require('./saver');
const Poll = require('./poll');
const CDTimer = require('./cd_timer');
const DeadlineTimer = require('./deadline_timer');
const Chart = require('./chart');

module.exports = class Game {
    constructor(database, sockets) {
        console.log("Criando o jogo...");
        this._nave = new Nave();
        this._saver = new Saver(database);
        this._poll = new Poll(this);
        this._cd_timer = new CDTimer(this);
        this._deadline_timer = new DeadlineTimer(this);
        this._chart = new Chart(this);
        
        this._database = database;
        this._sockets = sockets;
    }

    getNave() {
        return this._nave;
    }

    getPoll() {
        return this._poll;
    }

    getChart() {
        return this._chart;
    }

    start(start_new) {
        var self = this;
        // ------------------------------NAVE-----------------------------//
        if(!start_new) {
            this._database.getNave((nave_json) => {
                self._nave.setNave(nave_json);
            });
        }
        this._saver.addNave(this._nave);
        // ------------------------------POOL-----------------------------//
        if(!start_new) {
            this._database.getPoll((poll_json) => {
                self._poll.setPoll(poll_json);
            });
        }
        this._saver.addPoll(this._poll);
        // ------------------------------CDTIMER-----------------------------//
        if(!start_new) {
            this._database.getTimer('CDTimer', (cd_timer_json) => {
                self._cd_timer.setTimer(cd_timer_json);
            });
        }
        this._cd_timer.begin();
        this._saver.addTimer(this._cd_timer);
        // ---------------------------DEADLINETIMER--------------------------//
        if(!start_new) {
            this._database.getTimer('DeadlineTimer', (deadlinetimer_timer_json) => {
                self._deadline_timer.setTimer(deadlinetimer_timer_json);
                console.log("aaa ", deadlinetimer_timer_json);
            });
        }
        this._saver.addTimer(this._deadline_timer);
        // ---------------------------CHART--------------------------//
        if(!start_new) {
            this._database.getChart((chart_array) => {
                self._chart.setChart(chart_array);
                console.log(self._chart.getPontos());
            });
        }
        this._saver.addChart(this._chart);


        this._saver.save();
    }

}