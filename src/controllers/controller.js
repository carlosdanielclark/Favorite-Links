const express = require('express'); //Import express
const app = express(); //Retorna una app de express
const pool = require('../mysql/mysql_connect');
const controller = {};

controller.ini = (req, res) => {
    res.render('index');
}

module.exports = controller;