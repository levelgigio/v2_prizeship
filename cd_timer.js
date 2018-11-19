'use strict'
const CD_TIMER_DURACAO = 15000;
const CD_TIMER_AMOSTRAGEM = 50;

module.exports = class CDTimer {
    constructor(game) {
        console.log("Criando o cdtimer...");
        this._game = game;

        this._label = 'CDTimer';
        this._tempo_restante = null;
        this._duracao = CD_TIMER_DURACAO;
        this._reference = new Date();
    }

    begin() {
        var now = new Date().getTime();
        this._tempo_restante = this._duracao + this._reference.getTime() - now;

        if(this._tempo_restante <= 0){
            this._reference = new Date();
            this._game.getPoll().closePoll();
        }
        setTimeout(this.begin.bind(this), CD_TIMER_AMOSTRAGEM);
    }

    setTimer(cd_timer_json) {
        this._tempo_restante = cd_timer_json.values.tempo_restante;
        this._duracao = cd_timer_json.values.duracao;
        this._reference = cd_timer_json.values.reference;
    }

    getTimerJson() {
        return {
            label: this._label,
            values: {
                tempo_restante: this._tempo_restante,
                duration: this._duracao,
                reference: this._reference,
            },
        };
    }

}