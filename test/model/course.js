var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var courseSchema = new mongoose.Schema({
    coursename:String,
	// student:[String]
	student:[
		{
			type: ObjectId,
			ref: 'user'
		}
	]
});

module.exports = mongoose.model('course', courseSchema);