'use strict';

const Nave = require('./nave');
const Saver = require('./saver');
const Poll = require('./poll');
const CDTimer = require('./cd_timer');

module.exports = class Game {
    constructor(database, sockets) {
        console.log("Criando o jogo...");
        this._nave = new Nave();
        this._saver = new Saver(database);
        this._poll = new Poll(this);
        this._cd_timer = new CDTimer(this);
        
        this._database = database;
        this._sockets = sockets;
    }

    getNave() {
        return this._nave;
    }

    getPoll() {
        return this._poll;
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
                self._pool.setPoll(poll_json);
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

        this._saver.save();
    }

}