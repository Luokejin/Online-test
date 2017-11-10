var ModelUser = require('../model/user');
var async = require("async");


//登录
module.exports.login = {
	get: function (req, res, next){
	
		res.render('login', { title: '登录' });
	},
	post: function (req, res, next){
		var postData = {
			username: req.body.username
		};
		
		var resJson = {
			status: false,
			msg: ''
		};
		
		ModelUser.findOne(postData, function (err, data){
			if(err){
				console.log(err);
			}
			if(data){
				
				if(data.password == req.body.password){
					req.session.user = data;
					resJson.msg = '登录成功';
					resJson.status = true;
					res.send(resJson);
					//res.redirect('/user/' + data._id);
					
				}else{
					resJson.msg = '密码错误';
					res.send(resJson);
					
				}
				
			}else{
				resJson.msg = '没有此用户';
				res.send(resJson);
			}
			
			
		});
		
		//res.send(postData);
	}
};

//注册
module.exports.reg = {
	get: function (req, res, next){
		res.render('reg', { title: '注册' });
	},
	post: function (req, res, next){
		
		var postData = {
			username: req.body.username,
			password: req.body.password,
			name:req.body.name
		};
		
		var resJson = {
			status: false,
			msg: ''
		};
		

		ModelUser.findOne({
			username: req.body.username
		}, function (err, data){
			
			if(err) console.log(err);
			
			if(data){
				resJson.msg = '此用户已经被注册';
				res.send(resJson);
			}else{
				ModelUser.create(postData, function (err, data){
					if(err){
						resJson.msg = '注册异常';
						res.send(resJson);
					}
					
					resJson.msg = '注册成功';
					resJson.status = true;
					req.session.user = data;
					res.send(resJson);
					
				});
				
			}
			
		});
		// async.waterfall([
		// 	function(callback){
		// 		ModelUser.findOne({
		// 				username: req.body.username
		// 			}, function (err, data){
						
		// 				if(err) console.log(err);
						
		// 				if(data){
		// 					resJson.msg = '此用户已经被注册';
		// 					callback(1,resJson);
		// 				}else{
		// 					callback(null,false);
		// 				}
		// 		});
		// 		},
		// 			function(ok,callback){
		// 				ModelUser.create(postData, function (err, data){
		// 					if(err){
		// 						resJson.msg = '注册异常';
		// 						callback(1,resJson);
		// 					}
							
		// 					resJson.msg = '注册成功';
		// 					resJson.status = true;
		// 					req.session.user = data;
		// 					callback(null,resJson);
							
		// 				});
		// 			}
		// 	],
		// function(err,result){
		// 	res.send(result);
		// });

	}
};

//退出登录
module.exports.logout = {
	get: function (req, res, next){
		delete req.session.user;
		res.redirect('/');
	}
};

//个人资料
module.exports.user = {
	get: function (req, res, next){
		
		var getData = {
			_id: req.param('_id')
		};
	
		ModelUser.findById(getData , function (err, data){
			if(err) console.log(err);
			
			if(data){
				res.render('user', {
					title: data.name + '的个人资料',
					view: data
				});
			}else{
				res.send('查询不到此用户');
			}
			
		});
		
		//res.send('嘿，用户中心，我们下节课再说啦');
	}
};

//登录后才能访问的页面
module.exports.loginYes = function (req, res, next){
	var user = req.session.user;
	
	if(!user){
		res.redirect('/login');
	}else{
		next();
		console.log('哈哈');
	}
}

//登录后不能访问的页面
module.exports.loginNo = function (req, res, next){
	
	var user = req.session.user;
	
	if(user){
		res.redirect('/user/' + user._id);
	}else{
		next();
	}
	
};