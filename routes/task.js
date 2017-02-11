function taskRouter(router) {
  // 连接mongodb数据库
  let MongoClient = require('mongodb').MongoClient;
  let ObjectID = require('mongodb').ObjectID;
  let dbUrl_ly = 'mongodb://120.77.243.63:27017/ly';

  // 任务清单相关接口
  router.get('/getTask', (req, res) => {
      console.log('Get task from mongodb.');
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
          for (let key in req.query) {
              if (req.query[key]) {
                  filter[key] = req.query[key];
              }
          }
      }
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
}

module.exports = taskRouter;
