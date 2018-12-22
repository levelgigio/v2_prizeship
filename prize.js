'use strict';
const config = require('./configuracao.json').Prize;

module.exports = class Prize {
    constructor() {
        console.log("Criando o prize...");

        this._total_pp_bought = 0;
        this._total_pp_spent = 0;
        this._total_ip_spent = 0;
    }

    bought(quant) {
        this._total_pp_bought+=quant;
    }

    spentPP(quant) {
        this._total_pp_spent+=quant;
    }

    spentIP(quant) {
        this._total_ip_spent+=quant;
    }

    getPrizeInReais() {
        return this._total_pp_bought*config.PP_PRICE_IN_REAIS*config.PRIZE_RATE;
    }

    getPrizeJson() {
        return {
            pp_bought: this._total_pp_bought,
            pp_spent: this._total_ip_spent,
            ip_spent: this._total_ip_spent
        };
    }

    setPrize(prize_json) {
        this._total_pp_bought = prize_json.pp_bought;
        this._total_pp_spent = prize_json.pp_spent;
        this._total_ip_spent = prize_json.ip_spent;
    }

}