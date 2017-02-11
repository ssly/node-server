function logRouter(router) {

  // 连接mongodb数据库
  let MongoClient = require('mongodb').MongoClient;
  let ObjectID = require('mongodb').ObjectID;
  let dbUrl_ly = 'mongodb://120.77.243.63:27017/ly';

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
}
module.exports = logRouter;
