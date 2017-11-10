var ModelUser = require('../model/user');
var ModelCourse = require('../model/course');
var async = require("async");

// ModelCourse.create({
// 	coursename:"高数课",
// 	// student:"59ed72074c52e4c000574cff"
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
// ModelUser.create({
// 	username: "kkk", //昵称
// 	name:"lala",
// 	password:"123",
// 	// course:{
// 	// 	courseID:"59ecab604ea02bc40be66d94",
// 	// 	name:"计算机",
// 	// 	result:0
// 	// }
// });

module.exports.course = {
	get: function (req, res, next){
		ModelCourse.find({},function(err,result){
			console.log(result);
			res.render('select', { 
				title: '选课' ,
				course: result
			});
		})
	},
	post: function (req, res, next){
		var postData = {
			course: req.body.course,
			user:req.session.user
		};
		console.log(postData.course);

		var resJson = {
			status: false,
			msg: ''
		};
		
		//async瀑布流waterfall
		async.waterfall([
			function(callback){
				ModelUser.findOne({"_id":postData.user._id}, function (err, student){
					if(err){
						callback(1,err);
					}
					else{
						// if(student.course.length == null){
						// 	console.log("没有添加课程");
						// }
						console.log(student);
						var select = false;//判断值（学生是否添加课程）
							for(var i = 0; i < student.course.length; i++ ){
								if(student.course[i].courseID == postData.course){
									select = true;
								}
							}
							if(select == true){
								callback(1,"学生已添加课程");
							}else{
								callback(null,select);
							}
							
					}
					
				});
			},//异步一
				function(none,callback){
					ModelCourse.findOne({"_id":postData.course}, function (err, course){
						if(err){
							callback(1,err);
						}
						else{
							var select = false;//判断值（课程是否添加学生）
							for(var i = 0; i < course.student.length; i++ ){
								if(course.student[i] == postData.user._id){
									var select = true;
									// callback(1,select);
								}
							}
							if(select == true){
								callback(1,"课程已添加学生");
							}else{
								callback(null,course._id,course.coursename);
							}
						}
					});						
				},//异步二
				function(courseID,courseName,callback){
					//添加数据
					console.log(courseID);
					ModelUser.findOne({"_id":postData.user._id}, function (err, student){
						var course = {	//课程
							_id:courseID,
							name:courseName,
							result:0
						}
						student.course.push(course);
						student.save(function(err){
							if(err){
								callback(1,"添加出错");
							}else{
								callback(null,student._id);
							}
						});
					});
				},
				function(student,callback){
					//添加数据
					ModelCourse.findOne({"_id":postData.course}, function (err, course){
						course.student.push(student);
						course.save(function(err){
							if(err){
								callback(1,"添加出错");
							}else{
								callback(null,"添加成功");
							}
						});
					});
				},		
			],
			function(err,result){
				resJson.msg = result;
				resJson.status = true;
				res.send(resJson);
			});
			
		
		//res.send(postData);
	}
};

