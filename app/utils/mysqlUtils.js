/**
 * Created by wh 2018/8/14
 * s数据库连接池配置实例化
 */
var mysql = require('mysql')
var dbconfig = require('../../config/database');

  
/**
 * 获取数据库连接
 */
function getConnection(){

    


    // 创建数据库
    var connection= mysql.createConnection(dbconfig.connection)
       // 设置数据库
       connection.query('USE ' + dbconfig.database);
    /** 
     * 5秒调用一次查询保持数据库活连接
    */
    setInterval(function () {
        connection.query('SELECT 1');
    }, 5000);
 
    // 返回连接
    return connection;
}
module.exports = {
    // 获取连接
    getConnection : getConnection(),
    
}