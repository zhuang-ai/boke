const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const jwt = require('./util/jwt');
const tools = require('./util/tools');
const msgResult = require('./util/msgResult');
const usersRouter = require('./routes/users');
const articleRouter = require('./routes/article');

const app = express();
app.all("*",function (req,res,next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","*");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","*");
    if(req.method.toLowerCase() == 'options'){
        res.send(200);//让options尝试请求快速结束
    }else{
        next();
    }
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 前置拦截器，用来拦截所有的请求,打印请求信息
 */
app.use(function(req, res, next){
    let prefix = `[app-request]${tools.getDate19()}-`;
    let path = req.path;
    let type = req.method.toLowerCase();
    console.log(`${prefix}请求地址：${path}`);
    console.log(`${prefix}请求类型：${type}`);
    if (type === 'post') {
        console.log(`${prefix}请求参数：${JSON.stringify(req.body)}`);
    } else if (type === 'get') {
        console.log(`${prefix}请求参数：${JSON.stringify(req.query)}`);
    }
    next();
})
app.use(function(req, res, next){
    let reqPath = req.path;
    if (reqPath.startsWith('/users') || reqPath.startsWith('/article')) {
        if (reqPath !== '/users/login' && reqPath !== '/users/regist') {
            let token = req.headers.token;
            jwt.verify(token,global.jwtKey,function(user){
                req.headers.sessionData = user;
                console.log(`[app-request]${tools.getDate19()}-当前用户：${JSON.stringify(user)}`);
                next();
            },function(err){
                res.send(msgResult.error('会话已过期，请重新登录'));
            })
        } else {
            next();
        }
    } else {
        next();
    }

})

app.use('/users', usersRouter);
app.use('/article', articleRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
    console.log(req.app.get('env') === 'development' ? err : {});
    res.send(msgResult.error(err.message));
});

/**
 * 设置全局的加密串秘钥
 * @type {string}
 */
global.jwtKey = '123456';

app.listen(8080,()=>{
    console.log('服务器启动');
});