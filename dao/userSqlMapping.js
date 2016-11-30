// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
    addAvatar:'INSERT INTO images(id, path) VALUES(0,?)',
    insert:'INSERT INTO user(id, username, password, email, nickname, avatar) VALUES(0,?,?,?,?,?)',
    update:'update user set username=?, password=? where id=?',
    delete: 'delete from user where id=?',
    queryById: 'select * from user where id=?',
    queryByName: 'select * from user where username=?',
    queryAll: 'select * from user',
    queryNickname: 'select nickname from user where id=?',
};

module.exports = user;