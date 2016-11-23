var article = {
    insert:'INSERT INTO article(id, userid, title, content, date) VALUES(0,?,?,?,?)',
    update:'update article set title=?, content=?, date=? where id=?',
    delete: 'delete from article where id=?',
    queryById: 'select * from article where id=?',
    queryByTitle: 'select * from article where title=? limit ?, ?',
    queryByUserid: 'select * from article where userid=? limit ?, ?',
    queryByTagname: 'select * from article where id in (select articleid from article_tags where tagname=?) limit ?, ?',
    queryList: 'select title, date from article limit ?, ?',
    queryAll: 'select * from article limit ?, ?'
};

module.exports = article;