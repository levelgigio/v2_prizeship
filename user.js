'use strict';
const config = require('./configuracao.json').User;
const prizeConfig = require('./configuracao.json').Prize;

module.exports = class User {
    constructor(game) {
        console.log("Criando um user...");
        this._game = game;

        this._user_id = null;
        this._ip = 0;
        this._pp = 0;
        this._ip_spent = 0;
        this._pp_spent = 0;
        this._final_guess = {
            min: 0,
            max: 0,
        };
        this._daily_guess = {
            min: 0,
            max: 0,
        };
    }

    spentIP(quant) {
        if(quant) {
            this._ip-=quant;
            this._ip_spent+=quant;
        }
        else {
            this._ip--;
            this._ip_spent++;
        }
        this._game.getPrize().spentIP(quant);
        this._game.getDatabase().updateUserProperties(this.getUserJson());
    }

    spentPP(quant) {
        if(quant) {
            this._pp-=quant;
            this._pp_spent+=quant;
        }
        else {
            this._pp--;
            this._pp_spent++;
        }
        this._game.getPrize().spentPP(quant);
        this._game.getDatabase().updateUserProperties(this.getUserJson());
    }

    splitPP(quant) {
        if(quant) {
            this._pp-=quant;
            this._pp_spent+=quant;
            this._ip+=quant*prizeConfig.PP_IN_IP;
        }
        else {
            this._pp--;
            this._pp_spent++;
            this._ip+=prizeConfig.PP_IN_IP;
        }
        this._game.getPrize().spentPP(quant);
        this._game.getDatabase().updateUserProperties(this.getUserJson());
    }

    setUser(user_json) {
        this._user_id = user_json.user_id;
        this._ip = user_json.properties.spendable.ip;
        this._pp = user_json.properties.spendable.pp;
        this._ip_spent = user_json.properties.spent.ip;
        this._pp_spent = user_json.properties.spent.pp;
        this._final_guess = user_json.properties.guesses.final_guess;
        this._daily_guess = user_json.properties.guesses.daily_guess;
    }

    getUserJson() {
        return {
            user_id: this._user_id,
            properties: {
                spendable: {
                    ip: this._ip,
                    pp: this._pp,
                },
                spent: {
                    ip: this._ip_spent,
                    pp: this._pp_spent,
                },
                guesses: {
                    final_guess: this._final_guess,
                    daily_guess: this._daily_guess,
                }
            }
        };
    }

}