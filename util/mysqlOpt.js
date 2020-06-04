//这是采用promise写法的链接数据库文件
//数据库工具类
const mysql=require("mysql");
let connection=mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"root",
    database:"xunke"
})
function exec (sql, params) {
    return new Promise(function(resolve, reject){
        connection.query(sql, params, function(err, result){
            if (err) {
                console.log(err);
                return;
            }
            resolve(result);
        })
    })
}
module.exports = {exec};
