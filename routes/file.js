/**
 * 文件接收器
 * @Author Liu Yang (34771695@qq.com)
 * @Date   2017-02-24
 * @Update
 */
let multer = require('multer');
let fs = require('fs');
let path = require('path');

let fileUrl = path.resolve(__dirname, '../resource/md/mac.md');
fs.readFile(fileUrl, {encoding: 'utf8'}, (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});


function fileRouter(router) {

}

module.exports = fileRouter;
