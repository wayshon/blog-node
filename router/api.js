var userDao = require('../dao/userDao'),
    articleDao = require('../dao/articleDao');

module.exports = function (app) {
    //获取主页及文章
    app.get('/', (req, res, next) => {
        userDao.queryAll(req, res, next);
    });
    //注册
    app.post('/reg', (req, res, next) => {
        userDao.add(req, res, next);
    });
    //登入
    app.post('/login', (req, res, next) => {
        userDao.queryByName(req, res, next);
    });
    // app.get('/login', (req, res, next) => {
    //     userDao.queryByName_get(req, res, next);
    // });

    // app.get('/test1', (req, res, next) => {
    //     req.session.user="ttttttt";
    //     res.end('111111111111');
    // });
    // app.get('/test2', (req, res, next) => {
    //     console.log(req.session);
    //     res.end(req.session.user);
    // });

    app.get('/aaa', (req, res, next) => {
        articleDao.add(req, res, next);
    });

    //判断已登录
    function checkLogin(req, res, next) {
        if (!req.session.user) {
            var content = {
                code: '500',
                user: '',
                msg: '未登录!'
            }
            res.end(JSON.stringify(content));
        }
        next();
    }
    //判断未登录
    function checkNotLogin(req, res, next) {
        if (req.session.user) {
            var content = {
                code: '200',
                user: req.session.user,
                msg: '已登录!'
            }
            res.end(JSON.stringify(content));
        }
        next();
    }
}