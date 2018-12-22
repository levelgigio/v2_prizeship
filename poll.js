'use strict';
const config = require('./configuracao.json').Poll;

module.exports = class Poll {
    constructor(game) {
        console.log("Criando a poll...");
        this._game = game;

        this._clockwise = 0;
        this._counterclockwise = 0;
        this._ip_spent = 0;
    }

    rotateClockwise(quant) {
        if(quant) {
            this._clockwise += quant;
            this._ip_spent += quant;
        }
        else {
            this._clockwise++;
            this._ip_spent++;
        }
    }

    rotateCounterclockwise(quant) {
        if(quant) {
            this._counterclockwise += quant;
            this._ip_spent += quant;
        }
        else {
            this._counterclockwise++;
            this._ip_spent++;
        }
    }

    setPoll(poll_json) {
        this._clockwise = poll_json.clockwise;
        this._counterclockwise = poll_json.counterclockwise;
        this._ip_spent = poll_json.ip_spent;
    }

    getPollJson() {
        return {
            clockwise: this._clockwise,
            counterclockwise: this._counterclockwise,
            ip_spent: this._ip_spent,
        };
    }

    closePoll() {
        if (this._clockwise > this._counterclockwise)
            this._game.getWheel().rotateClockwise();

        else if ( this._clockwise < this._counterclockwise ) 
            this._game.getWheel().rotateCounterclockwise();
        
        this._reset();
    }

    _reset() {
        this._clockwise = 0;
        this._counterclockwise = 0;
        this._ip_spent = 0;
    }
}