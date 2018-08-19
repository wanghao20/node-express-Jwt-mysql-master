
// 加载

// 框架
var express = require('express');
// 加密
var bcrypt = require('bcrypt-nodejs');
// 返回类型
var returnResult= require('../../utils/returnResult');
// 路由
var router = express.Router();
// 获取数据库连接
var connection = require('../../utils/mysqlUtils').getConnection;
// 动态执行sql返回数据
var executionSql = require('../../utils/executionSql');
	// 获取数据字典数据
	router.get('/getDictionary', function (req, res) {

		
		executionSql.getDictionaryByKey(req.query.key,res);
	})
	// 根据Pid获取模块
	router.get('/getModuleByPid', function (req, res) {

		if (req.query.pid == '' ||req.query.pid == null || req.query.pid == undefined) {
			res.end(returnResult.ERRORMSG( '请传入参数key'));
			return;
		}
		executionSql.getModuleByPid(req.query.pid,res);
	})
	// 获取all用户数据(用于client分页)
	router.get('/getListAll', function (req, res) {

		if (req.query.table == '' ||req.query.table == null || req.query.table == undefined) {
			res.end(returnResult.ERRORMSG( '请传入参数Table'));
			return;
		}
		executionSql.findAllByTable(req.query.table,res);
	})

	// 获取单个数据
	router.get('/getOne', function (req, res) {
		if (req.query.id == '' ||req.query.id == null || req.query.id == undefined ||req.query.table == '' ||req.query.table == null || req.query.table == undefined) {
			res.end(returnResult.ERRORMSG( '请传入参数id或者table'));
			return;
		}
		executionSql.findOneByTableAndId(req.query.table,req.query.id,res);
	})

	// 删除单个信息
	router.post('/delete', function (req, res) {

		if (req.body.id == '' || req.body.id == null || req.body.id == undefined) {
			res.end(returnResult.ERRORMSG( '请传入参数id'));
			return;
		}
		executionSql.deleteOneByTableandId(req.body.table,req.body.id,res);
	})
	// 保存用户信息(新增/修改)
	router.post('/saveUser', function (req, res) {

		if (req.body.user == '' || req.body.user == null || req.body.user == undefined) {
			res.end(returnResult.ERRORMSG( '请传入参数id'));
			return;
		}
		var myDate = new Date();
		var user=req.body.user; 
		var password =bcrypt.hashSync(user.password, null, null)
	
		if(user.id == undefined||user.id == '' || user.id == null){

			// 判断登录名是否存在
		    connection.query("SELECT * FROM base_user WHERE username = ?",[user.username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
					res.end(returnResult.ERRORMSG( '登录名已存在!'));
					return;
                }
                   
            });

			var insertQuery = "INSERT INTO base_user ( username, password ,numbering ,name ,phone , roleName, createDate ) values (?,?,?,?,?,?,?)";
			// 保存
			connection.query(insertQuery,[user.username, password , user.numbering,user.name,user.phone,user.roleName,myDate.toLocaleString()],function(err, rows) {
				if (err) {
					throw err
				} else {
					res.end(returnResult.SUCCESSDATA(rows));
				}
			});
		}else{
				// 判断id是否存在数据
		connection.query("SELECT * FROM base_user where id='"+user.id+"'",function(err, rows) {
			if (err) {
				throw err
			} else {
				if(rows!==null||rows!== undefined||rows!== ''){
					//修改数据
					var updataQuery = "update base_user set username=?, password=?,numbering=?, name=?, phone=?,roleName=?, modifyDate=?  where id=?";
					connection.query(updataQuery,[user.username,password,user.numbering,user.name,user.phone,user.roleName,myDate.toLocaleString(),user.id], function (err, resultsCount) {
						if (err) {
							throw err
						} else {
							res.end(returnResult.SUCCESSDATA(resultsCount));
						}
					});
				}
			}
		});
		}
	
	
	})
	// 保存Role信息(新增/修改)
	router.post('/saveRole', function (req, res) {

		if (req.body.role == '' || req.body.role == null || req.body.role == undefined) {
			res.end(returnResult.ERRORMSG( '请传入参数id'));
			return;
		}
		var myDate = new Date();
		var role=req.body.role; 
		if(role.id == undefined||role.id == '' || role.id == null){
			var insertQuery = "INSERT INTO base_role ( numbering, name ,roleType ,remarks , createDate ) values (?,?,?,?,?)";
			// 保存
			connection.query(insertQuery,[role.numbering, role.name,role.roleType,role.remarks,myDate.toLocaleString()],function(err, rows) {
				if (err) {
					throw err
				} else {
					res.end(returnResult.SUCCESSDATA(rows));
				}
			});
		}else{
				// 判断id是否存在数据
		connection.query("SELECT * FROM base_role where id='"+role.id+"'",function(err, rows) {
			if (err) {
				throw err
			} else {
				if(rows!==null||rows!== undefined||rows!== ''){
					//修改数据
					var updataQuery = "update base_role set numbering=?, name=?, roleType=?,remarks=?, modifyDate=?  where id=?";
					connection.query(updataQuery,[role.numbering,role.name,role.roleType,role.remarks,myDate.toLocaleString(),role.id], function (err, resultsCount) {
						if (err) {
							throw err
						} else {
							res.end(returnResult.SUCCESSDATA(resultsCount));
						}
					});
				}
			}
		});
		}
	
	
	})
	
	// 保存dictionary信息(新增/修改)
	router.post('/saveDictionary', function (req, res) {

		if (req.body.dictionary == '' || req.body.dictionary == null || req.body.dictionary == undefined) {
			res.end(returnResult.ERRORMSG( '请传入参数id'));
			return;
		}
		var myDate = new Date();
		var dictionary=req.body.dictionary; 
		if(dictionary.id == undefined||dictionary.id == '' || dictionary.id == null){
			var insertQuery = "INSERT INTO base_dictionary ( numbering, name ,type ,dictionaryKey ,dictionaryValue , createDate ) values (?,?,?,?,?,?)";
			// 保存
			connection.query(insertQuery,[dictionary.numbering, dictionary.name, dictionary.type, dictionary.dictionaryKey, dictionary.dictionaryValue, myDate.toLocaleString()],function(err, rows) {
				if (err) {
					throw err
				} else {
					res.end(returnResult.SUCCESSDATA(rows));
				}
			});
		}else{
				// 判断id是否存在数据
		connection.query("SELECT * FROM base_dictionary where id='"+dictionary.id+"'",function(err, rows) {
			if (err) {
				throw err
			} else {
				if(rows!==null||rows!== undefined||rows!== ''){
					//修改数据
					var updataQuery = "update base_dictionary set numbering=?, name=?, type=?,dictionaryKey=?,dictionaryValue=?, modifyDate=?  where id=?";
					connection.query(updataQuery,[dictionary.numbering,dictionary.name,dictionary.type,dictionary.dictionaryKey,dictionary.dictionaryValue,myDate.toLocaleString(),dictionary.id], function (err, resultsCount) {
						if (err) {
							throw err
						} else {
							res.end(returnResult.SUCCESSDATA(resultsCount));
						}
					});
				}
			}
		});
		}
	
	
	})
	// 保存Module信息(新增/修改)
	router.post('/saveModule', function (req, res) {

		if (req.body.module == '' || req.body.module == null || req.body.module == undefined) {
			res.end(returnResult.ERRORMSG( '请传入参数id'));
			return;
		}
		var myDate = new Date();
		var module=req.body.module; 
		if(module.id == undefined||module.id == '' || module.id == null){
			var insertQuery = "INSERT INTO base_module ( numbering, name ,accessPermission ,moduleLinkAaddress ,description , pName, pId, createDate ) values (?,?,?,?,?,?,?,?)";
			// 保存
			connection.query(insertQuery,[module.numbering, module.name, module.accessPermission, module.moduleLinkAaddress, module.description, module.pName,module.pId, myDate.toLocaleString()],function(err, rows) {
				if (err) {
					throw err
				} else {
					res.end(returnResult.SUCCESSDATA(rows));
				}
			});
		}else{
				// 判断id是否存在数据
		connection.query("SELECT * FROM base_module where id='"+module.id+"'",function(err, rows) {
			if (err) {
				throw err
			} else {
				if(rows!==null||rows!== undefined||rows!== ''){
					//修改数据
					var updataQuery = "update base_module set numbering=?, name=?,  accessPermission=?, moduleLinkAaddress=?,description=?,pName=?, pId=?, modifyDate=?  where id=?";
					connection.query(updataQuery,[module.numbering, module.name, module.accessPermission, module.moduleLinkAaddress, module.description, module.pName,module.pId,myDate.toLocaleString(),module.id], function (err, resultsCount) {
						if (err) {
							throw err
						} else {
							res.end(returnResult.SUCCESSDATA(resultsCount));
						}
					});
				}
			}
		});
		}
	
	
	})
