var tags_article = {
    insert:'INSERT INTO article_tags(tagname, articleid) VALUES(?,?)',
    deleteTag: 'delete from article_tags where articleid=?',
    queryByTagname: 'select articleid from article_tags where tagname=?',
    queryByArticleid: 'select tagid from article_tags where articleid=?'
};

module.exports = tags_article;