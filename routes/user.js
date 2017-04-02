let userCtrl = require('../controllers/user');

function userRouter(router) {
  router.get('/user/get', (req, res) => {
    console.log(req.ip);
    let ipArr = req.ip.split(':'),
      ip = ipArr[ipArr.length -1];
    console.log(`user: router - Get user. ip is ${ip}`);
    userCtrl.get(req.query, result => {
      res.send(result);
    });
  });
  router.post('/user/save', (req, res) => {
    console.log(`user: router - save user. uuid is: ${req.body.uuid}, name is ${req.body.name}`);
    userCtrl.save(req.body, result => {
      res.send(result);
    });
  });
}
module.exports = userRouter;
