'use strict';
const express = require('express');
const router = express.Router();
const mongo = require('../mongodb');

// 各个模块的路由配置
// const taskRouter = require('./task');
// const audioRouter = require('./audio');

// 打开mongodb数据库，并获得db
mongo().then(db => {
    require('./task').init(router, db);  // 任务管理器
    // audioRouter(router); // 音乐播放器
    require('./file').init(router, db);  // 文件上传
    // require('./audio').init(router, db); // 音乐播放器
});

/**
 * 所有接口的入口，设置如开放跨域等信息
 */
router.all('*', (req, res, next) => {
    console.log('router.all: set public property.');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

module.exports = router;
