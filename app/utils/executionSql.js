  // 获取数据库连接
var connection = require('../utils/mysqlUtils').getConnection;
var returnResult= require('../utils/returnResult');
class ExecutionSql {
    
    /**
     * 查询AllList根据表名
     * @param {表名} table 
     * @param {=输出流}} res 
     */
    findAllByTable(table,res){
        var sqlCount = 'SELECT * FROM '+table;
        connection.query(sqlCount, function (err, resultsCount) {
            if (err) {
                throw err
            } else {
                res.end(JSON.stringify(resultsCount));
            }
        });
    }
    /**
     * 查询one根据表名和id
     * @param {TableName} table 
     * @param {id} id 
     * @param {输出流} res 
     */
    findOneByTableAndId(table,id ,res) {

        var sqlCount = 'SELECT * FROM '+table+'  WHERE id = ? ';
		connection.query(sqlCount, [id ],function (err, resultsCount) {
			if (err) {
				throw err
			} else {
				res.end(returnResult.SUCCESSDATA(resultsCount));
			}
		});

    }
    /**
     * 删除one根据表名和id
     * @param {TableName} table 
     * @param {id} id 
     * @param {输出流} res 
     */
    deleteOneByTableandId(table,id ,res){
        var deleteQuery = 'DELETE FROM '+table+' WHERE id = ? ';
        connection.query(deleteQuery,[id],function(err, rows) {
            if (err) {
                throw err
            } else {
                res.end(returnResult.SUCCESSDATA(rows));
            }
        });
    }

    /**
     * 根据key获取数据字典数据
     * @param {数据字典key} key 
     * @param {*} res 
     */
    getDictionaryByKey(key ,res){
        var sqlCount = 'SELECT * FROM base_dictionary WHERE dictionaryKey = ? ';
        connection.query(sqlCount,[key],function(err, rows) {
            if (err) {
                throw err
            } else {
                res.end(JSON.stringify(rows));
            }
        });
    }
        /**
     * 根据Pid获取模块
     * @param {pid} key 
     * @param {*} res 
     */
    getModuleByPid(pid ,res){
        var sqlCount = 'SELECT * FROM base_module WHERE pId = ? ';
        if(pid==='null'){
            sqlCount = 'SELECT * FROM base_module WHERE pId is NULL ' 
        }
        connection.query(sqlCount,[pid],function(err, rows) {
            if (err) {
                throw err
            } else {
                res.end(JSON.stringify(rows));
            }
        });
    }

}
  /**
 * 根据表名执行sql
 */
module.exports = {
    // 查询AllList
    findAllByTable(table,res) {
        return new ExecutionSql().findAllByTable(table,res);
    } ,
    findOneByTableAndId(table,id,res) {
        return new ExecutionSql().findOneByTableAndId(table,id,res);
    } ,
    deleteOneByTableandId(table,id,res) {
        return new ExecutionSql().deleteOneByTableandId(table,id,res);
    } ,
    getDictionaryByKey(key,res) {
        return new ExecutionSql().getDictionaryByKey(key,res);
    } ,
    getModuleByPid(pid,res) {
        return new ExecutionSql().getModuleByPid(pid,res);
    } ,
    
}