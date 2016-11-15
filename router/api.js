var userDao = require('../dao/userDao');

module.exports = function (app) {
    //获取主页及文章
    app.get('/', (req, res, next) => {
        res.json(userDao.queryAll(req, res, next));
        // res.end('获取主页及文章')
    });
    //注册
    app.post('/reg', checkNotLogin);
    app.post('/reg', function (req, res) {
        var name = req.body.username,
            password = req.body.password;
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
        var newUser = new User({
            name: name,
            password: password,
            email: req.body.email
        });
        User.get(newUser.name, function (err, user) {
            if (err) {
                return res.end('err报错!');
            }
            if (user) {
                return res.end('用户已存在!');;
            }
            newUser.save(function (err, user) {
                if (err) {
                    return res.end('err报错!');
                }
                req.session.user = user;
                res.end('注册成功!');
            });
        });
    });
    //登入
    app.post('/login', checkNotLogin);
    app.post('/login', function (req, res) {
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
        User.get(req.body.username, function (err, user) {
            if (!user) {
                console.log('用户不存在!')
                return res.end('用户不存在!');
            }
            if (user.password != password) {
                console.log('密码错误!')
                return res.end('密码错误!');
            }
            req.session.user = user;
            var content = {
                code: '200',
                user: req.session.user,
                msg: '登陆成功!'
            }
            res.end(JSON.stringify(content));
        });
    });
    //发表文章
    app.post('/post', checkLogin);
    app.post('/post', function (req, res) {
        var currentUser = req.session.user,
            tags = [req.body.tag1, req.body.tag2, req.body.tag3],
            post = new Post(currentUser.name, currentUser.head, req.body.title, tags, req.body.post);
        post.save(function (err) {
            if (err) {
                var content = {
                    code: '201',
                    user: req.session.user,
                    msg: 'err报错!'
                }
                return res.end(JSON.stringify(content));
            }
            var content = {
                code: '200',
                user: req.session.user,
                msg: '发布成功!'
            }
            res.end(JSON.stringify(content));
        });
    });

    //判断已登录
    function checkLogin(req, res, next) {
        if (!req.session.user) {
            var content = {
                code: '200',
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