var userDao = require('../dao/userDao');

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
    app.get('/login', (req, res, next) => {
        userDao.queryByName_get(req, res, next);
    });
}