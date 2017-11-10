var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var questionSchema = new mongoose.Schema({
    subject:String,
    option:[String],
    answer:String,
    mark:Number,
    course:String
	// course:{
	// 		type: ObjectId,
	// 		ref: 'course'
	// }
});

module.exports = mongoose.model('question', questionSchema);