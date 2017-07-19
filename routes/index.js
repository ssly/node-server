'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// 各个模块的路由配置
// const userRouter = require('./user');
// const taskRouter = require('./task');
const logRouter = require('./log');
// const audioRouter = require('./audio');
const fileRouter = require('./file');

// 连接数据库
mongoose.connect('mongodb://119.23.51.115/ly', {useMongoClient: true});
const db = mongoose.connection;
db.once('open', () => {
    console.log('mongodb has been open.');
});

/**
 * 所有接口的入口，设置如开放跨域等信息
 */
router.all('*', (req, res, next) => {
    console.log('router.all: set public property.');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


// userRouter(router);  // 用户管理
// taskRouter(router);  // 任务管理器
logRouter(router);   // 记事本管理器
// audioRouter(router); // 音乐播放器
fileRouter(router);  // 文件上传

module.exports = router;
