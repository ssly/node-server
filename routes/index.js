'use strict';
let express = require('express'),
    router = express.Router();

let userRouter = require('./user'),
    taskRouter = require('./task'),
    logRouter = require('./log'),
    audioRouter = require('./audio');

router.all('*', (req, res, next) => {
    console.log('router.all: set public property.');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

userRouter(router);  // 用户管理
taskRouter(router);  // 任务管理器
logRouter(router);   // 记事本管理器
audioRouter(router); // 音乐播放器

module.exports = router;
