var article = {
    insert:'INSERT INTO article(id, userid, title, content, date) VALUES(0,?,?,?,?)',
    update:'update article set title=?, content=?, date=? where id=?',
    delete: 'delete from article where id=?',
    queryById: 'select * from article where id=?',
    queryByTitle: 'select * from article where title like "%"?"%" limit ?, ?',
    queryByUserid: 'select * from article where userid=? limit ?, ?',
    queryByTagname: 'select * from article where id in (select articleid from article_tags where tagname=?) limit ?, ?',
    queryList: 'select title, date from article limit ?, ?',
    queryAll: 'select * from article limit ?, ?',
    reprint:'INSERT INTO article(id, userid, title, content, date, fromid) VALUES(0,?,?,?,?,?)',
    insertReprint: 'INSERT INTO reprint(id, fromid, toid) VALUES(0,?,?)',
    reprintCount: 'select count(*) from reprint where fromid=?',
    addComment:'INSERT INTO comments(id, comment, articleid, userid, nickname) VALUES(0,?,?,?,?)',
    queryComment: 'select * from comments where articleid=?',
    
};

module.exports = article;