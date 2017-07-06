'use strict';
const  express = require('express');
const router = express.Router();

const userRouter = require('./user');
const taskRouter = require('./task');
const logRouter = require('./log');
const audioRouter = require('./audio');
const fileRouter = require('./file');

router.all('*', (req, res, next) => {
    console.log('router.all: set public property.');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

userRouter(router);  // 用户管理
taskRouter(router);  // 任务管理器
logRouter(router);   // 记事本管理器
audioRouter(router); // 音乐播放器
fileRouter(router);  // 文件上传

module.exports = router;
