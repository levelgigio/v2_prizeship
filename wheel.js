'use strict';
const config = require('./configuracao.json').Wheel;

module.exports = class Wheel {
    constructor() {
        console.log("Criando o wheel...");
        this._interval = null;

        this._position = 0;
        this._weights = [];
        for(var i = 0; i < config.WHEEL_DIVISIONS; i++) 
            this._weights[i] = config.WHEEL_DEFAULT_WEIGHT;
    }

    _rotateClockwise() {
        if(this._weights[this._position] > 0) {
            this._weights[this._position]--;
        }
        else {
            this._weights[this._position] = config.WHEEL_DEFAULT_WEIGHT;
            this._position = (this._position - 1)%config.WHEEL_DIVISIONS;
            if(this._position < 0) {
                this._position = config.WHEEL_DIVISIONS;
            }
        }
    }

    _rotateCounterclockwise() {
        if(this._weights[this._position] > 0) {
            this._weights[this._position]--;
        }
        else {
            this._weights[this._position] = config.WHEEL_DEFAULT_WEIGHT;
            this._position = (this._position + 1)%config.WHEEL_DIVISIONS;
        }
    }

    rotateClockwise() {
        clearInterval(this._interval);
        this._interval = setInterval(this._rotateClockwise.bind(this), 1000);
    }
    
    rotateCounterclockwise() {
        clearInterval(this._interval);
        this._interval = setInterval(this._rotateCounterclockwise.bind(this), 1000);
    }
    
    addWeight(position, quant) {
        this._weights[position] += quant;
    }

    getPosition() {
        return this._position;
    }

    getWheelJson() {
        return {
            position: this._position,
            weights: this._weights
        };
    }
    
    setWheel(wheel_json) {
        this._position = wheel_json.position;
        this._weights = wheel_json.weights;
    }
    
}