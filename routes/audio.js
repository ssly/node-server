function audioRouter(router) {
  let fs = require('fs'),
      path = require('path');

  // 连接mongodb数据库
  let MongoClient = require('mongodb').MongoClient;
  let ObjectID = require('mongodb').ObjectID;
  let dbUrl_ly = 'mongodb://127.0.0.1:27017/ly';

  let jsmediatags = require('jsmediatags');

  let baseUrl = path.resolve(__dirname, '..'); // 文件根目录位置

  let music = (function Music() {
      console.log('加载音乐函数');
      let _this = {
          musicUrl: path.join(baseUrl, 'resource/mp3'), // 音乐目录
          /**
           * 获得某个目录下所有歌曲
           * @param 歌曲所在目录
           */
          getAllMusic(route, callback) { // route = '../resource/mp3'
              fs.readdir(route, (err, files) => {
                  if (err) {
                      console.log(`err: ${err}`);
                      return null;
                  } else {
                      // TODO 鉴别歌曲格式是否为音频格式
                      let musicNumber = files.length, // 歌曲总数量
                          musicJSON = '';
                      MongoClient.connect(dbUrl_ly, (err, db) => {
                          console.log(`打开数据库${db.s.databaseName}歌曲信息入库`);
                          if (err) { throw err; }
                          let table = db.collection('music_info');

                          table.deleteMany({}, (err, result) => {
                              console.log('清空数据库成功');
                              let count = 0; // 判定已加载歌曲
                              let musicArr = [];
                              files.forEach((file) => {
                                  let src = path.join(route, file);
                                  jsmediatags.read(src, {
                                      onSuccess(data) {
                                          musicArr.push({
                                              title: data.tags.title,
                                              artist: data.tags.artist,
                                              album: data.tags.album,
                                              src: path.join('../resource/mp3', file),
                                              duration: 0,
                                              path: path.join(baseUrl, 'resource/mp3', file)
                                          })
                                          if (++count === files.length) {
                                              console.log('歌曲加载完毕');
                                              table.insertMany(musicArr, (err, reualt) => {
                                                  console.log('插入成功');
                                              });
                                              db.close();
                                          }
                                      },
                                      onError(err) {
                                          console.log(err.type, err.info);
                                      }
                                  });
                              });
                          });
                      });
                  }
              });
          },
      };
      return _this;
  })();

  /**
   * 获取所有音乐信息
   */
  router.get('/find', (req, res, next) => {
      console.log('I will find all music info.');
      db.collection('music_info', (err, table) => {
          // 查音乐详情表，并返回
          table.find().toArray((err, result) => {
              if (err) {throw err;}
              res.send(result);
              console.log('返回音乐数据成功');
          });
      });
  });
  // music.getAllMusic(music.musicUrl);
}
module.exports = audioRouter;
