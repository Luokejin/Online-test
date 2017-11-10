var ModelUser = require('../model/user');


module.exports.result = {
	get: function (req, res, next){
		ModelUser.findOne({"_id":req.session.user._id},function(err,result){
			console.log(result.course);
			var cName = new Array(); 
			var cResult = new Array();
			for(var i = 0 ; i < result.course.length; i++){
				cName[i] = result.course[i].name;
				cResult[i] = result.course[i].result;
			}
			console.log(cName);
			
			res.render('result', { 
				title: '课程成绩' ,
				course: cName,
				result:cResult
			});
		});
	}
}