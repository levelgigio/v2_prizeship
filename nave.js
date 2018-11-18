'use strict';

module.exports = class Nave {
    constructor() {
        console.log("Criando a nave...");
        this._altitude = 0;
        this._gas_default = 20;
        this._gas_extra = 0;
    }

    subir() {
        this._altitude += this._gas_default + this._gas_extra;
    }
    
    descer() {
        this._altitude -= this._gas_default + this._gas_extra;
    }
    
    getNaveJson() {
        return {
            altitude: this._altitude,
            gas_default: this._gas_default,
            gas_extra: this._gas_extra,
        };
    }
    
    getAltitude() {
        return this._altitude;
    }

    getGasDefault() {
        return this._gas_default;
    }

    getGasExtra() {
        return this._gas_extra;
    }
    
    setNave(nave_json) {
        this._altitude = nave_json._altitude;
        this._gas_default = nave_json._gas_default;
        this._gas_extra = nave_json._gas_extra;
    }
    
}