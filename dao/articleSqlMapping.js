var article = {
    insert:'INSERT INTO article(id, userid, title, content, date, readCount) VALUES(0,?,?,?,?,?)',
    update:'update article set title=?, content=?, date=? where id=?',
    delete: 'delete from article where id=?',
    queryById: 'select * from article_view where id=?',
    queryByTitle: 'select * from article where title like "%"?"%" limit ?, ?',
    queryByUserid: 'select * from article where userid=? limit ?, ?',
    queryByTagname: 'select * from article_list_view where id in (select articleid from article_tags where tagname=?) limit ?, ?',
    queryList: 'select title, date from article limit ?, ?',
    queryAll: 'select * from article_view_list limit ?, ?',
    reprint:'INSERT INTO article(id, userid, title, content, date, fromid, readCount) VALUES(0,?,?,?,?,?,?)',
    insertReprint: 'INSERT INTO reprint(id, fromid, toid) VALUES(0,?,?)',
    reprintCount: 'select count(*) as sum from reprint where fromid=?',
    addComment:'INSERT INTO comments(id, comment, articleid, userid, nickname) VALUES(0,?,?,?,?)',
    queryComment: 'select * from comments where articleid=?',
    queryReadCount: 'select readCount from article where id=?',
    updateReadCount: 'update article set readCount=? where id=?',
    addPraise:'INSERT INTO praise(id, articleid, userid, nickname) VALUES(0,?,?,?)',
    deletePraise: 'delete from praise where articleid=? and userid=?',
    addImages:'INSERT INTO images(id, articleid, path) VALUES(0,?,?)',
    queryImages: 'select path from images where articleid=?',
};

module.exports = article;