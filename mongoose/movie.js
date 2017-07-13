'use strict';
const mongoose = require('mongoose');

// 创建schema模型
let MovieSchema = new mongoose.Schema({
    name: String,
    title: String,
    no: Number,
    meta: {
        createAt: {
            type: Date,
            default: new Date(),
        },
        updateAt: {
            type: Date,
            default: new Date(),
        }
    }
});

MovieSchema.pre('save', next => {
    console.log(this);
    if (this.new) {
        this.meta.createAt = this.meta.updateAt = new Date();
    } else {
        this.updateAt = new Date();
    }

    next();
});

MovieSchema.statics = {
    fetch (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById () {
        return this
            .findOne({_id: id})
            .exec(cb);
    }
}

const Movie = mongoose.model('Movie', MovieSchema, 'my_movie');

// 导出编译好的model
module.exports = Movie;