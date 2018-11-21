'use strict'
const config = require('./configuracao.json').CDTimer;

module.exports = class CDTimer {
    constructor(game) {
        console.log("Criando o cdtimer...");
        this._game = game;

        this._label = 'CDTimer';
        this._tempo_restante = null;
        this._duracao = config.CD_TIMER_DURACAO_EM_MILISSEGUNDOS;
        this._reference = new Date();

        this.__aux = config.CD_TIMER_DIVISOES_CHART - 1;
    }

    begin() {
        var now = new Date().getTime();
        this._tempo_restante = this._duracao + this._reference.getTime() - now;            

        if(this._tempo_restante < this._duracao/config.CD_TIMER_DIVISOES_CHART * this.__aux) {
            this.__aux--;
            this._game.getChart().createPonto();
        }

        if(this._tempo_restante <= 0){
            this._reference = new Date();
            this._game.getPoll().closePoll();
            this.__aux = config.CD_TIMER_DIVISOES_CHART - 1;
        }
        setTimeout(this.begin.bind(this), config.CD_TIMER_AMOSTRAGEM_EM_MILISSEGUNDOS);
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