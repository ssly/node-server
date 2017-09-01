/**
 * Task Manager, Router
 * @author Liu Yang <34771695@qq.com> (https://lius.me)
 * @create 2017-02-24
 * @update 2017-08-31
 */

// import modules
let controllers = require('../controllers/task');
const common = require('../assets/common');

// 业务方法
const manager = {
  collection: null,

  init(router, db) {
    console.log(common.time() + 'task: task.init.');

    // 获取数据库的表
    manager.collection = db.collection('task');

    // 获取 task 表内的最大的 id
    controllers.getMaxIdOfTask(manager.collection);

    // 开启路由监听
    taskRouter(router);
  }
};

function taskRouter(router) {
  console.log(common.time() + 'task: task router init successfully.');

  // 查询所有（多条）
  router.get('/task/manager', (req, res) => {
    console.log(common.time() + 'task: enter router /task/manager/find success');
    controllers
      .fetch(manager.collection, req.query)
      .then(result => {
        res.send(result);
      }, (err) => {
        res.send(err);
      });
  });

  // 查询数据（单条）
  router.get('/task/manager/:id', (req, res) => {
    controllers
      .fetch(manager.collection, {id: req.params.id})
      .then(result => {
        res.send(result);
      }, (err) => {
        res.send(err);
      });
  });

  // 保存数据
  router.post('/task/manager', (req, res) => {
    // 数据校验 判断是新增还是更新
    const option = req.body.id
      ? controllers.update
      : controllers.save;
    console.log(option);
    option(manager.collection, req.body).then(result => {
      res.send(result);
    }, (err) => {
      res.send(err);
    });
  });

  // 删除数据（单条）
  router.delete('/task/manager/:id', (req, res) => {
    controllers
      .del(manager.collection, [Number(req.params.id)])
      .then(result => {
        res.send(result);
      }, (err) => {
        res.send(err);
      });
  });

  // 删除数据（多条）
  router.delete('/task/manager', (req, res) => {
    console.log(common.time() + 'Task Router: enter delete /task/manager successfully.');
    controllers
      .del(manager.collection, req.body)
      .then(result => {
        res.send(result);
      }, (err) => {
        res.send(err);
      });
  });
}

module.exports = {
  init: manager.init
};