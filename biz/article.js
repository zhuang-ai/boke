//文章模块
const msgResult = require("../util/msgResult");
const tools = require("../util/tools");
const mysqlOpt = require("../util/mysqlOpt");

//新增文章
let add = async (req,res)=>{
    let body = req.body;
    let content = body.content;
    let title = body.title;
    let className = body.className;
    if(!title){
        res.send(msgResult.error("标题不能为空"));
        return;
    }
    if(!content){
        res.send(msgResult.error("文章不能为空"));
        return;
    }
    let sessionData = req.headers.sessionData; //获取用户的信息
    let params = [tools.newId(),title,content,className,tools.getDate19(),sessionData.nick];
    // console.log(params)
    await mysqlOpt.exec("insert into project_article (id,title,content,class,create_time,create_user) values (?,?,?,?,?,?)",params);
    res.send(msgResult.ok())

};
//获取用户的昵称
let userName = async (req,res)=>{
    let sessionData = req.headers.sessionData; //获取用户的信息
    res.send(msgResult.ok(sessionData.nick))
}
//获取文章
let xr= async (req,res)=>{
   let content = await mysqlOpt.exec("select title,class,content,create_time,create_user from project_article");
   // console.log(content)
    res.send(msgResult.ok(content))
}
module.exports = {add,userName,xr}