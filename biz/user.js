//该模块为用户模块
const msgResult = require("../util/msgResult");
const tools = require("../util/tools")
const mysqlOpt = require("../util/mysqlOpt")
const jwt=require("../util/jwt")
//用户注册
let register=async (req,res)=>{
    let body=req.body;
    let name=body.name;
    let pwd=body.pwd;
    let nick=body.nick;
    let sex=body.sex;
    let validArr = [
        {str:name,maxLength:200},
        {str:nick,maxLength:200},
        {str:pwd,maxLength:50},
        {str:sex,maxLength:1},
    ];
    if(!tools.validLengthBatch(validArr)){
        //以下仅代表请求结束，不代表代码执行结束
        res.json(msgResult.error("注册信息异常"));
        return;
    };
    let users_name =await mysqlOpt.exec("select * from project_users where name = ?",[name]);
    if(users_name.length>0){
        res.send(msgResult.error("账户已存在"));
        return;
    };
    let users_nick =await mysqlOpt.exec("select * from project_users where nick = ?",[nick]);
    if(users_nick.length>0){
        res.send(msgResult.error("昵称已存在"));
        return;
    };
    await mysqlOpt.exec("insert into project_users (id,name,nick,pwd,sex) value (?,?,?,?,?)",
        [tools.newId(),name,nick,pwd,sex])
    res.send(msgResult.ok("注册成功"))
}
//登录，需要将登录后的信息加密返回前台，利用jwt
let login=async (req,res)=>{
    let body=req.body;
    let name=body.name;
    let pwd=body.pwd;
    let zt = body.zt
    let usersPwd = await mysqlOpt.exec("select id,pwd,nick from project_users where name = ?",[name]);
    console.log(usersPwd)
    if(usersPwd.length != 1){
        res.send(msgResult.error("用户名或密码错误"));
        return;
    }
    if(usersPwd[0].pwd != pwd){
        res.send(msgResult.error("用户名或密码错误"));
        return;
    }
    if(usersPwd[0].pwd === pwd){
        let encryptUser = {name,id:usersPwd[0].id,nick:usersPwd[0].nick} //加密对象
        let token = jwt.sign(encryptUser,global.jwtKey,86400)//加密后数据
        if(zt === "true"){
            res.cookie("Name",name)
        }
        res.send(msgResult.ok(token));
    }
}
module.exports={register,login}