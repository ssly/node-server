/**
 * mongodb数据库的配置及函数
 * author: Liu Yang (34771695@qq.com)
 * date:   2017-02-24
 */

// 引入模块
let MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;

// 设置变量
let dbUrl_ly = 'mongodb://localhost:27017/ly';

// 导出模块
module.exports = {
  db: dbUrl_ly,
  client: MongoClient,
  ObjectID: ObjectID
}
