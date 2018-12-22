const express = require('express');
const socket = require('socket.io');
const body_parser = require('body-parser');
const Game = require('./game');
const Database = require('./database');
const User = require('./user')

var app = express();
var server = app.listen(3000);
var io = socket(server);

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

//-------------------------------//

const database = new Database();
const game = new Game(database, io);

database.connect(() => {
    game.start(true);
});

io.sockets.on('connection', (socket) => {
    console.log("id: ", socket.id);

    socket.on('reduce-deadline', (app_json) => {
        if(app_json) {
            database.getUser(app_json.user_id, (user_json) => {
                if(user_json.properties.spendable.pp > 0) {
                    let user = new User(game);
                    user.setUser(user_json);
                    user.spentPP();
                    game.getDeadlineTimer().reduce();
                }
            });
        }
    });

    socket.on('vote', (app_json) => {
        if(app_json) {
            database.getUser(app_json.user_id, (user_json) => {
                if(user_json.properties.spendable.ip > 0) {
                    let user = new User(game);
                    user.setUser(user_json);
                    user.spentIP();

                    switch(app_json.vote) {
                    case "CLOCKWISE":
                        game.getPoll().rotateClockwise();
                        break;
                    case "COUNTERCLOCKWISE":
                        game.getPoll().rotateCounterclockwise();
                        break;
                    }
                }
            });
        }
    });

    socket.on('split-pp', (app_json) => {
        if(app_json) {
            database.getUser(app_json.user_id, (user_json) => {
                if(user_json.properties.spendable.pp > 0) {
                    let user = new User(game);
                    user.setUser(user_json);
                    user.splitPP();
                }
            });
        }
    });

    socket.on('vote', (app_json) => {
        if(app_json) {
            database.getUser(app_json.user_id, (user_json) => {
                if(user_json.properties.spendable.pp > 0) {

                }
            });
        }
    });

});