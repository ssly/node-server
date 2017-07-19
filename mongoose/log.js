'use strict';
const mongoose = require('mongoose');
let maxId = 0;

// 创建schema模型
let LogSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    name: String,
    text: String,
    createTime: {
        type: Number,
        default: Date.now(),
    },
});

/**
 * 保存前更新创建时间和更新时间
 */
LogSchema.pre('save', function (next) {
    this.id = ++maxId;
    this.createTime = Date.now();

    next();
});

let Log = mongoose.model('Log', LogSchema, 'log');

Log.find({}, (err, result) => {
    if (result.length === 0) {
        maxId = 0;
    } else if (result.length === 1) {
        maxId = result[0].id;
    } else {
        maxId = result.reduce((prev, next) => {
            return prev.id > next.id ? prev.id : next.id;
        });
    }
    console.log('最大id已经赋值：' + maxId);
});

module.exports = Log;