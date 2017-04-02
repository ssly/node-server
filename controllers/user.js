// 连接mongodb数据库
let MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;
let dbUrl_ly = 'mongodb://localhost:27017/ly';

let userCtrl = {
  get(item, callback) {
    console.log('userCtrl: get - get user data.');
    // 校验用户或姓名只能存在一个
    if (item.uuid && !item.name) {
      delete item.name;
    } else if (!item.uuid && item.name) {
      delete item.uuid;
    } else {
      callback({
        success: false,
        msg: '请输入正确的账户或姓名，仅需填写一项'
      });
      return;
    }
    MongoClient.connect(dbUrl_ly, (err, db) => {
      let collection = db.collection('user_list');
      collection.find(item).toArray((err, result) => {
        db.close();
        if (err) { callback(err); }
          // 检测用户信息是否存在
          if (result.length) {
            callback({
              success: true,
              data: result,
              msg: 'Get user list successfully.'
            });
          } else {
            callback({
              success: false,
              msg: '你的账户或姓名不存在'
            });
          }
      });
    });
  },
  save(item, callback) {
    console.log('userCtrl: save - save user data.');
    if (item.uuid && item.name) {

    } else {
      callback({
        success: false,
        msg: '请输入用户和姓名'
      });
      return;
    }
    MongoClient.connect(dbUrl_ly, (err, db) => {
        let collection = db.collection('user_list');
        collection.find({uuid: item.uuid}).toArray((err, result) => {
          if (err) { throw err; }
            // 判断uuid是否存在
            if (result.length) {
              db.close();
              callback({
                success: false,
                msg: '用户已经存在，请换一个用户'
              });
            } else {
              collection.insertOne(item, (err, result) => {
                db.close();
                if (err) { throw err; }
                callback({
                  success: true,
                  data: result.ops,
                  msg: 'Save user info successfully.'
                });
              });
            }
        });
    });
  }
};
module.exports = userCtrl;
