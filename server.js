// server.js

// 得到需要的所有工具
var express  = require('express');
var bodyParser = require('body-parser');
var app      = express();
var port     = process.env.PORT || 8080;

//跨域

	app.use(function(req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", '*');
		res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept,Authentication');
		res.setHeader("Content-Type", "application/json; charset=utf-8")
		if (req.method == 'OPTIONS') {
			res.send(200); //让options请求快速返回
		}
		else {
			next();
		}
	});
  // 解析json数据
app.use(bodyParser.urlencoded({
extended: true
}));
app.use(bodyParser.json());
// 路由 
require('./app/routes.js')(app); 

// 发起 
app.listen(port);
console.log('端口为： ' + port);
