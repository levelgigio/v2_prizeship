'use strict';

module.exports = class Poll {
    constructor(game) {
        console.log("Criando a poll...");
        this._game = game;

        this._subir = 0;
        this._descer = 0;
        this._ip_spent = 0;
    }

    subir(quant) {
        this._subir += quant;
        this._ip_spent += quant;
    }

    descer(quant) {
        this._descer += quant;
        this._ip_spent += quant;
    }

    setPoll(poll_json) {
        this._subir = poll_json.subir;
        this._descer = poll_json.descer;
        this._ip_spent = poll_json.ip_spent;
    }

    getPollJson() {
        return {
            subir: this._subir,
            descer: this._descer,
            ip_spent: this._ip_spent,
        };
    }

    closePoll() {
        if (this._subir > this._descer)
            this._game.getNave().subir();

        else if ( this._subir < this._descer ) 
            this._game.getNave().descer();
        
        this._reset();
    }

    _reset() {
        this._subir = 0;
        this._descer = 0;
        this._ip_spent = 0;
    }
}