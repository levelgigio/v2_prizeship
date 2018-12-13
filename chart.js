'use strict';
const config = require('./configuracao.json').Chart;

module.exports = class Chart {
    constructor(game) {
        console.log("Criando o chart...");

        this._game = game;
        this._pontos = [];
    }

    createPonto() {
        console.log("ponto");
        this._pontos.unshift({
            altitude: this._game.getNave().getAltitude(),
            date: new Date()
        });
        if(this._pontos.length > config.CHART_MAX_PONTOS)
            this._pontos.pop();
    }

    getPontos() {
        return this._pontos;
    }

    setChart(pontos_array) {
        this._pontos = pontos_array;
    }

}