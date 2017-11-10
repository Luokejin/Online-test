var ModelUser = require('../model/user');
var ModelCourse = require('../model/course');
var ModelQuestion = require('../model/question');
var async = require("async");

// ModelCourse.create({
// 	coursename:"美术课"
// });

// ModelUser.create({
// 	username: "kkk", //昵称
// 	name:"lala",
// 	password:"123",
// 	course:{
// 		courseID:"59edb39947bc83bc3a2d0875",
// 		name:"计算机",
// 		result:0
// 	}
// });
// ModelQuestion.create({
// 	subject:"1+2",
// 	option:["1","2","3","4"],
// 	answer:"2",
// 	mark:5,
// 	course:{
// 		_id:"59ef67068f16e4341224e9ce"
// 	}
// });

module.exports.showCourse = {
	get: function (req, res, next){
		ModelUser.findOne({"_id":req.session.user._id},function(err,result){
			console.log(result.course);
			res.render('showCourse', { 
				title: '选择课程' ,
				course: result.course
			});
		});
	},
	post: function(req,res,next){
		console.log(req.body.course);
		var resJson = {
			status: false,
			msg: '选择课程成功',
			course:req.body.course
		};
		res.send(resJson);
	}
	// post: function (req, res, next){
	// 	var postData = {
	// 		course: req.body.course,
	// 		user:req.session.user
	// 	};




	// 	var resJson = {
	// 		status: false,
	// 		msg: ''
	// 	};


	// }
	// 	console.log(postData.course);

};


module.exports.test = {
	get: function (req, res, next){
		var getData = {
			_id: req.param('_id') 
		};
		console.log(getData._id)
		ModelQuestion.find({"course": getData._id} ,function(err,result){	//10.28 0:26 发送的无法显示
			console.log(result);
			if(result.length == 0){
				res.render('noquestion',{
					title:'考试'
				});
			}else{
				res.render('question', { 
					title: '考试',
					question:result,
					count:0
				});	
			}
			
		});
	},
	post: function(req,res,next){
		var getData = {
			_id: req.param('_id') 
		};
		var postData = {
			question:req.body.question,
			answer:req.body.answer,
			count:parseInt(req.body.count)-1,		//因为是获取到文本的，会比真正赋值的多1
			mark:parseInt(req.body.mark)
		};
		console.log(postData);
		async.waterfall([
			function(callback){
				ModelQuestion.findOne({"_id":postData.question},function(err,question){
					console.log(question);
					if(question.answer == postData.answer){
						callback(null,postData.mark);	//正确，传分值
					}else{
						callback(null,0);	//错误，传零分
					}
				});
			},
				function(mark,callback){
					console.log(mark);
					ModelUser.findOne({"_id":req.session.user._id},function(err,result){
						console.log(result.course);
						for(var i = 0 ; i < result.course.length; i++){
							if(result.course[i]._id == getData._id){	//找到该课程
								result.course[i].result = result.course[i].result + mark;	//在该课程改变分数
								result.save(function(err){
									if(err){
										var resJson = {
											status:true,
											msg:"出错了"
										}
										console.log(2);
										callback(1,resJson);
									}else{
										console.log(1);
										callback(null,true);
									}
								});//保存分数
							}
						}//for循环
					});
				},
					function(none,callback){
						ModelQuestion.find({"course":getData._id},function(err,question){
							if(err) {
								var resJson = {
									status:true,
									msg:"出错了"
								}
								callback(1,resJson);
							}
							else{
								var resJson = {
									question:question,
									count:postData.count + 1
								};
								callback(null,resJson);
							}
						});
					}

			],
		function(err,result){
			res.send(result);
		});
	}

}

		
	// 	//async瀑布流waterfall
	// 	async.waterfall([
	// 		function(callback){
	// 			ModelUser.findOne({"_id":postData.user._id}, function (err, student){
	// 				if(err){
	// 					callback(1,err);
	// 				}
	// 				else{
	// 					// if(student.course.length == null){
	// 					// 	console.log("没有添加课程");
	// 					// }
	// 					console.log(student);
	// 					var select = false;//判断值（学生是否添加课程）
	// 						for(var i = 0; i < student.course.length; i++ ){
	// 							if(student.course[i].courseID == postData.course){
	// 								select = true;
	// 							}
	// 						}
	// 						if(select == true){
	// 							callback(1,"学生已添加课程");
	// 						}else{
	// 							callback(null,select);
	// 						}
							
	// 				}
					
	// 			});
	// 		},//异步一
	// 			function(none,callback){
	// 				ModelCourse.findOne({"_id":postData.course}, function (err, course){
	// 					if(err){
	// 						callback(1,err);
	// 					}
	// 					else{
	// 						var select = false;//判断值（课程是否添加学生）
	// 						for(var i = 0; i < course.student.length; i++ ){
	// 							if(course.student[i] == postData.user._id){
	// 								var select = true;
	// 								// callback(1,select);
	// 							}
	// 						}
	// 						if(select == true){
	// 							callback(1,"课程已添加学生");
	// 						}else{
	// 							callback(null,course._id,course.coursename);
	// 						}
	// 					}
	// 				});						
	// 			},//异步二
	// 			function(courseID,courseName,callback){
	// 				//添加数据
	// 				console.log(courseName);
	// 				ModelUser.findOne({"_id":postData.user._id}, function (err, student){
	// 					var course = {	//课程
	// 						course:courseID,
	// 						name:courseName,
	// 						result:0
	// 					}
	// 					student.course.push(course);
	// 					student.save(function(err){
	// 						if(err){
	// 							callback(1,"添加出错");
	// 						}else{
	// 							callback(null,student._id);
	// 						}
	// 					});
	// 				});
	// 			},
	// 			function(student,callback){
	// 				//添加数据
	// 				ModelCourse.findOne({"_id":postData.course}, function (err, course){
	// 					course.student.push(student);
	// 					course.save(function(err){
	// 						if(err){
	// 							callback(1,"添加出错");
	// 						}else{
	// 							callback(null,"添加成功");
	// 						}
	// 					});
	// 				});
	// 			},		
	// 		],
	// 		function(err,result){
	// 			resJson.msg = result;
	// 			resJson.status = true;
	// 			res.send(resJson);
	// 		});
			
		
		//res.send(postData);
	// }


