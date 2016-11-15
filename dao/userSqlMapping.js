// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
    insert:'INSERT INTO user(id, name, age) VALUES(0,?,?)',
    update:'update user set name=?, age=? where id=?',
    delete: 'delete from user where id=?',
    queryById: 'select * from user where id=?',
    queryByName: 'select * from user where name=?',
    queryAll: 'select * from user'
};

module.exports = user;