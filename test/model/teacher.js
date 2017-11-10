var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var teacherSchema = new mongoose.Schema({
  username: String,
  name:String,
  password: String,
  course:[{
    _id:{
      type: ObjectId,
      ref: 'course'
    }
  }]
});

module.exports = mongoose.model('teacher', teacherSchema);