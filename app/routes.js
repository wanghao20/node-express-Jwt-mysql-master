// 基本信息路由控制
var baseRoutes  = require('./routeList/baseRoutes/baseRoutes');
var loginRoutes  = require('./routeList/login/loginRoutes');
// 返回类型
var returnResult= require('./utils/returnResult');
//用来创建和确认用户信息摘要
var jwt = require('jsonwebtoken');
// app/routes.js
module.exports = function(app) {

	// 处理基本管理模块
	app.use('/base',isLoggedIn,baseRoutes);
	// 处理系统模块
	app.use('/sys',loginRoutes);

};

// 路由中间件
function isLoggedIn(req, res, next) {
	
	//检查post的信息或者url查询参数或者头信息
	var token = req.headers['authentication'];
	// 解析 token
	if (token) {
	 // 确认token
	  jwt.verify(token, 'secret', function(err, decoded) {
		if (err) {
		  return res.end(returnResult.ERRORMSG('token信息错误'));;
		} else {
		  // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
		  // req.api_user = decoded;
		  // console.dir(req.api_user);
		  next();
		}
	  });
	} else {
	// 如果没有token，则返回错误
	// 验证错误
	res.end(returnResult.ERRORMSG('请登录'));;
	}


}



