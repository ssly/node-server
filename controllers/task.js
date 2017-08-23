/**
 * 任务管理系统 controllers
 * @author Liu Yang (34771695@qq.com)
 * @create 2017-08-19
 * @update 2017-08-19
 */

let maxId = 0; // 后台初始化时，task表默认的ID起始值

/**
 * 给任务数据插库时，自动赋值id，规则为在最大基础上加 1
 * @param {object} collection task表
 */
function getMaxIdOfTask(collection) {
  // 通过查表获取最大的id
  collection.find({}).toArray((err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    // 获取最大的id值，没有数据则赋值为0
    result.forEach(item => {
      item.id > maxId && (maxId = item.id);
    });

    console.log('task controllers: maxId is', maxId);
  })
}

/**
 * 查询数据
 * @param {object} collection 数据库表
 * @param {string} id 查询的id，如果为空，则查询所有
 */
function fetch(collection, options) {
  return new Promise((resolve, reject) => {
    let item = {};

    if (options.id) {
      // 如果有id，只查询单条
      item.id = Number(id)
    } else {
      // 其他搜索条件
      console.log(options);

      // 类型 1, 2, 3, 4
      switch (Number(options.type)) {
        case 1:
        case 2:
        case 3:
        case 4:
          item.type = Number(options.type);
          break;
        default:
          break;
      }

      // 难易 difficult
      switch (Number(options.difficult)) {
        case 1:
        case 2:
        case 3:
          item.difficult = Number(options.difficult);
        default:
          break;
      }

      // 完成度 finish
      switch (options.finish) {
        case 'true':
          Boolean(options.finish) && (item.finish = true);
        case 'false':
          !Boolean(options.finish) && (item.finish = false);
        default:
          break;
      }
    }
    console.log(item);

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
    item = Object.assign({ id: ++maxId }, item);

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