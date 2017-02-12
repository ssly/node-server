// 连接mongodb数据库
let MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;
let dbUrl_ly = 'mongodb://localhost:27017/ly';

let taskCtrl = require('../controllers/task');

function taskRouter(router) {
  // 任务清单相关接口
  router.get('/getTask', (req, res) => {
      console.log('task: router - Get task from mongodb.');
      // taskCtrl.getTask();
      let filter = {};
      let limit = 10, offset = 0;
      if (req.query) {
          if (req.query.limit) {
              limit = req.query.limit;
              delete req.query.limit;
          }
          if (req.query.offset) {
              offset = parseInt(req.query.offset);
              delete req.query.offset;
          }
          console.log(typeof req.query.progress);
          for (let key in req.query) {
              if (req.query[key]) {
                  if (typeof req.query[key] === 'object') { // 如果值为对象，则让数据库搜索多个值
                    filter[key] = { $in: req.query[key] };
                  } else {
                    filter[key] = req.query[key];
                  }
              }
          }
      }
      console.log(filter);
      MongoClient.connect(dbUrl_ly, (err, db) => {
          console.log(`Connect to ${db.s.databaseName} success.`);
          let collection = db.collection('task_list');
          collection.find(filter, { progress: 0 }).toArray((err, result) => {
              // 对查询到的数据进行处理
              // let arr = result.slice(offset, offset + 10);
              let arr = result;
              res.send({
                  success: true,
                  data: arr,
                  msg: 'Get task list successfully.',
                  other: {
                      pageCount: result.length,
                      offset: offset
                  }
              });
              db.close();
          });
      });
  });
  router.post('/saveTask', (req, res) => {
      if ('object' !== typeof req.body) {
          res.send('Please send a object to save.');
          return;
      }
      console.log('taskRouter: saveTask - Save task to mongodb.');
      console.log(taskCtrl.saveTask);
      taskCtrl.saveTask(req.body, result => {
        res.send(result);
      });
  });
  router.post('/updateTask', (req, res) => {
    console.log('taskRouter: updateTask - Update task to mongodb.');
      if ('object' !== typeof req.body) {
          res.send('taskRouter: updateTask - Please send a object to update.');
          return;
      }
      taskCtrl.updateTask(req.body, result => {
        res.send(result);
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
}

module.exports = taskRouter;
