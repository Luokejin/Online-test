var ModelTeacher = require('../model/teacher');
var ModelCourse = require('../model/course');
var ModelUser = require('../model/user');
var async = require('async');

module.exports.result = {
	get: function (req, res, next){
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
		// 			console.log(cID);
		// 			callback(null,cID);
		// 	},
		// 		function(data,callback){
		// 			var courseID = new Array();
		// 			for(var i = 0; i < data.length ;i++){
		// 				ModelCourse.find({"_id":data[i]},function(err,course){
		// 					for(var j = 0 ; j < course.student.length; j++){
		// 						courseID[j] = course.student[j];
		// 					}
		// 				});
		// 			}
		// 			console.log(courseID);
		// 			callback(null,courseID);
					
		// 		},
		// 		function(student,callback){
		// 			var coursename = new Array();
		// 			var courseresult = new Array();
		// 			for(var i = 0; i < student.length ; i++){
		// 				ModelUser.find({"_id":student[i]},function(err,student){
		// 					for(var j = 0 ; j < student.course.length; j++){
		// 						coursename = course[j].name;
		// 						courseresult = course[j].result;
		// 					}
		// 				});
		// 			}
		// 			var resRender = {
		// 				name:coursename,
		// 				result:courseresult
		// 			}
		// 			console.log(resRender);
		// 			callback(null,resRender);
		// 		}
		// 	],
		// 		function(err,allresult)	{

		// 			res.render('allResult', { 
		// 				title: '成绩状况' ,
		// 				name: allresult.name,
		// 				result:allresult.result
		// 			});

		// 		}};

	}
}