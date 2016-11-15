var userDao = require('../dao/userDao');

module.exports = function (app) {
    //获取主页及文章
    app.get('/', (req, res, next) => {
        userDao.queryAll(req, res, next);
    });
    //注册
    // app.post('/reg', checkNotLogin);
    app.post('/reg', function (req, res, next) {
        userDao.add(req, res, next);
    });
    //登入
    // app.post('/login', checkNotLogin);
    app.post('/login', function (req, res, next) {
        console.log(23333333)
        userDao.queryByName(req, res, next);
    });

    app.get('/login', function (req, res, next) {
        userDao.queryByName(req, res, next);
    });

    // //判断已登录
    // function checkLogin(req, res, next) {
    //     if (!req.session.user) {
    //         var content = {
    //             code: '200',
    //             user: '',
    //             msg: '未登录!'
    //         }
    //         res.end(JSON.stringify(content));
    //     }
    //     next();
    // }
    // //判断未登录
    // function checkNotLogin(req, res, next) {
    //     if (req.session.user) {
    //         var content = {
    //             code: '200',
    //             user: req.session.user,
    //             msg: '已登录!'
    //         }
    //         res.end(JSON.stringify(content));
    //     }
    //     next();
    // }
}