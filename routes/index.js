var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: '首页',
        movies: [{
            _id: '001',
            title: '牛逼战警',
            poster: 'http://img3.imgtn.bdimg.com/it/u=1901715451,1483624715&fm=214&gp=0.jpg'
        }, {
            _id: '002', 
            title: '牛逼战警',
            poster: 'http://img3.imgtn.bdimg.com/it/u=1901715451,1483624715&fm=214&gp=0.jpg'
        }, {
            _id: '003',
            title: '牛逼战警',
            poster: 'http://img3.imgtn.bdimg.com/it/u=1901715451,1483624715&fm=214&gp=0.jpg'
        }, {
            _id: '004', 
            title: '牛逼战警',
            poster: 'http://img3.imgtn.bdimg.com/it/u=1901715451,1483624715&fm=214&gp=0.jpg'
        }]
    });
});

router.get('/movie/:id', function(req, res, next) {
    res.render('detail', {
        title: '详情页',
        movie: {
            flash: '../resource/video/田馥甄 - 小幸运.mp4',
            title: '小幸运',
            doctor: '田馥甄',
            country: 'China',
            language: 'Chinese'
        }
    });
});

router.get('/movie', function(req, res, next) {
    res.render('admin', {
        title: '后台录入页'
    });
});

router.get('/admin/list', function(req, res, next) {
    res.render('list', {
        title: '列表页'
    });
});




module.exports = router;
