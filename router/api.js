var userDao = require('../dao/userDao'),
    articleDao = require('../dao/articleDao'),
    tools = require('../tools'),
    session = require('../dao/session');

module.exports = function (app) {

    app.get('/test1', (req, res, next) => {
        console.log("************************")
        console.log(req.session)
        req.session.user = "tttt";
        res.json({
            a: 111
        });
    });

    app.get('/test2', (req, res, next) => {
        console.log("##########################")
        console.log(req.session)
        // app.sessionStore.get(req.sessionID, (error, session) => {
        //     console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
        //     console.log(session)
        //     res.json(session);
        // });
        res.json(req.session);
    });

    app.get('/test', (req, res, next) => {
        articleDao.queryById(req, res, next);
    });

    /************************************ */

    //获取主页及文章
    app.get('/home', (req, res, next) => {
        articleDao.queryAll(req, res, next);
    });

    //注册 
    app.post('/reg', checkNotLogin);
    app.post('/reg', (req, res, next) => {
        userDao.add(req, res, next);
    });

    //登入 
    app.post('/login', checkNotLogin);
    app.post('/login', (req, res, next) => {
        userDao.queryByName(req, res, next);
    });

    //上传头像
    app.post('/avatar', (req, res, next) => {
        userDao.addAvatar(req, res, next);
    });

    //进入标签页,一红有哪些标签
    app.get('/tags', function (req, res, next) {
        articleDao.allTags(req, res, next);
    });

    //获取指定标签的文章
    app.get('/articlebytag', function (req, res, next) {
        articleDao.queryByTagname(req, res, next);
    });

    //获取根据title搜索到的结果
    app.get('/articlebytitle', function (req, res, next) {
        articleDao.queryByTitle(req, res, next);
    });

    //根据用户返回其文章
    app.get('/articlebyuser', function (req, res, next) {
        articleDao.queryByUserid(req, res, next);
    });

    //根据id获取指定文章
    app.get('/articlebyid', function (req, res, next) {
        articleDao.queryById(req, res, next);
    });

    //获取文章列表
    app.get('/articlelist', (req, res, next) => {
        articleDao.queryList(req, res, next);
    });

    /**下面的接口需要登录以后 */

    //上传图片
    app.post('/uploadimg', checkLogin);
    app.post('/uploadimg', (req, res, next) => {
        userDao.uploadImg(req, res, next);
    });

    //发表文章
    app.post('/article', checkLogin);
    app.post('/article', (req, res, next) => {
        articleDao.add(req, res, next);
    });

    //更新文章
    app.post('/edit', checkLogin);
    app.post('/edit', (req, res, next) => {
        articleDao.update(req, res, next);
    });

    //转载文章
    app.get('/reprint', checkLogin);
    app.get('/reprint', (req, res, next) => {
        articleDao.reprint(req, res, next);
    });

    //删除指定文章
    app.get('/remove', checkLogin);
    app.get('/remove', function (req, res, next) {
        articleDao.delete(req, res, next);
    });

    //发表评论
    app.post('/comment', checkLogin);
    app.post('/comment', (req, res, next) => {
        articleDao.addComment(req, res, next);
    });

    //登出
    app.get('/logout', checkLogin);
    app.get('/logout', function (req, res) {
        req.session.user = null;
        var content = {
            code: '200',
            user: '',
            msg: '退出成功!'
        }
        res.json(content);
    });

    //判断已登录
    function checkLogin(req, res, next) {
        if (!req.session.user) {
            var content = {
                code: '200',
                user: '',
                msg: '未登录!'
            }
            res.json(content);
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
            res.json(content);
        }
        next();
    }

    // app.get('/testselfsession', (req, res, next) => {

    //     session.insert('ttt', (err, result) => {
    //         if (err) {
    //             console.log(err)
    //             res.send({
    //                 code: 500,
    //                 msg: 'server error!!!! '
    //             });
    //         } else {
    //             res.send(JSON.stringify(result));
    //         }
    //     });
    // });

}