/**
 * 文件管理器
 * @Author Liu Yang (34771695@qq.com)
 * @Date   2017-02-24
 * @Update 2017-07-19
 */
const common = require('../assets/common');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const resourcePath = path.resolve(__dirname, '../resource');

const file = {
    collection: null,
    /**
     * 进入file模块初始化
     * @param {object} router express路由
     * @param {object} db mongodb的对象
     */
    init (router, db) {
        console.log(common.time() + 'file: file.init.');

        // 获取数据库的表
        file.collection = db.collection('file');

        // 开启路由监听
        fileRouter(router);

        // 将resource资源文件夹下所有的文件查询出来入库
        file.getFilesArray(resourcePath).then(filesArr => {
            // 重新入库之前，先清除所有数据
            file.collection.deleteMany({}, (err, result) => {
                if (err) {
                    console.error(common.time() + 'file: delete db\'s files error.');
                    return;
                }
                console.log(common.time() + 'file: delete db\'s files successfully.');
                file.collection.insert(filesArr, (err, result) => {
                    if (err) {
                        console.error(common.time() + 'file: file insert data error.');
                        return;
                    }
                    console.log(common.time() + 'file: file insert data success.');
                });
            });

        });
    },

    /**
     * 获取资源路径的所有文件文件名(TODO: 暂时无法处理文件夹嵌套)
     * @param {string} src 需要获取的资源路径
     * @returns {array|object} 资源路径下的所有文件组成的数组对象
     */
    getFilesArray (src) {
        return new Promise((resolve, reject) => {
            let arr = [];
            fs.readdir(src, (err, files) => {
                if (err) {
                    console.error(common.time() + 'file: readdir error.');
                    reject(err);
                    return;
                }
                files.forEach(file => {
                    arr.push({
                        name: file,
                        path: `${common.host}:${common.port}/resource/${String(file)}`
                    });
                });
                resolve(arr);
            });
        });
    }
};

// 文件存储位置、名字控制
let storage = multer.diskStorage({
    destination (req, file, cb) {
        const position = resourcePath;
        cb(null, position);
    },
    filename (req, file, cb) {
        cb(null, file.originalname);
    }
});
let upload = multer({ storage });


function fileRouter(router) {
    /**
     * 上传文件接口
     */
    router.post('/file/upload', upload.single('file'), (req, res) => {
        console.log(common.time() + 'fileRouter: enter file upload.');
        res.send({
            success: true,
            data: [{
                filename: req.file.originalname,
                size: req.file.size
            }],
            msg: '上传成功',
        });
    });

    /**
     * 获得所有资源文件列表
     */
    router.get('/file/get', (req, res) => {
        console.log(common.time() + 'fileRouter: enter file get.');
        file.collection.find({}).toArray((err, result) => {
            res.send({
                success: true,
                data: result,
                msg: '查询成功'
            });
        });
    });
}

module.exports = {
    init: file.init
};
