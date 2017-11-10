var ModelTeacher = require('../model/teacher');
var ModelUser = require('../model/user');

module.exports.index = {
	get:function(req,res,next){
		ModelUser.findOne({"_id":req.session.user},function(err,user){
			if(user){
				res.render('index',{ 
					title: '首页',
					name:user.name 
				});
			}else{
				ModelTeacher.findOne({"_id":req.session.user},function(err,teacher){
					if(teacher == null){
						res.render('login',{ 
							title: '登录' 
						});
					}else{
						res.render('teacherIndex',{ 
							title: '首页' ,
							name:teacher.name
						});
					}
					
				})
			}
		});
	}
}