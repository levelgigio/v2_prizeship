const express = require('express');
const socket = require('socket.io');
const body_parser = require('body-parser');
const Game = require('./Game');
const Database = require('./Database');

var app = express();
var server = app.listen(3000);
var io = socket(server);

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

//-------------------------------//

const database = new Database();
const game = new Game(database, io);

database.connect(() => {
    game.start(false);
});