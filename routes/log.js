const Log = require('../mongoose/log');

function logRouter(router) {
    /**
     * 查找所有记录
     */
    router.get('/log/find', (req, res) => {
        console.log('logRouter: request to /log/find.');
        Log.find({}, (err, result) => {
            if (err) {
                console.log(err);
                res.send({
                    success: false,
                    data: [],
                })
                return;
            }
            res.send({
                success: true,
                data: result,
            })
        });
    });

    /**
     * 按名称查找记录
     */

    /**
     * 新增记录
     */
    router.post('/log/add', (req, res) => {
        console.log('logRouter: request to /log/update.');
        if (!(req.body && req.body.name)) {
            res.send({
                success: false,
                data: [],
                msg: '请输入您的姓名',
            });
            return;
        }
        let log = new Log({
            name: req.body.name,
            text: req.body.text,
        });
        log.save((err, result) => {
            if (err) {
                console.log(err);
                res.send({
                    success: false,
                    data: [],
                    msg: '',
                });
                return;
            }
            res.send({
                success: false,
                data: result,
                msg: '',
            });
        });
    });

    /**
     * 删除记录
     */
    router.post('/log/del', (req, res) => {
        console.log('logRouter: request to /log/del.');
        if (!req.body instanceof Array || !req.body.length) {
            res.send({
                success: false,
                msg: '请输入数组',
            });
            return;
        }
        if (req.body.length === 1) {
            Log.remove({id: req.body[0]}, (err, result) => {
                res.send({
                    success: true,
                    msg: '你已成功删除1条数据',
                });
            });
        } else {
            // 删除多条
            Log.remove({id: {$in: req.body}}, (err, result) => {
                res.send({
                    success: true,
                    msg: `你已成功删除${req.body.length}条数据`,
                })
            });
        }
    });
}
module.exports = logRouter;
