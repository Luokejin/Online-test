var formidable = require('formidable'); 
var path = require('path');
var fs = require('fs');
var async = require('async');
var xlsx = require('node-xlsx');

var Course = require('../model/course')
var Question = require('../model/question');

 module.exports.upload = {
  get: function (req, res, next){
      Course.find({},function(err,result){
         console.log(result);
        res.render('upload',{
          "title":"上传试题",
          "courses":result,
          "status":false
        });
      });
  },
  post: function(req,res,next){ 
     async.waterfall([
      function(callback){
        var form = new formidable.IncomingForm();  
            // 解析一个文件上传
            var form = new formidable.IncomingForm();
            //设置编辑
            form.encoding = 'utf-8';
            //设置文件存储路径
            form.uploadDir = "./upload";
            // form.encoding = 'utf-8';  
            
            // var apath = path.join(__dirname,'/upload');
            // console.log(apath);

            // form.uploadDir = path.join(__dirname , '/upload'); 
            // form.keepExtensions = true;//保留后缀  
            // form.maxFieldsSize = 2*1024*1024;  
            form.parse(req,function(err,fields,files){  
            if(err){  
               var resJson = {
                msg :"上传成功 ",
                status: true
              };
              callback(1,resJson); 
            }  
            else{
              console.log("success");
              var filename = files.xlsx.name;// files + form中file的name +  name  =  文件名
              var filepath = files.xlsx.path;
              // var course = fields.course;
                      
                //旧的路径  
                var oldpath = path.resolve(__dirname,'..') + path.normalize("/") + filepath; //path.resolve(__dirname,'..')为当前目录的上级目录,以此类推
                // var oldpath = filepath;

                //新的路径
                var newpath = path.resolve(__dirname,'..') + path.normalize('/upload/'+ filename);//path.normalize()把反斜杠根据不同系统规则改变

              console.log(oldpath);
              console.log(newpath);
              // console.log()
              
                 fs.rename(oldpath,newpath,function (err) {
                          if(err){
                              throw  err;
                          }else{
                            var files = {
                              path: newpath,
                              name: filename,
                              course:fields.course
                            }
                            callback(null,files)
                          }
                  });//fs改名结束
              }
        });//上传完毕

      },//异步一结束
        function(file,callback){
          var obj = xlsx.parse(file.path);
              var excel= obj[0].data;
              var excelList = [];

              for(var i = 1 ; i < excel.length ; i++){
                var excelRow = excel[i];
                console.log(excelRow);
                for(var j = 0; j < excelRow.length ; j++){
                  excelList[j] = excelRow[j];  
                  // console.log(excelList[j]);
                }
                  var subject = excelList[0];
                  var selection1 = excelList[1].toString();
                  var selection2 = excelList[2].toString();
                  var selection3 = excelList[3].toString();
                  var selection4 = excelList[4].toString();
                  var key = excelList[5].toString();
                  var mark = excelList[6];
                // console.log(excelList);
                Question.create({
                    "subject":excelList[0],
                    "option":[excelList[1],excelList[2],excelList[3],excelList[4]],
                    "answer":excelList[5],
                    "mark":excelList[6],
                    "course":file.course
                });
              }  
              var resJson = {
                msg :"上传成功 ",
                status: true
              }
              callback(null,resJson);

        },
      ],//async结束
        function(err,resJson){
          console.log(resJson);
              Course.find({},function(err,result){
                 console.log(result);
                res.render('upload',{
                  "title":"上传试题",
                  "courses":result,
                  "status":resJson.status,
                  "msg":resJson.msg
                });
              });
      });
  


  } 
} 