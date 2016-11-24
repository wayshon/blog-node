var userDao = require('../dao/userDao'),
    articleDao = require('../dao/articleDao');

module.exports = function (app) {

    app.get('/test1', (req, res, next) => {
        console.log("************************************")
        console.log(req)
        req.session.user="ttttttt";
        res.end('111111111111');
    });
    app.get('/test2', (req, res, next) => {
        console.log("#####################################")
        console.log(req);
        res.end('2222222222222');
    });

    // app.get('/test', (req, res, next) => {
    //     articleDao.queryById(req, res, next);
    // });

    /************************************ */

    //获取主页及文章
    // app.get('/', (req, res, next) => {
    //     articleDao.queryAll(req, res, next);
    // });
    // //注册 ------待弄
    // app.post('/reg', (req, res, next) => {
    //     userDao.add(req, res, next);
    // });
    // //登入 ------待弄
    // app.post('/login', (req, res, next) => {
    //     userDao.queryByName(req, res, next);
    // });

    // //发表文章
    // app.post('/article', (req, res, next) => {
    //     articleDao.add(req, res, next);
    // });

    // //进入标签页,一红有哪些标签
    // app.get('/tags', function (req, res, next) {
    //     articleDao.allTags(req, res, next);
    // });

    // //获取指定标签的文章
    // app.get('/tags/:tag', function (req, res, next) {
    //     articleDao.queryByTagname(req, res, next);
    // });

    // //获取根据title搜索到的结果
    // app.get('/search', function (req, res, next) {
    //     articleDao.queryByTitle(req, res, next);
    // });

    // //根据用户返回其文章
    // app.get('/u/:userid', function (req, res, next) {
    //     articleDao.queryByUserid(req, res, next);
    // });

    // //根据id获取指定文章
    // app.get('/p/:articleid', function (req, res, next) {
    //     articleDao.queryById(req, res, next);
    // });

    // //更新文章
    // app.post('/edit', (req, res, next) => {
    //     articleDao.update(req, res, next);
    // });

    // //删除指定文章
    // app.get('/remove/:id', function (req, res, next) {
    //     articleDao.delete(req, res, next);
    // });

    // //获取文章列表
    // app.get('/articlelist', (req, res, next) => {
    //     articleDao.queryList(req, res, next);
    // });

    // //发表评论
    // app.post('/comment', (req, res, next) => {
    //     articleDao.addComment(req, res, next);
    // });

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