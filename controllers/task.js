/**
 * 任务管理系统 controllers
 * @author Liu Yang (34771695@qq.com)
 * @create 2017-08-19
 * @update 2017-08-19
 */

const ObjectID = require('mongodb').ObjectID;

let maxId = 0;
/**
 * 给任务数据插库时，自动赋值id，规则为在最大基础上加 1
 */
function getMaxIdOfTask(collection) {
  // 通过查表获取最大的id
  collection.find({}).toArray((err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    maxId = result.reduce((prev, next) => {
      return prev.id > next.id ? prev.id : next.id;
    });
    console.log(maxId);
  })
}

/**
 * 查询数据
 * @param {object} collection 数据库表
 * @param {string} id 查询的id，如果为空，则查询所有
 */
function fetch(collection, id) {
  return new Promise((resolve, reject) => {
    let item = {};

    id && (item.id = Number(id));

    collection.find(item, { _id: 0}).toArray((err, result) => {
      if (err) {
        resolve(err);
        return;
      }
      console.log('task ctrl: find data successfully.');
      reject({
        success: true,
        data: result,
        msg: 'Find All data successfully.',
        other: {}
      });
    });
  })
}

/**
 * 添加数据（单条）
 * @param {object} collection 数据库表
 * @param {object} item 需要添加的数据
 */
function save(collection, item) {
  return new Promise((resolve, reject) => {
    // 给数据赋值id，遵循+1规则
    Object.assign({ id: ++maxId }, item);

    collection.insertOne(item, (err, result) => {
      const data = Array.isArray(result.ops) ? result.ops[0] : result.ops;
      if (err) {
        reject(err);
        return;
      }
      resolve({
        success: true,
        data,
        msg: 'Save task info successfully.'
      });
    });
  })
}

/**
 * 更新数据（单条）
 * @param {object} collection 数据库表
 * @param {object} item 需要添加的数据
 */
function update(collection, item) {
  return new Promise((resolve, reject) => {
    collection.updateOne({ id: item.id }, {
        $set: item
    }, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(result);
      resolve({
        success: true,
        data: result.ops,
        msg: 'Update task info successfully.'
      });
    });
  })
}

/**
 * 更新数据（单条）
 * @param {object} collection 数据库表
 * @param {array} ids 需要删除的ids
 */
function del(collection, ids) {
  return new Promise((resolve, reject) => {
    let id = Number(ids);
    collection.deleteOne({ id }, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      let count = result.result.n;

      resolve({
        success: true,
        msg: `Delete ${count} successfully.`
      });
    });
  })
}

module.exports = {
  getMaxIdOfTask,
  fetch,
  save,
  update,
  del,
}