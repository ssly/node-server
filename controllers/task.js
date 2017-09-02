/**
 * Task Manager, Controllers
 * @author Liu Yang <34771695@qq.com> (https://lius.me)
 * @create 2017-08-19
 * @update 2017-08-31
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

    console.log('Task Controllers: Get max id, max id is', maxId);
  })
}

/**
 * 查询数据
 * @param {object} collection 数据库表
 * @param {object} 如果存在 options.id，查询单条，否则则查询所有
 */
const fetch = function(collection, options) {
  return new Promise((resolve, reject) => {
    // 0 Success, 1 Query condition error
    let code = 0;
    let item = {};

    // filter
    if (options.id) {
      // 如果有id，只查询单条
      item.id = Number(options.id);
    } else {
      // name fuzzy query
      if (options.name && options.name !== '') {
        // Eliminate the effects of wildcards "."
        options.name = options.name.replace(/\./g, '\\.')
        item.name = new RegExp(options.name)
      }

      // type 1, 2, 3, 4
      if (options.type && options.type !== '') {
        if (/^[1-4]$/.test(options.type)) {
          item.type = Number(options.type);
        } else {
          code = 2;
          reject({ code, success: false });
          return;
        }
      }

      // difficult 1, 2, 3
      if (options.difficult && options.difficult !== '') {
        if (/^[1-3]$/.test(options.difficult)) {
          item.difficult = Number(options.difficult);
        } else {
          code = 2;
          reject({ code, success: false });
          return;
        }
      }

      // finish true, false
      if (options.finish && options.finish !== '') {
        switch (options.finish) {
          case 'true':
            item.finish = true;
            break;
          case 'false':
            item.finish = false;
            break;
          default:
            code = 2
            reject({ code, success: false });
            return;
        }
      }
    }

    console.log('Task Controller: find data\'s params is', item);

    collection.find(item, { _id: 0}).toArray((err, result) => {
      if (err) {
        console.error(err);

        reject({ code: 1, success: false });
      }

      // sort
      if (options.sorter) {
        console.log('Task Controller: find data\'s sorter is', options.sorter)
        let sorterArray = options.sorter.split('$')

        if (sorterArray.length !== 2) {
          reject({ code: 2 })
          return
        }

        let name = sorterArray[0]
        let sorter = sorterArray[1]
        result.sort((a, b) => {
          if (sorter === 'ascend') {

            return a[name] === b[name] ? 0 : (a[name] > b[name] ? 1 : -1)
          }
          return a[name] === b[name] ? 0 : (a[name] < b[name] ? 1 : -1)
        })
      }

      // console.log('Task Controller: find data successfully, result is', result);
      resolve({ code, success: true, data: result });
    });
  });
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
        data: result.ops
      });
    });
  })
}

/**
 * 删除
 * @param {object} collection 数据库表
 * @param {array} ids 需要删除的ids
 */
const del = async function (collection, ids) {
    let count = 0;
    let arr = [];
    for (let i = 0; i < ids.length; i++) {
      arr.push(await new Promise((resolve, reject) => {
        collection.deleteOne({ id: ids[i] }, (err, result) => {
          if (err) { reject(err) }

          // count delete items
          count += result.result.n;
          resolve();
        });
      }));
    }
    return {
      code: 0,
      success: true,
      other: { count }
    };
}

module.exports = {
  getMaxIdOfTask,
  fetch,
  save,
  update,
  del,
}