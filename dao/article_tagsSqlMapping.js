var tags_article = {
    insert:'INSERT INTO article_tags(tagname, articleid) VALUES(?,?)',
    deleteTag: 'delete from article_tags where articleid=?',
    queryByTagname: 'select articleid from article_tags where tagname=?',
    queryByArticleid: 'select tagname from article_tags where articleid=?',
    queryTags: 'select tagname FROM article_tags WHERE articleid=?'
};

module.exports = tags_article;