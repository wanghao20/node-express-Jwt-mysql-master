
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
//用来创建和确认用户信息摘要
var jwt = require('jsonwebtoken');
	// 处理登录表单
	router.post('/login', function (req, res) {
		// if (req.body.id == '' || req.body.id == null || req.body.id == undefined) {
		// 	res.end(returnResult.ERRORMSG( '请传入参数id'));
		// 	return;
		// }
		console.log(req.body)
		connection.query("SELECT * FROM base_user WHERE username = ?",[req.body.username], function(err, rows){
			if (err){
				res.end(returnResult.ERRORMSG( '数据库错误!'));
				return;
			}
			if (!rows.length) {
				res.end(returnResult.ERRORMSG( '用户名错误!'));
				return;
			}
			console.log(rows[0])
			  // compareSync（用户输入，hash密码）
			if (!bcrypt.compareSync(req.body.password, rows[0].password)){
				res.end(returnResult.ERRORMSG( '密码错误!'));
				return;
			}
			// 创建token, exp: 设置过期时间
			var token = jwt.sign({
				exp: Math.floor(Date.now() / 1000) + (60 * 60),
				data: JSON.stringify(rows[0])
			  }, 'secret',);
			// json格式返回token
			var data={
				user:rows[0],
				access_token: token
			};
			// 验证成功
			res.end(returnResult.SUCCESSDATA(data));
		});
	});

module.exports = router;
