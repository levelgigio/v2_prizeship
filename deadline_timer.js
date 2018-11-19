'use strict';
const REDUCAO_BASE_DEADLINE_EM_MILISSEGUNDOS = 3233000;
const DURACAO_JOGO_EM_DIAS = 365;

module.exports = class DeadlineTimer {
    constructor(game) {
        console.log("Criando o dealinetimer...");
        this._game = game;

        this._label = 'DeadlineTimer';
        this._current_reduction = REDUCAO_BASE_DEADLINE_EM_MILISSEGUNDOS;

        this._deadline = new Date();
        this._deadline.setDate(this._deadline.getDate() + DURACAO_JOGO_EM_DIAS);
    }

    reduce() {
        this._deadline.setTime(this._deadline.getTime()-this._current_reduction);
     }
 
     setTimer(timer_json) {
        this._deadline = timer_json.deadline;
        this._current_reduction = timer_json.current_reduction;
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