'use strict';
let express = require('express'),
    router = express.Router();

// 连接mongodb数据库
let MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;
let dbUrl_ly = 'mongodb://120.77.243.63:27017/ly';

let fs = require('fs'),
    path = require('path'),
    url = require('url');

let jsmediatags = require('jsmediatags');

let baseUrl = path.resolve(__dirname, '..'); // 文件根目录位置


let music = (function Music() {
    console.log('加载音乐函数');
    let _this = {
        musicUrl: path.join(baseUrl, 'resource/mp3'), // 音乐目录
        /**
         * 获得某个目录下所有歌曲
         * @param 歌曲所在目录
         */
        getAllMusic(route, callback) { // route = '../resource/mp3'
            fs.readdir(route, (err, files) => {
                if (err) {
                    console.log(`err: ${err}`);
                    return null;
                } else {
                    // TODO 鉴别歌曲格式是否为音频格式
                    let musicNumber = files.length, // 歌曲总数量
                        musicJSON = '';
                    MongoClient.connect(dbUrl_ly, (err, db) => {
                        console.log(`打开数据库${db.s.databaseName}歌曲信息入库`);
                        if (err) { throw err; }
                        let table = db.collection('music_info');

                        table.deleteMany({}, (err, result) => {
                            console.log('清空数据库成功');
                            let count = 0; // 判定已加载歌曲
                            let musicArr = [];
                            files.forEach((file) => {
                                let src = path.join(route, file);
                                jsmediatags.read(src, {
                                    onSuccess(data) {
                                        musicArr.push({
                                            title: data.tags.title,
                                            artist: data.tags.artist,
                                            album: data.tags.album,
                                            src: path.join('../resource/mp3', file),
                                            duration: 0,
                                            path: path.join(baseUrl, 'resource/mp3', file)
                                        })
                                        if (++count === files.length) {
                                            console.log('歌曲加载完毕');
                                            table.insertMany(musicArr, (err, reualt) => {
                                                console.log('插入成功');
                                            });
                                            db.close();
                                        }
                                    },
                                    onError(err) {
                                        console.log(err.type, err.info);
                                    }
                                });
                            });
                        });
                    });
                }
            });
        },
    };
    return _this;
})();

// music.getAllMusic(music.musicUrl);

router.all('*', (req, res, next) => {
    console.log('router.all: set public property.');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
/**
 * 获取所有音乐信息
 */
router.get('/find', (req, res, next) => {
    console.log('I will find all music info.');
    db.collection('music_info', (err, table) => {
        // 查音乐详情表，并返回
        table.find().toArray((err, result) => {
            if (err) {throw err;}
            res.send(result);
            console.log('返回音乐数据成功');
        });
    });
});

router.get('/getLog', (req, res, next) => {
    MongoClient.connect(dbUrl_ly, (err, db) => {
        if (err) { throw err; }
        let table = db.collection('lytest');
        console.log('connect collection lytest successfully!');
        // 查表，并返回
        table.find({}).toArray((err, result) => {
            if (err) {throw err;}
            res.send(result);
            console.log('send data to Client successfully!');
        }, () => {
            db.close();
        });
    });
});

router.post('/saveLog', (req, res, next) => {
    console.log('I will save data');
    MongoClient.connect(dbUrl_ly, (err, db) => {
        if (err) {throw err;}
        let table = db.collection('lytest');
            // 插表
        table.insert({
            name: req.body.name,
            text: req.body.text
        }, (err, result) => {
            // 查表
            table.find({}).toArray((err, result) => {
                if (err) { throw err; }
                res.send(result);
            }, () => {
                console.log('操作结束');
                db.close();
            });
        });
    });
});

router.post('/delLog', (req, res, next) => {
    MongoClient.connect(dbUrl_ly, (err, db) => {
        let table = db.collection('lytest');
        table.deleteOne({
            _id: ObjectID(req.body.id)
        }, (err, msg) => {
            if (0 === msg.result.n) {
                res.send('信息不存在');
            } else {
                res.send(`成功刪除 ${msg.result.n} 条`);
            }
            db.close();
        });
    });
});

router.get('/getMd', (req, res, next) => {
    db.collection('md_list', (err, table) => {
        if (err) {throw err;}
        console.log('connect collection md_list successfully!');

        // 查表，并返回
        table.find().toArray((err, result) => {
            if (err) {throw err;}

            res.send(result);
            console.log('send data to Client successfully!');
        });

    });
});

// 任务清单相关接口
router.get('/getTask', (req, res) => {
    console.log('Get task from mongodb.');
    let filter = {};
    if (req.query) {
        for (let key in req.query) {
            if (req.query[key]) {
                filter[key] = req.query[key];
            }
        }
    }
    console.log(filter);
    MongoClient.connect(dbUrl_ly, (err, db) => {
        console.log(`Connect to ${db.s.databaseName} success.`);
        let collection = db.collection('task_list');
        collection.find(filter, { progress: 0 }).toArray((err, result) => {
            res.send({
                success: true,
                data: result,
                msg: 'Get task list successfully.'
            });
            db.close();
        });
    });
});
router.post('/saveTask', (req, res) => {
    if ('object' !== typeof req.body) {
        res.send('Please send a object to save.');
        db.close();
        return;
    }
    console.log('Save task to mongodb.');
    MongoClient.connect(dbUrl_ly, (err, db) => {
        console.log(`Connect to ${db.s.databaseName} success.`);
        let collection = db.collection('task_list');
        // 暂时添加progress为0，为了后台筛选
        req.body.progress = '0';
        collection.insertOne(req.body, (err, result) => {
            if (err) { res.send(err); }
            res.send({
                success: true,
                data: [],
                msg: 'Save task info successfully.'
            });
            db.close();
        });
    });
});
router.post('/updateTask', (req, res) => {
    if ('object' !== typeof req.body) {
        res.send('Please send a object to update.');
        db.close();
        return;
    }
    let _id = req.body._id;
    delete req.body._id;

    // 判断任务是否完成
    if (req.body.endTime) {
        req.body.progress = 1;
    } else {
        req.body.progress = 0;
    }

    MongoClient.connect(dbUrl_ly, (err, db) => {
        console.log(`Connect to ${db.s.databaseName} success.`);
        let collection = db.collection('task_list');
        collection.updateOne({ _id: ObjectID(_id) }, { $set: req.body }, (err, result) => {
            if (err) { res.send(err); }
            res.send({
                success: true,
                data: [],
                msg: 'Update task info successfully.'
            });
            db.close();
        });
    });
});
router.post('/deleteTask', (req, res) => {
    if (!req.body._id) {
        res.send('Please send a id.');
        db.close();
        return;
    }
    MongoClient.connect(dbUrl_ly, (err, db) => {
        console.log(`Connect to ${db.s.databaseName} success.`);
        let collection = db.collection('task_list');
        collection.deleteOne({ _id: ObjectID(req.body._id) }, (err, result) => {
            if (err) { res.send(err); }
            res.send({
                success: true,
                data: [],
                msg: 'Delete task info successfully.'
            });
            db.close();
        });
    });
});
module.exports = router;
