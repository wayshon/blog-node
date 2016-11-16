/*
crypto 是 Node.js 的一个核心模块，我们用它生成散列值来加密密码
User与Post是对数据库中用户集合与博客集合的封装
*/
var crypto = require('crypto');

// 实现与MySQL交互
var mysql = require('mysql');
var $db = require('../conf/db');
var $sql = require('./userSqlMapping');

// 使用连接池，提升性能
var pool = mysql.createPool($db.mysql);

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '500',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add(req, res, next) {
        var username = req.body.username,
            email = req.body.email,
            md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
        pool.getConnection((err, connection) => {
            connection.query($sql.queryByName, username, (err, result) => {
                if (err) {
                    jsonWrite(res, undefined);
                    connection.release();
                    return;
                }
                if (result.length > 0) {
                    jsonWrite(res, {
                        code: 500,
                        msg: '用户已存在'
                    });
                } else {
                    connection.query($sql.insert, [username, password, email], (err, result) => {
                        if (result) {
                            result = {
                                code: 200,
                                msg: '注册成功'
                            };
                        }
                        jsonWrite(res, result);
                    });
                }

                connection.release();
            });
        });
    },
    queryByName(req, res, next) {
        var md5 = crypto.createHash('md5'),
            username = req.body.username,
            password = md5.update(req.body.password).digest('hex');

        pool.getConnection((err, connection) => {
            connection.query($sql.queryByName, username, function (err, result) {
                if (err) {
                    jsonWrite(res, undefined);
                    connection.release();
                    return;
                }
                if (result == null) {
                    jsonWrite(res, {
                        code: '500',
                        msg: '用户不存在'
                    });
                } else if (result.password != password) {
                    jsonWrite(res, {
                        code: '500',
                        msg: '密码错误'
                    });
                } else {
                    // req.session.user = user;
                    jsonWrite(res, {
                        code: '200',
                        userid: result.id,
                        msg: '登录成功'
                    });
                }

                connection.release();
            });
        });
    },
    queryByName_get(req, res, next) {
        var md5 = crypto.createHash('md5'),
            username = req.query.username,
            password = md5.update(req.query.password).digest('hex');

        pool.getConnection((err, connection) => {
            connection.query($sql.queryByName, username, function (err, result) {
                if (err) {
                    jsonWrite(res, undefined);
                    connection.release();
                    return;
                }
                if (result == null) {
                    jsonWrite(res, {
                        code: '500',
                        msg: '用户不存在'
                    });
                } else if (result.password != password) {
                    jsonWrite(res, {
                        code: '500',
                        msg: '密码错误'
                    });
                } else {
                    // req.session.user = user;
                    jsonWrite(res, {
                        code: '200',
                        userid: result.id,
                        msg: '登录成功'
                    });
                }

                connection.release();
            });
        });
    },
    queryAll(req, res, next) {
        pool.getConnection((err, connection) => {
            connection.query($sql.queryAll, function (err, result) {
                // console.log(err);
                jsonWrite(res, {
                    code: 200,
                    data: result
                });
                connection.release();
            });
        });
    },
    // delete(req, res, next) {
    //     // delete by Id
    //     pool.getConnection(function (err, connection) {
    //         var id = +req.query.id;
    //         connection.query($sql.delete, id, function (err, result) {
    //             if (result.affectedRows > 0) {
    //                 result = {
    //                     code: 200,
    //                     msg: '删除成功'
    //                 };
    //             } else {
    //                 result = void 0;
    //             }
    //             jsonWrite(res, result);
    //             connection.release();
    //         });
    //     });
    // },
    // update(req, res, next) {
    //     // update by id
    //     // 为了简单，要求同时传name和age两个参数
    //     var param = req.body;
    //     if (param.name == null || param.age == null || param.id == null) {
    //         jsonWrite(res, undefined);
    //         return;
    //     }

    //     pool.getConnection(function (err, connection) {
    //         connection.query($sql.update, [param.name, param.age, parseInt(param.id)], function (err, result) {
    //             // 使用页面进行跳转提示
    //             if (result.affectedRows > 0) {
    //                 res.render('suc', {
    //                     result: result
    //                 }); // 第二个参数可以直接在jade中使用
    //             } else {
    //                 res.render('fail', {
    //                     result: result
    //                 });
    //             }
    //             console.log(result);

    //             connection.release();
    //         });
    //     });

    // },
    // queryById(req, res, next) {
    //     var id = parseInt(req.query.id);
    //     pool.getConnection(function (err, connection) {
    //         connection.query($sql.queryById, id, function (err, result) {
    //             jsonWrite(res, result);
    //             connection.release();

    //         });
    //     });
    // },

};
