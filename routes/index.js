'use strict';
let express = require('express'),
    router = express.Router();

let taskRouter = require('./task');
let logRouter = require('./log');
let audioRouter = require('./audio');

router.all('*', (req, res, next) => {
    console.log('router.all: set public property.');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

taskRouter(router);  // 任务管理器
logRouter(router);   // 记事本管理器
audioRouter(router); // 音乐播放器

module.exports = router;
