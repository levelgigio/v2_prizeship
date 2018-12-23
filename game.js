'use strict';

const Prize = require('./prize');
const Wheel = require('./wheel');
const Saver = require('./saver');
const Poll = require('./poll');
const CDTimer = require('./cd_timer');
const DeadlineTimer = require('./deadline_timer');
const Chart = require('./chart');

module.exports = class Game {
    constructor(database, sockets) {
        console.log("Criando o jogo...");
        this._prize = new Prize();
        this._wheel = new Wheel();
        this._saver = new Saver(database);
        this._poll = new Poll(this);
        this._cd_timer = new CDTimer(this);
        this._deadline_timer = new DeadlineTimer(this);
        this._chart = new Chart(this);
        
        this._database = database;
        this._sockets = sockets;
    }

    getWheel() {
        return this._wheel;
    }

    getPoll() {
        return this._poll;
    }

    getChart() {
        return this._chart;
    }

    getDeadlineTimer() {
        return this._deadline_timer;
    }

    getPrize() {
        return this._prize;
    }

    getDatabase() {
        return this._database;
    }

    getCDTimer() {
        return this._cd_timer;
    }

    start(start_new) {
        var self = this;
        // ------------------------------PRIZE-----------------------------//
        if(!start_new) {
            this._database.getPrize((prize_json) => {
                self._prize.setPrize(prize_json);
            });
        }
        this._saver.addPrize(this._prize);
        // ------------------------------WHEEL-----------------------------//
        if(!start_new) {
            this._database.getWheel((wheel_json) => {
                self._wheel.setWheel(wheel_json);
            });
        }
        this._saver.addWheel(this._wheel);
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
            });
        }
        this._saver.addTimer(this._deadline_timer);
        // ---------------------------CHART--------------------------//
        if(!start_new) {
            this._database.getChart((chart_array) => {
                self._chart.setChart(chart_array);
            });
        }
        this._saver.addChart(this._chart);


        this._saver.save();
    }
}