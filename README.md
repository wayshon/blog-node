# blog-node

### 数据库结构（blog）
- user

    存储了账号，密码，邮箱，昵称，头像连接。头像连接是绝对地址，图片存储在`public/images/`下。触发器`user_afterdelete_on_comment`与user_afterdelete_on_praise，当user删除一条记录时，更新comments与praise表中nickname为'用户已删除'。
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

- article_view(视图)

    存储了articleid,userid,title,content,date,readCount,avatar,nickname,commentCount,reprintCount,praiseCount。
- article_view_list(视图)

    比article_view少了content字段。

### 接口形态

# 1 首页

## 1.1 首页

### 1.1.1 首页数据

### Description

获取首页文章列表

### URL

/api/home

### Request Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
| 当前页 | currentPage | number |  |
| 每页条数 | pageSize | number |  |

### Response Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
|  | msg |  |  |
| 状态码 | code | number |  |
|  | listOb | array<object> |  |
| ---阅读次数 | readCount | number |  |
| ---文章标题 | date | string |  |
| ---头像 | avatar | string |  |
| ---标签 | tags | array<string> |  |
| ---图片路径 | imgs | array<string> |  |
| ---转载次数 | reprintCount | number |  |
| ---昵称 | nickname | string |  |
| ---文章 id | id | number |  |
| ---评论数 | commentCount | number |  |
| ---发布时间 | time | string |  |
| ---用户id | userid | number |  |


### 1.1.2 登录

### Description

用户登录

### URL

/api/login

### Request Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
| 账号 | username | string |  |
| 密码 | password | string |  |
| 头像链接 | avatar | string |  |
| 昵称 | nickname | string |  |
| 邮箱 | email | string |  |

### Response Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
|  | msg |  |  |
|  | ob | object |  |
| ---用户 id | id | number |  |
| 状态码 | code | number |  |

### 1.1.3 上传头像

### Description

上传头像

### URL

/api/avatar

### Request Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
| base64 图片 | avatar | string |  |

### Response Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
|  | ob | object |  |
| ---图片路径 | path | string |  |
|  | msg |  |  |
| 状态码 | code | number |  |

### 1.1.4 登出

### Description

用户登出

### URL

/api/logout

### Request Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |

### Response Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
|  | msg |  |  |
| 状态码 | code | number |  |
|  | ob | object |  |

# 2 文章

## 2.1 文章

### 2.1.1 发表文章

### Description

发表文章

### URL

/api/article

### Request Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
| 文章内容 | content | string |  |
| 图片地址数组 | imgs | array<string> |  |
| 标题 | title | string |  |
| 用户id | userid | number |  |
| 文章标签 | tags | array<string> |  |

### Response Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
|  | code | number |  |
|  | msg | string |  |
|  | ob | object |  |
| ---文章id | id | number |  |

### 2.1.2 修改文章

### Description

修改文章

### URL

/api/edit

### Request Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
| 标题 | title | string |  |
| 文章标签 | tags | array<string> |  |
| 图片地址数组 | imgs | array<string> |  |
| 文章内容 | content | string |  |
| 文章id | id | number |  |

### Response Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
|  | msg | string |  |
|  | code | number |  |
|  | ob | object |  |
| ---文章id | id | number |  |

### 2.1.3 上传图片

### Description

上传图片

### URL

/api/uploadimg

### Request Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
| base64 图片 | img | string |  |
| 图片名(可选) | imgName | string |  |

### Response Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
|  | msg |  |  |
| 状态码 | code | number |  |
|  | ob | object |  |
| ---图片路径 | path | string |  |

### 2.1.4 删除文章

### Description

删除文章

### URL

/api/remove

### Request Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
| 文章id | id | number |  |

### Response Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
|  | msg | string |  |
|  | ob | object |  |
|  | code | number |  |

### 2.1.5 发表评论

### Description

发表评论

### URL

/api/comment

### Request Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
| 评论内容 | content | string |  |
| 文章id | articleid | number |  |
| session | userid | number |  |

### Response Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
|  | msg | string |  |
|  | ob | object |  |
|  | code | number |  |

### 2.1.6 转载文章

### Description

转载文章

### URL

/api/reprint

### Request Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
| 文章id | id | number |  |

### Response Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
|  | code | number |  |
|  | ob | object |  |
| ---文章id | id | number |  |
|  | msg | string |  |

### 2.1.7 点赞

### Description

点赞

### URL

