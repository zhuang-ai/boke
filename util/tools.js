//杂项工具类
let tools={}
//两种时间格式常量
const f14 = "yyyyMMddhhmmss";
const f19 = "yyyy-MM-dd hh:mm:ss";

//创建一个id的工具，以当前时间yyyyMMddhhmmss加5个随机数组成一个19位的id
let newId = ()=>{
    let c = new Date().format(f14);
    let r =Math.round(Math.random() * 100000)
    return c + r;
}
//获取当前时间yyyyMMddhhmmss的字符串
let getDate14 = function(){
    return new Date().format(f14)
}
//获取当前时间yyyy-MM-dd hh:mm:ss的字符串
let getDate19 = function(){
    return new Date().format(f19)
}
//验证字符串长度是否在最大范围内
let validLength = (str,maxLength)=>{
    //判断字符串是否存在
    if(!str){
        return true;
    }
    //判断是否是字符串
    if(typeof str != "string"){
        return false;
    }
    //判断字符串长度
    if(str.length <= maxLength){
        return true;
    }
    else{
        return false
    }
}
//批量验证长度,传入arr=[{str:str,maxLength:length}]
let validLengthBatch = (arr)=>{
    for (let i = 0,l=arr.length;i < l;i++){
        let item=arr[i];
        if(!validLength(item.str,item.maxLength)){
            return false;
        }
        return true;
    }
}

//Date的prototype 属性可以向对象添加属性和方法。
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

module.exports = {newId,getDate14,getDate19,validLengthBatch,validLength}