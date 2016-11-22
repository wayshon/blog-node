var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');   //开发环境用morgan  生产环境用 express-logger
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//打印日志到本地文件
var fs = require('fs');
var accessLog = fs.createWriteStream('access.log', {flags: 'a'});
var errorLog = fs.createWriteStream('error.log', {flags: 'a'});

var app = express();

app.set('port', process.env.PORT || 9911);

// view engine setup
app.set('views', path.join(__dirname, 'views'));    //设置 views 文件夹为存放视图文件的目录, 即存放模板文件的地方,__dirname 为全局变量,存储当前正在执行的脚本所在的目录。
app.set('view engine', 'ejs');    //设置视图模板引擎为 ejs

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));    //设置/public/favicon.ico为favicon图标
app.use(logger('dev'));   //加载日志中间件
// app.use(logger({stream: accessLog}));   //打印日志到本地文件，这句会有莫名其妙的警告，现在用下面的
app.use(logger('combined', { 'stream': accessLog}));    //打印日志到本地文件
app.use(bodyParser.json());   //加载解析json的中间件
app.use(bodyParser.urlencoded({ extended: false }));    //加载解析urlencoded请求体的中间件
app.use(cookieParser());    //加载解析cookie的中间件
app.use(express.static(path.join(__dirname, 'public')));    //设置public文件夹为存放静态文件的目录
//打印错误日志到本地文件
app.use(function (err, req, res, next) {
  var meta = '[' + new Date() + '] ' + req.url + '\n';
  errorLog.write(meta + err.stack + '\n');
  next();
});

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var settings = require('./conf/setting');
var sessionStore = new MySQLStore(settings);

// app.use(session({
//     key: 'session_cookie_name',
//     secret: 'session_cookie_secret',
//     store: sessionStore,
//     resave: true,
//     saveUninitialized: true
// }));

app.use(session({
  resave:false,//添加这行  
  saveUninitialized: true,//添加这行
  secret: settings.cookieSecret,
  key: settings.database,//cookie name
  cookie: {maxAge: 1000 * 60 * 30},// 30分钟
  store: sessionStore
}));

// //数据库
// var settings = require('./setting');     //数据库名与端口号对象

/*使用 express-session 和 connect-mongo 模块实现了将会话信息存储到mongoldb中。
secret 用来防止篡改 cookie，key 的值为 cookie 的名字，通过设置 cookie 的 maxAge 值设定 cookie 的生存期，
这里我们设置 cookie 的生存期为 30 天，
设置它的 store 参数为 MongoStore 实例，把会话信息存储到数据库中，以避免丢失。*/
// var session = require('express-session');
// var MongoStore = require('connect-mongo')(session);
// app.use(session({
//   resave:false,//添加这行  
//   saveUninitialized: true,//添加这行
//   secret: settings.cookieSecret,
//   key: settings.db,//cookie name
//   cookie: {maxAge: 1000 * 60 * 60 * 24},// 1天
//   store: new MongoStore({
//     db: settings.db,
//     host: settings.host,
//     port: settings.port
//   })
// }));
/*
注意： connect-mongo 最新版需要改成如：
store: new MongoStore({
  url: 'mongodb://localhost/blog'
})
*/

// //设置跨域访问
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", req.headers.origin);
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since");
//     // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     // res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

app.use(require('cors')());

//创建子域名和处理
var vhost = require('vhost')
var test = express.Router();
app.use(vhost('test.*', test));
var testRoutes = require('./router/test')
testRoutes(test);

//路由控制器
var routes = require('./router/api');
routes(app);

//定制404页面
app.use((req, res) => {
    res.status(404);
    res.end('404 - Not Found -- blog-node');
});

//定制500页面
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500);
    res.end('500 - Server Error -- blog-node')
  });

app.listen(app.get('port'), () => {
    console.log(`run in: http://localhost:${app.get('port')}`);
});

//导出app实例供其他模块调用
module.exports = app;