'use strict';

module.exports = class Database {
    constructor() {
        console.log("Criando a database...");
        this._MongoClient = require('mongodb').MongoClient;
        this._db = null;
    }

    connect(callback) {
        console.log("Conectando ao mongodb...");
        var self = this;
        this._MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (error, db) => {
            if (error)
                console.log("ERRO AO CONECTAR AO MONGO DB");
            else {
                self._db = db;
                if(callback)
                    callback();
            }    
        });
    }
    // ------------------------------NAVE-----------------------------//
    getNave(callback) {
        this._db.db('prizeship_v2').collection('nave').findOne( { nave: {$exists: true} }, (error, nave_json) => {
            if (error)
                console.log("ERRO NA CHAMADA DE 'findOne()' EM 'getNave()' --> database.js");
            else {
                if(nave_json){
                    if(callback)
                        callback(nave_json.nave);
                    else
                        console.log("'getNave()' NEEDS A CALLBACK --> database.js");
                }
                else
                    console.log("NAVE OBJECT NOT FOUND IN DB");
            }
        });
    }

    saveNave(nave_json) {
        if(nave_json)
            this._db.db('prizeship_v2').collection('nave').updateOne( { nave: {$exists: true}}, {$set : {nave: nave_json}}, {upsert: true});
        else
            console.log("TRYING TO SAVE TO DB AN UNDEFINED NAVE");
    }
    // ------------------------------POOL-----------------------------//
    getPoll(callback) {
        this._db.db('prizeship_v2').collection('poll').findOne( { poll: { $exists: true } }, (error, poll_json) => {
            if(error)
                console.log("ERRO NA CHAMADA DE 'findOne()' EM 'getPoll()' --> database.js");
            else {
                if(poll_json){
                    if(callback)
                        callback(poll_json.poll);                        
                    else
                        console.log("'getPoll()' NEEDS A CALLBACK --> database.js");
                }
                else
                    console.log("POLL OBJECT NOT FOUND IN DB");
            }
        });
    } 

    savePoll(poll_json) {
        if(poll_json)
            this._db.db('prizeship_v2').collection('poll').updateOne( { poll: {$exists: true}}, {$set : {poll : poll_json}}, {upsert: true});
        else
            console.log("TRYING TO SAVE TO DB AN UNDEFINED POLL");
    }
    // ------------------------------TIMERS-----------------------------//
    getTimer(label, callback) {
        this._db.db('prizeship_v2').collection('timers').findOne( { label: label }, (error, timer_json) => {
            if(error)
                console.log("ERRO NA CHAMADA DE 'findOne()' EM 'getTimer()' --> database.js");
            else {
                if(timer_json){
                    if(callback)
                        //o json do timer ja e o proprio objeto encontrado pela db
                        callback(timer_json);                        
                    else
                        console.log("'getTimer()' NEEDS A CALLBACK --> database.js");
                }
                else
                    console.log("TIMER OBJECT NOT FOUND IN DB");
            }
        });
    } 

    saveTimer(timer_json) {
        if(timer_json)
            this._db.db('prizeship_v2').collection('timers').updateOne( { label: timer_json.label }, {$set : {values : timer_json.values}}, {upsert: true});
        else
            console.log("TRYING TO SAVE TO DB AN UNDEFINED CDTIMER");
    }
    // ------------------------------CHART-----------------------------//
    getChart(callback) {
        this._db.db('prizeship_v2').collection('chart').findOne( { chart_array: {$exists: true}}, (error, chart) => {
            if(error)
                console.log("ERRO NA CHAMADA DE 'findOne()' EM 'getChart()' --> database.js");
            else {
                if(chart){
                    if(callback)
                        callback(chart.chart_array);                        
                    else
                        console.log("'getChart()' NEEDS A CALLBACK --> database.js");
                }
                else
                    console.log("CHART OBJECT NOT FOUND IN DB");
            }
        });
    } 

    saveChart(chart_array) {
        if(chart_array)
            this._db.db('prizeship_v2').collection('chart').updateOne( { chart_array: {$exists: true} }, {$set : {chart_array : chart_array}}, {upsert: true});
        else
            console.log("TRYING TO SAVE TO DB AN UNDEFINED CHART ARRAY");
    }
    // ------------------------------PRIZE-----------------------------//
    getPrize(callback) {
        this._db.db('prizeship_v2').collection('prize').findOne( { prize: {$exists: true}}, (error, prize) => {
            if(error)
                console.log("ERRO NA CHAMADA DE 'findOne()' EM 'getChart()' --> database.js");
            else {
                if(prize){
                    if(callback)
                        callback(prize.prize);                        
                    else
                        console.log("'getPrize()' NEEDS A CALLBACK --> database.js");
                }
                else
                    console.log("PRIZE OBJECT NOT FOUND IN DB");
            }
        });
    } 

    savePrize(prize_json) {
        if(prize_json)
            this._db.db('prizeship_v2').collection('prize').updateOne( { prize: {$exists: true} }, {$set : {prize : prize_json}}, {upsert: true});
        else
            console.log("TRYING TO SAVE TO DB AN UNDEFINED PRIZE");
    }
    // ------------------------------USER-----------------------------//
    getUser(user_id, callback) {
        this._db.db('prizeship_v2').collection('users').findOne( { user_id: user_id }, (error, user) => {
            if(error)
                console.log("ERRO NA CHAMADA DE 'findOne()' EM 'getUser()' --> database.js");
            else {
                if(user){
                    if(callback)
                        callback(user);                        
                    else
                        console.log("'getUser()' NEEDS A CALLBACK --> database.js");
                }
                else
                    console.log("USER OBJECT NOT FOUND IN DB");
            }
        });
    } 

    updateUserProperties(user_id, new_propeties) {
        if(user_id && new_propeties)
            this._db.db('prizeship_v2').collection('users').update({user_id: user_id}, {$set: {properties: new_propeties}});
    }
    
}