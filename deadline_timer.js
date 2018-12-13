'use strict';
const config = require('./configuracao.json').DeadlineTimer;

module.exports = class DeadlineTimer {
    constructor(game) {
        console.log("Criando o dealinetimer...");
        this._game = game;

        this._label = 'DeadlineTimer';
        this._current_reduction = config.DEADLINE_REDUCAO_EM_MILISSEGUNDOS;

        this._deadline = new Date();
        this._deadline.setDate(this._deadline.getDate() + config.DEADLINE_DURACAO_TOTAL_EM_DIAS);
    }

    reduce() {
        this._deadline.setTime(this._deadline.getTime()-this._current_reduction);
     }
 
     setTimer(timer_json) {
        this._deadline = timer_json.values.deadline;
        this._current_reduction = timer_json.values.current_reduction;
     }
 
     getTimerJson() {
         return {
            label: this._label,
            values: {
                deadline: this._deadline,
                current_reduction: this._current_reduction,
            },
         };
     }
}