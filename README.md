# blog-node

### 数据库表结构（blog）
- user

    存储了账号，密码，邮箱，昵称，头像连接。头像连接是绝对地址，图片存储在`public/images/`下。触发器`user_afterdelete_on_comment`，当user删除一条记录时，更新comments表中nickname为'用户已删除'。
- article

    存储了用户id，标题，内容，时间，转载自哪篇文章的id，阅读次数。外键为userid，连接到user表的id。级联删除更新。
- tags

    唯一一个字段，标签名。
- article_tags

    存储了文章id和标签名，都是外键，分别对应article表的id和tags表的标签名。
- comments

    存储了评论内容，文章id，评论者userid，评论者昵称。文章id外键到article的id，级联更新删除。
- reprint

    存储了fromid（来自哪篇文章id），toid（转载称为的那篇新文章id）。fromid外键到article的id，级联更新删除。这里的fromid主要用来统计转载次数，toid没有设外键且目前感觉这个字段没什么用，权且当做跟踪。要是增加原文删除带动转载的也删除，可能用到这个字段。
- sessions

    由`express-session`插件生成
- images

    存储了图片路径，articleid(外键)，用来保存某篇文章的图片
- praise

    存储了userid,nickname,articleid。用来保存用户的点赞信息

