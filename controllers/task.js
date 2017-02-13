// 连接mongodb数据库
let MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;
let dbUrl_ly = 'mongodb://localhost:27017/ly';

let taskCtrl = {
  saveTask(item, callback) {
    console.log('taskCtrl: saveTask - task info is ');
    // progress=0，1，2分别表示任务状态：计划/进行/结束
    item.progress = '0';
    MongoClient.connect(dbUrl_ly, (err, db) => {
        let collection = db.collection('task_list');
        collection.insertOne(item, (err, result) => {
            db.close();
            if (err) { callback(err); }
            callback({
                success: true,
                data: result.ops,
                msg: 'Save task info successfully.'
            });
        });
    });
  },

  updateTask(item, callback) {
    console.log('taskCtrl: updateTask - update task.');
    // 根据任务的开始和结束判断任务的状态progress
    console.log(`taskCtrl: updateTask - startTime: ${item.startTime}, endTime: ${item.endTime}`);
    if (item.startTime && !item.endTime) { // 状态为进行
      item.progress = '1';
    } else if (item.startTime && item.endTime) { // 状态为结束
      item.progress = '2';
    } else if (!item.startTime && !item.endTime) { // 状态为计划
      item.progress = '0';
    } else { // 异常状态

    }
    let _id = item._id;
    delete item._id;

    MongoClient.connect(dbUrl_ly, (err, db) => {
        let collection = db.collection('task_list');
        collection.updateOne({ _id: ObjectID(_id) }, { $set: item }, (err, result) => {
            db.close();
            if (err) { callback(err); }
            callback({
                success: true,
                data: [],
                msg: 'Update task info successfully.'
            });
        });
    });
  }
};

module.exports = taskCtrl;
