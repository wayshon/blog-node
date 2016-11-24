var mysql = require('mysql'),
    $db = require('../conf/db'),
    $articlesql = require('./articleSqlMapping'),
    $tagsql = require('./tagsSqlMapping'),
    $article_tagssql = require('./article_tagsSqlMapping'),
    $usersql = require('./userSqlMapping'),
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
        //     userid = req.session.user,
        //     date = new Date().toLocaleString();

        var title = 'ttttt',
            content = 'qwertyuuioplkjhgfdsazxcvbnm',
            tags = ['bick', 'swiming'],
            userid = 6,
            date = new Date().toLocaleString();

        pool.getConnection((err, connection) => {
            //开启事务
            connection.beginTransaction(function (err) {
                if (err) {
                    jsonWrite(res, undefined);
                    connection.release();
                    return;
                }

                connection.query($articlesql.insert, [userid, title, content, date], (err, result) => {
                    if (result) {
                        var articleid = result.insertId;
                        var funobj = {};
                        tags.forEach((v, i) => {
                            funobj['tagfun' + i] = function (cb) {
                                connection.query($tagsql.insert, v, (err, result) => {
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
                                if (err) {
                                    console.log("执行事务失败，" + err);
                                    connection.rollback(function (err) {
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
            });
        });
    },
    update(req, res, next) {
        // var id = req.body.id,
        //     title = req.body.title,
        //     content = req.body.content,
        //     tags = req.body.tag,
        //     date = new Date().toLocaleString();

        var id = 5,
            title = 'uuuuuuu',
            content = 'asdfghjkl',
            tags = ['boxing', 'game'],
            date = new Date().toLocaleString();

        pool.getConnection((err, connection) => {
            //开启事务
            connection.beginTransaction(function (err) {
                if (err) {
                    jsonWrite(res, undefined);
                    connection.release();
                    return;
                }

                connection.query($articlesql.update, [title, content, date, id], (err, result) => {
                    if (result.affectedRows > 0) {
                        var funobj = {
                            deleteOldTag(cb) {
                                connection.query($article_tagssql.deleteTag, id, (err, result) => {
                                    cb(err, result);
                                });
                            }
                        };
                        tags.forEach((v, i) => {
                            funobj['tagfun' + i] = function (cb) {
                                connection.query($tagsql.insert, v, (err, result) => {
                                    cb(err, result);
                                });
                            }
                            funobj['tag_articlefun' + i] = function (cb) {
                                connection.query($article_tagssql.insert, [v, id], (err, result) => {
                                    cb(err, result);
                                });
                            }
                        })

                        async.parallel(funobj, function (error, result) {
                            connection.commit(function (err, info) {
                                if (err) {
                                    console.log("执行事务失败，" + err);
                                    connection.rollback(function (err) {
                                        connection.release();
                                        return;
                                    });
                                } else {
                                    result = {
                                        code: 200,
                                        msg: '修改成功'
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
            });
        });
    },
    reprint(req, res, next) {
        // var title = "[转载]" + req.body.title,
        //     content = req.body.content,
        //     tags = req.body.tags,
        //     userid = req.session.user,
        //     date = new Date().toLocaleString(),
        //     fromid = req.body.fromid;

        var title = "[转载]" + 'ttttt',
            content = 'qwertyuuioplkjhgfdsazxcvbnm',
            tags = ['bick', 'swiming'],
            userid = 6,
            date = new Date().toLocaleString(),
            fromid = req.body.fromid;

        pool.getConnection((err, connection) => {
            //开启事务
            connection.beginTransaction(function (err) {
                if (err) {
                    jsonWrite(res, undefined);
                    connection.release();
                    return;
                }

                connection.query($articlesql.reprint, [userid, title, content, date, fromid], (err, result) => {
                    if (result) {
                        var articleid = result.insertId;
                        var funobj = {
                            insertReprint(cb) {
                                connection.query($articlesql.insertReprint, [fromid, articleid], (err, result) => {
                                    cb(err, result);
                                });
                            }
                        };
                        tags.forEach((v, i) => {
                            funobj['tagfun' + i] = function (cb) {
                                connection.query($tagsql.insert, v, (err, result) => {
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
                                if (err) {
                                    console.log("执行事务失败，" + err);
                                    connection.rollback(function (err) {
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
    queryById(req, res, next) {
        var id = req.params.articleid;
        pool.getConnection((err, connection) => {
            //开启事务
            connection.beginTransaction(function (err) {
                if (err) {
                    jsonWrite(res, undefined);
                    connection.release();
                    return;
                }

                var funobj = {
                    queryArticle(cb) {
                        connection.query($articlesql.queryById, id, function (err, result) {
                            cb(err, result);
                        });
                    },
                    queryTags(cb) {
                        connection.query($article_tagssql.queryByArticleid, id, function (err, result) {
                            cb(err, result);
                        });
                    },
                    queryComments(cb) {
                        connection.query($articlesql.queryComment, id, function (err, result) {
                            cb(err, result);
                        });
                    },
                    reprintCount(cb) {
                        connection.query($articlesql.reprintCount, id, function (err, result) {
                            cb(err, result);
                        });
                    },
                };

                async.parallel(funobj, function (error, result) {
                    connection.commit(function (err, info) {
                        if (err) {
                            console.log("执行事务失败，" + err);
                            connection.rollback(function (err) {
                                connection.release();
                                return;
                            });
                        } else {
                            result = {
                                code: 200,
                                msg: '修改成功'
                            };
                            jsonWrite(res, result);
                            connection.release();
                        }
                    })
                });
            });
        });
    },
    queryById(req, res, next) {
        var id = req.params.articleid;
        pool.getConnection(function (err, connection) {
            connection.query($articlesql.queryById, id, function (err, result) {
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
    queryByTitle(req, res, next) {
        // var title = req.query.title,
        //     currentPage = req.query.currentPage,
        //     pageSize = req.query.pageSize;
        var title = 'tt',
            currentPage = 0,
            pageSize = 2;

        pool.getConnection((err, connection) => {
            connection.query($articlesql.queryByTitle, [title, currentPage * pageSize, pageSize], function (err, result) {
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
                        listOb: result
                    });
                }

                connection.release();
            });
        });
    },
    queryByUserid(req, res, next) {
        // var id = parseInt(req.params.userid),
        //     currentPage = req.query.currentPage,
        //     pageSize = req.query.pageSize;
        var id = 6,
            currentPage = 1,
            pageSize = 2;

        pool.getConnection(function (err, connection) {
            connection.query($articlesql.queryByUserid, [id, currentPage * pageSize, pageSize], function (err, result) {
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
                        listOb: result
                    });
                }
                connection.release();
            });
        });
    },
    queryByTagname(req, res, next) {
        // var tagname = req.params.tag,
        //     currentPage = req.query.currentPage,
        //     pageSize = req.query.pageSize;

        var tagname = 'bick',
            currentPage = 2,
            pageSize = 1;

        pool.getConnection(function (err, connection) {
            connection.query($articlesql.queryByTagname, [tagname, currentPage * pageSize, pageSize], function (err, result) {
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
                        listOb: result
                    });
                }
                connection.release();
            });
        });
    },
    queryList(req, res, next) {
        // var currentPage = req.query.currentPage,
        //     pageSize = req.query.pageSize;
        var currentPage = 0,
            pageSize = 2;
        pool.getConnection((err, connection) => {
            connection.query($articlesql.queryList, [currentPage * pageSize, pageSize], function (err, result) {
                if (err) {
                    result = void 0;
                } else {
                    result = {
                        code: 200,
                        listOb: result
                    };
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryAll(req, res, next) {
        // var currentPage = req.query.currentPage,
        //     pageSize = req.query.pageSize;
        var currentPage = 0,
            pageSize = 2;
        pool.getConnection((err, connection) => {
            connection.query($articlesql.queryAll, [currentPage * pageSize, pageSize], function (err, result) {
                if (err) {
                    result = void 0;
                } else {
                    result = {
                        code: 200,
                        listOb: result
                    };
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    allTags(req, res, next) {
        pool.getConnection((err, connection) => {
            connection.query($tagsql.queryAll, function (err, result) {
                jsonWrite(res, {
                    code: 200,
                    listOb: result
                });
                connection.release();
            });
        });
    },
    addComment(req, res, next) {

        // var comment = req.body.comment,
        //     articleid = req.body.articleid,
        //     userid = req.body.userid;

        var comment = "评论呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵",
            articleid = 6,
            userid = 6;

        pool.getConnection((err, connection) => {
            //开启事务
            connection.beginTransaction(function (err) {
                if (err) {
                    jsonWrite(res, undefined);
                    connection.release();
                    return;
                }

                async.waterfall([
                    function (cb) {
                        connection.query($usersql.queryNickname, userid, function (err, result) {
                            console.log(result[0].nickname);
                            cb(err, result[0].nickname);
                        });
                    },
                    function (result, cb) {
                        connection.query($articlesql.addComment, [comment, articleid, userid, result], function (err, result) {
                            cb(err, result);
                        });
                    }
                ], function (err, result) {
                    connection.commit(function (err, info) {
                        if (err) {
                            console.log("执行事务失败，" + err);
                            connection.rollback(function (err) {
                                connection.release();
                                return;
                            });
                        } else {
                            result = {
                                code: 200,
                                msg: '评论成功'
                            };
                            jsonWrite(res, result);
                            connection.release();
                        }
                    })
                });
            });
        });
    },
};