/api/addpraise

### Request Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
| 文章id | articleid | number |  |
| session | userid | number |  |

### Response Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
|  | ob | object |  |
|  | msg | string |  |
|  | code | number |  |

### 2.1.8 取消赞

### Description

取消赞

### URL

/api/deletepraise

### Request Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
| 文章id | articleid | number |  |
| session | userid | number |  |

### Response Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
|  | code | number |  |
|  | ob | object |  |
|  | msg | string |  |

## 2.2 搜索

### 2.2.1 获取所有标签

### Description

获取所有标签

### URL

/api/tags

### Request Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |

### Response Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
|  | code | number |  |
|  | listOb | array<string> |  |
| ---tag名 | name | string |  |
|  | msg | string |  |

### 2.2.2 获取指定标签的文章

### Description

获取指定标签的文章

### URL

/api/articlebytag

### Request Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
| 当前页 | currentPage | number |  |
| 每页条数 | pageSize | number |  |
| tag名 | tag | string |  |

### Response Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
| 状态码 | code | number |  |
|  | msg |  |  |
|  | listOb | array<object> |  |
| ---阅读次数 | readCount | number |  |
| ---文章标题 | title | string |  |
| ---昵称 | nickname | string |  |
| --- | tags | array<string> |  |
| ---转载次数 | reprintCount | number |  |
| ---文章 id | id | number |  |
| ---发布时间 | time | string |  |
| ---头像 | avatar | string |  |
| ---评论数 | commentCount | number |  |
| ---图片路径 | imgs | array<string> |  |

### 2.2.3 获取指定标题的文章

### Description

获取指定标题的文章

### URL

/api/articlebytitle

### Request Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
| 文章标题 | title | string |  |
| 每页条数 | pageSize | number |  |
| 当前页 | currentPage | number |  |

### Response Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
|  | msg |  |  |
|  | listOb | array<object> |  |
| --- | tags | array<string> |  |
| ---转载次数 | reprintCount | number |  |
| ---图片路径 | imgs | array<string> |  |
| ---头像 | avatar | string |  |
| ---阅读次数 | readCount | number |  |
| ---文章标题 | title | string |  |
| ---昵称 | nickname | string |  |
| ---评论数 | commentCount | number |  |
| ---发布时间 | time | string |  |
| ---文章 id | id | number |  |
| 状态码 | code | number |  |

### 2.2.4 获取指定用户的文章

### Description

获取指定用户的文章

### URL

/api/articlebyuser

### Request Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
| 每页条数 | pageSize | number |  |
| 当前页 | currentPage | number |  |
| 用户id | userid | number |  |

### Response Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
|  | msg |  |  |
|  | listOb | array<object> |  |
| ---昵称 | nickname | string |  |
| ---阅读次数 | readCount | number |  |
| ---文章标题 | title | string |  |
| ---评论数 | commentCount | number |  |
| ---转载次数 | reprintCount | number |  |
| ---文章 id | id | number |  |
| ---头像 | avatar | string |  |
| --- | tags | array<string> |  |
| ---图片路径 | imgs | array<string> |  |
| ---发布时间 | time | string |  |
| 状态码 | code | number |  |

### 2.2.5 获取指定文章内容

### Description

获取指定文章内容

### URL

/api/articlebyid

### Request Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
| 文章id | id | number |  |

### Response Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
|  | ob | object |  |
| ---发布时间 | date | string |  |
| ---文章标题 | title | string |  |
| ---头像 | avatar | string |  |
| ---评论数 | commentCount | number |  |
| ---用户id | userid | number |  |
| ---文章 id | id | number |  |
| ---转载次数 | reprintCount | number |  |
| ---内容 | content | string |  |
| ---阅读次数 | readCount | number |  |
| ---昵称 | nickname | string |  |
| ---图片路径 | imgs | array<string> |  |
|  | msg |  |  |
| 状态码 | code | number |  |

### 2.2.6 获取文章简介列表

### Description

获取文章简介列表

### URL

/api/articlelist

### Request Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
| 当前页 | currentPage | number |  |
| 每页条数 | pageSize | number |  |

### Response Param List

| Name | Identifier | Type | Remark |
| --- | --- | --- | --- |
|  | listOb | array<object> |  |
| ---文章 id | id | number |  |
| ---文章标题 | title | string |  |
| ---发布时间 | time | string |  |
| 状态码 | code | number |  |
|  | msg |  |  |