// 保存Module信息(新增/修改)
router.post('/saveAuthorization', function (req, res) {

	if (req.body.authorization == '' || req.body.authorization == null || req.body.authorization == undefined) {
		res.end(returnResult.ERRORMSG( '请传入参数id'));
		return;
	}
	var myDate = new Date();
	var authorization=req.body.authorization; 
	if(authorization.id == undefined||authorization.id == '' || authorization.id == null){
		var insertQuery = "INSERT INTO base_authorization ( moduleName, accessPermission ,authorization ,createDate ) values (?,?,?,?)";
		// 保存
		connection.query(insertQuery,[authorization.moduleName, authorization.accessPermission, authorization.authorization, myDate.toLocaleString()],function(err, rows) {
			if (err) {
				throw err
			} else {
				res.end(returnResult.SUCCESSDATA(rows));
			}
		});
	}else{
			// 判断id是否存在数据
	connection.query("SELECT * FROM base_authorization where id='"+authorization.id+"'",function(err, rows) {
		if (err) {
			throw err
		} else {
			if(rows!==null||rows!== undefined||rows!== ''){
				//修改数据
				var updataQuery = "update base_authorization set moduleName=?, accessPermission=?,  authorization=?, modifyDate=?  where id=?";
				connection.query(updataQuery,[authorization.moduleName, authorization.accessPermission, authorization.authorization, myDate.toLocaleString(),authorization.id], function (err, resultsCount) {
					if (err) {
						throw err
					} else {
						res.end(returnResult.SUCCESSDATA(resultsCount));
					}
				});
			}
		}
	});
	}


})
module.exports = router;
