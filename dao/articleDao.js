var mysql = require('mysql'),
    $db = require('../conf/db'),
    $articlesql = require('./articleSqlMapping'),
    $tagsql = require('./tagsSqlMapping'),
    $article_tagssql = require('./article_tagsSqlMapping'),
    async = require('async');

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
        // var title = req.body.title,
        //     content = req.body.content,
        //     tags = req.body.tags,
        //     userid = req.session.user;
        console.log('29')
        var title = 'ttttt',
            content = 'qwertyuuioplkjhgfdsazxcvbnm',
            tags = ['bick', 'swiming'],
            userid = 6;

        pool.getConnection((err, connection) => {
            //开启事务
            connection.beginTransaction(function (err) {
                if (err) {
                    jsonWrite(res, undefined);
                    connection.release();
                    return;
                }

                connection.query($articlesql.insert, [title, content, userid], (err, result) => {
                    console.log('48')
                    console.log(result);
                    if (result) {
                        var articleid = result.insertId;

                        var funobj = {};

                        tags.forEach((v, i) => {
                            funobj['tagfun' + i] = function (cb) {
                                connection.query($tagsql.insert, [v], (err, result) => {
                                    cb(err, result);
                                });
                            }
                            funobj['tag_articlefun' + i] = function (cb) {
                                connection.query($article_tagssql.insert, [v, articleid], (err, result) => {
                                    cb(err, result);
                                });
                            }
                        })

                        async.parallel(funobj, function (error, result) {
                            connection.commit(function (err, info) {
                                console.log("transaction info: " + JSON.stringify(info));
                                if (err) {
                                    console.log("执行事务失败，" + err);
                                    connection.rollback(function (err) {
                                        console.log("transaction error: " + err);
                                        connection.release();
                                        return;
                                    });
                                } else {
                                    result = {
                                        code: 200,
                                        msg: '发布成功'
                                    };
                                    jsonWrite(res, result);
                                    connection.release();
                                }
                            })
                        });
                    } else {
                        jsonWrite(res, undefined);
                        connection.release();
                        return;
                    }
                });

                // async.waterfall([
                //     function (cb) {
                //         connection.query($articlesql.insert, [title, content, userid], (err, result) => {
                //             console.log('48')
                //             console.log(result);
                //             if (result) {
                //                 cb(err, result.insertId);
                //             }
                //         });
                //     },
                //     function (articleid, cb) {
                //         connection.query($tagsql.insert, [tags[0]], (err, result) => {
                //             console.log('58')
                //             console.log(result);
                //             if (result) {
                //                 cb(err, result.insertId, articleid);
                //             }
                //         });
                //     },
                //     function (tagid, articleid, cb) {
                //         connection.query($article_tagssql.insert, [tagid, articleid], (err, result) => {
                //             console.log(67);
                //             console.log(result);
                //             console.log(err);
                //             if (result) {
                //                 cb(err, result);
                //             }
                //         });
                //     },
                // ], function (err, result) {
                //     console.log('74')
                //     if (err) {
                //         connection.rollback(function (err) {
                //             console.log("transaction error: " + err);
                //             connection.release();
                //             return;
                //         });
                //     } else {
                //         connection.commit(function (err, info) {
                //             console.log("transaction info: " + JSON.stringify(info));
                //             if (err) {
                //                 console.log("执行事务失败，" + err);
                //                 connection.rollback(function (err) {
                //                     console.log("transaction error: " + err);
                //                     connection.release();
                //                     return;
                //                 });
                //             } else {
                //                 result = {
                //                     code: 200,
                //                     msg: '发布成功'
                //                 };
                //                 jsonWrite(res, result);
                //                 connection.release();
                //             }
                //         })
                //     }
                // });
            });
            // connection.query($articlesql.insert, [title, content, userid], (err, result) => {
            //     console.log('104')
            //     console.log(result);
            //     if (err) {
            //         result = {
            //             code: 500,
            //             msg: '发布失败'
            //         };
            //     } else {
            //         result = {
            //             code: 200,
            //             msg: '发布成功'
            //         };
            //     }
            //     jsonWrite(res, result);
            //     connection.release();
            // });
        });
    },
    // add(req, res, next) {
    //     var title = req.body.title,
    //         content = req.body.content,
    //         tags = req.body.tags,
    //         userid = req.session.user;

    //     pool.getConnection((err, connection) => {
    //         connection.query($sql.insert, [title, content, userid], (err, result) => {
    //             if (result.length > 0) {
    //                 result = {
    //                     code: 200,
    //                     msg: '发布成功'
    //                 };
    //                 jsonWrite(res, result);
    //             }
    //         });
    //         connection.release();
    //     });
    // },
    queryByTitle(req, res, next) {
        var title = req.params.title;

        pool.getConnection((err, connection) => {
            connection.query($articlesql.queryByTitle, title, function (err, result) {
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
            connection.query($articlesql.queryAll, function (err, result) {
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
            connection.query($articlesql.delete, id, function (err, result) {
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
            connection.query($articlesql.update, [title, content, parseInt(id)], function (err, result) {
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
            connection.query($articlesql.queryById, id, function (err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },

};
