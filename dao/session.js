// 实现与MySQL交互
var mysql = require('mysql');
var $db = require('../conf/db');
// 使用连接池，提升性能
var pool = mysql.createPool($db.mysql);

var expires = 10000;

var insert = `INSERT INTO sessions(id, expires, data) VALUES(?,?,?)`,
    queryById = `select expires from sessions where id=?`,
    update = `update sessions set expires=? where id=?`,
    deleteById = `delete from sessions where id=?`;

module.exports = {
    insert(data, cb) {
        var id = Math.random().toString(36).substr(2),  //生成随机字符串
            fireTime = new Date().getTime() + expires;

        if (typeof data !== "string") {
            data = JSON.stringify(data);
        }

        pool.getConnection((err, connection) => {
            connection.query(insert, [id, fireTime, data], (err, result) => {
                if (err) {
                    cb(err);
                } else {
                    cb(null, id);
                }
                connection.release();
            });
        });
    },
    update(id, cb) {
        var fireTime = new Date().getTime() + expires;
        pool.getConnection((err, connection) => {
            connection.query(update, [fireTime, id], function (err, result) {
                if (err) {
                    cb(err);
                } else {
                    cb(null, result);
                }
                connection.release();
            });
        });
    },
    delete(id, cb) {
        pool.getConnection((err, connection) => {
            connection.query(deleteById, id, function (err, result) {
                if (err) {
                    cb(err);
                } else {
                    cb(null, result);
                }
                connection.release();
            });
        });
    },
    compare(id, cb) {
        pool.getConnection((err, connection) => {
            connection.query(queryById, id, function (err, result) {
                if (err) {
                    cb(err);
                    return false;
                } else {
                    var oldTime = result[0].expires,
                        nowTime = new Date().getTime();

                    if (nowTime > oldTime) {
                        cb(null, false);
                    } else {
                        cb(null, true);
                    }
                }
                connection.release();
            });
        });
    }
}