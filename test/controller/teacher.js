var ModelTeacher = require('../model/teacher');
var ModelCourse = require('../model/course');
var ModelUser = require('../model/user');
var async = require('async');
//登录
module.exports.login = {
	get: function (req, res, next){
	
		res.render('teacher', { title: '登录' });
	},
	post: function (req, res, next){
		var postData = {
			username: req.body.username
		};
		
		var resJson = {
			status: false,
			msg: ''
		};
		
		ModelTeacher.findOne(postData, function (err, data){
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
		res.render('teacherReg', { title: '注册' });
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
		

		ModelTeacher.findOne({
			username: req.body.username
		}, function (err, data){
			
			if(err) console.log(err);
			
			if(data){
				resJson.msg = '此用户已经被注册';
				res.send(resJson);
			}else{
				ModelTeacher.create(postData, function (err, data){
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

	}
};

//成绩状况
module.exports.result = {
	get: function (req, res, next){
		ModelCourse.find({},function(err,course){
			res.render('selectResult',{
				title:'选择查看科目',
				course:course
			})
		})
	},
	post: function (req, res, next){
		var postData = {
			course:req.body.course
		};
		console.log(postData);
		var studentID = new Array();
		var studentName = new Array();
		var coursename = new Array();
		var courseresult = new Array();
		var coursestudent = new Array();

		// ModelCourse.findOne({"_id":postData.course},function(err,course){
		// 	console.log(course);
		// 	for(var i = 0 ; i < course.student.length; i++){
		// 		console.log(course.student[i]);
		// 		ModelUser.findOne({"_id":course.student[i]},function(err,student){
		// 			console.log(1);
		// 			coursestudent[i] = student.name;
		// 			for(var j = 0 ; j < student.course.length; j++){
		// 				if(student.course._id == postData.course){
		// 					coursename[i] = course[j].name;
		// 					courseresult[i] = course[j].result;
		// 				}
		// 			}
		// 		});
		// 	}
		// 	console.log(coursename);
		// });



		async.waterfall([
      		function(callback){
				ModelCourse.findOne({"_id":postData.course},function(err,course){	//在课程里找到学生 _id
					console.log(course);
					for(var i = 0 ; i < course.student.length; i++){
						studentID[i] = course.student[i];
					}
					callback(null,studentID);
				});
				
			},
				function(student,callback){
					var test = new Array();
						ModelUser.find({},function(err,user){
							console.log(user);
							for(var i = 0; i < student.length ; i++ ){	//列出学生
								for(var j = 0 ; j < user.length; j++){	// 匹配学生
									// console.log(user[j]._id	);
									// console.log(student[i]);
									if(user[j]._id.toString() == student[i].toString()) {
										// console.log(1);
										studentName.push(user[j].name);
										for(var k = 0 ; k < user[j].course.length; k++){	//找到学生并找到其课程
											if(user[j].course[k]._id == postData.course){
												// console.log(user[j].course[k]);
												coursename.push(user[j].course[k].name);
												courseresult.push(user[j].course[k].result);
											}

										}
									}
								}
		
							}
							console.log(studentName);
							console.log(courseresult);
							var resJson = {
								course:coursename,
								name:studentName,
								result:courseresult
							}
							callback(null,resJson);
							
						});
				}
				// function(student,callback){
				// 	var coursename = new Array();
				// 	var courseresult = new Array();
				// 	var coursestudent = new Array();
				// 	for(var i = 0; i < student.length ; i++){
				// 		ModelUser.find({"_id":student[i]},function(err,student){
				// 			coursestudent = student[i].name;
				// 			for(var j = 0 ; j < student.course.length; j++){
				// 				if()
				// 				coursename = course[j].name;
				// 				courseresult = course[j].result;
				// 			}
				// 		});
				// 	}
				// 	var resRender = {
				// 		name:coursename,
				// 		result:courseresult
				// 	};
				// 	callback(null,resRender);
				// }
			],
				function(err,allresult){

					res.send(allresult);

				});

	}

	// course:allresult.course,
	// 					name: allresult.name,
	// 					result:allresult.result
		// ModelTeacher.findOne({"_id":req.session.user._id},function(err,result){
		// 	console.log(result.course);
		// 	for(var i = 0 ; i < result.course.length; i++){
		// 		ModelCourse.findOne({"_id":result.course[i]._id},function(err,course){	//找到课程
		// 			for(var j = 0 ; j < course.student.length; j++){
		// 					ModelUser.findOne("_id":course.student[j],function(err,studnet){
		// 						for(var k = 0 ; k < student.course.length;k++){

		// 						}
		// 					})
		// 			}
		// 		});
		// 	}
		// }	
		// async.waterfall([
  //     		function(callback){
		// 		ModelTeacher.findOne({"_id":req.session.user._id},function(err,result){
		// 			console.log(result.course);
		// 			var cID = new Array();
		// 			for(var i = 0 ; i < result.course.length; i++){
		// 				cID[i] = result.course[i]._id;
		// 			}
		// 			callback(null,cID);
		// 		});
				
		// 	},
		// 		function(courseID,callback){
		// 			var student = new Array();
		// 			for(var i = 0; i < courseID.length ;i++){
		// 				ModelCourse.findOne({"_id":courseID[i]},function(err,student){
		// 					for(var j = 0 ; j < course.student.length; j++){
		// 						student[i] = course.student[j];
		// 					}
		// 				});
		// 			}
		// 			callback(null,courseID);
					
		// 		},
		// 		function(student,callback){
		// 			var coursename = new Array();
		// 			var courseresult = new Array();
		// 			var coursestudent = new Array();
		// 			for(var i = 0; i < student.length ; i++){
		// 				ModelUser.find({"_id":student[i]},function(err,student){
		// 					coursestudent = student[i].name;
		// 					for(var j = 0 ; j < student.course.length; j++){
		// 						if()
		// 						coursename = course[j].name;
		// 						courseresult = course[j].result;
		// 					}
		// 				});
		// 			}
		// 			var resRender = {
		// 				name:coursename,
		// 				result:courseresult
		// 			};
		// 			callback(null,resRender);
		// 		}
		// 	],
		// 		function(err,allresult){

		// 			res.render('allResult', { 
		// 				title: '成绩状况' ,
		// 				name: allresult.name,
		// 				result:allresult.result
		// 			});

		// 		});

	
};