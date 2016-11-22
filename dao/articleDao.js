var mysql = require('mysql');
var $db = require('../conf/db');
var $sql = require('./articleSqlMapping');

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
        var title = req.body.title,
            content = req.body.content,
            userid = req.session.user;
        pool.getConnection((err, connection) => {
            connection.query($sql.insert, [title, content, userid], (err, result) => {
                if (result.length > 0) {
                    result = {
                        code: 200,
                        msg: '发布成功'
                    };
                }
                jsonWrite(res, result);
            });
            connection.release();
        });
    },
    queryByTitle(req, res, next) {
        var title = req.params.title;

        pool.getConnection((err, connection) => {
            connection.query($sql.queryByTitle, title, function (err, result) {
                if (err) {
                    jsonWrite(res, undefined);
                    connection.release();
                    return;
                }
                if (result == null) {
                    jsonWrite(res, {
                        code: '500',
                        msg: '无记录'
                    });
                } else {
                    // req.session.user = user;
                    jsonWrite(res, {
                        code: '200',
                        ob: result
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
                    ob: result
                });
                connection.release();
            });
        });
    },
    delete(req, res, next) {
        var id = parseInt(req.params.id);
        pool.getConnection(function (err, connection) {
            connection.query($sql.delete, id, function (err, result) {
                if (result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg: '删除成功'
                    };
                } else {
                    result = void 0;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    update(req, res, next) {
        var id = req.body.id,
            title = req.body.title,
            content = req.body.content;
        pool.getConnection(function (err, connection) {
            connection.query($sql.update, [title, content, parseInt(id)], function (err, result) {
                if (result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg: '更新成功'
                    };
                } else {
                    result = void 0;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });

    },
    queryById(req, res, next) {
        var id = parseInt(req.params.id);
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryById, id, function (err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },

};
