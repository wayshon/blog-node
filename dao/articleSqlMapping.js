var article = {
    insert:'INSERT INTO article(id, title, content, userid) VALUES(0,?,?,?)',
    update:'update article set title=?, content=? where id=?',
    delete: 'delete from article where id=?',
    queryById: 'select * from article where id=?',
    queryByTitle: 'select * from article where title=?',
    queryByUserid: 'select * from article where userid=?',
    queryByTagname: 'select * from article where id in (select articleid from article_tags where tagname=?)',
    queryAll: 'select * from article'
};

module.exports = article;