var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var userSchema = new mongoose.Schema({
    username: String,
	name:String,
	password: String,
	course:[{
		// courseID:String,
		_id:{
			type: ObjectId,
			ref: 'course'
		},
		name:String,
		result:Number
	}]
});

module.exports = mongoose.model('user', userSchema);