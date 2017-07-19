/**
 * 文件接收器
 * @Author Liu Yang (34771695@qq.com)
 * @Date   2017-02-24
 * @Update 2017-07-19
 */
let multer = require('multer');
let fs = require('fs');
let path = require('path');

// 文件存储位置、名字控制
let storage = multer.diskStorage({
    destination (req, file, cb) {
        const position = path.resolve(__dirname, '../uploads');
        cb(null, position);
    },
    filename (req, file, cb) {
        cb(null, file.originalname);
    }
});
let upload = multer({ storage });
// let fileUrl = path.resolve(__dirname, '../resource/md/mac.md');
// fs.readFile(fileUrl, {encoding: 'utf8'}, (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
// });

function fileRouter(router) {
    router.post('/file/upload', upload.single('file'), (req, res) => {
        console.log('fileRouter: enter file upload.');
        res.send({
            success: true,
            data: [{
                filename: req.file.originalname,
                size: req.file.size
            }],
            msg: '上传成功',
        });
    });
}

module.exports = fileRouter;
