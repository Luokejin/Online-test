// JavaScript Document
var controllerUser = require('../controller/user');
// var controllerBlog = require('../controller/blog');
var controllerCourse = require('../controller/course');
var controllerTest = require('../controller/test');
var controllerResult = require('../controller/result');
var controllerUpload = require('../controller/upload');
var controllerTeacher = require('../controller/teacher');
var controllerIndex = require('../controller/index');

module.exports = function (app){

	app.use(function (req, res, next){
		var user = req.session.user;
		if(user){
			app.locals.user = user;
		}else{
			app.locals.user = user;
		};
		
		next();
	});


	// app.get('/', function (req, res, next){
	// 	res.render('index', { title: '首页' });
	// });

	app.get('/',controllerIndex.index.get);
	
	//登录
	app.get('/login', controllerUser.loginNo, controllerUser.login.get);
	app.post('/login', controllerUser.login.post);
	
	//注册
	app.get('/reg', controllerUser.loginNo, controllerUser.reg.get);
	app.post('/reg', controllerUser.reg.post);
	
	//退出登录
	app.get('/logout', controllerUser.loginYes, controllerUser.logout.get);

	//选课
	app.get('/course', controllerCourse.course.get);
	app.post('/course', controllerCourse.course.post);
	
	//考试
	app.get('/test',controllerTest.showCourse.get);
	app.post('/test', controllerTest.showCourse.post);

	app.get('/test/:_id', controllerTest.test.get);
	app.post('/test/:_id', controllerTest.test.post);

	//考试成绩
	app.get('/result', controllerResult.result.get);


	//上传试题
	app.get('/upload', controllerUpload.upload.get);
	app.post('/upload', controllerUpload.upload.post);

	//教师登录
	app.get('/teacher', controllerUser.loginNo, controllerTeacher.login.get);
	app.post('/teacher', controllerTeacher.login.post);

	//教师注册
	app.get('/teacherReg', controllerUser.loginNo, controllerTeacher.reg.get);
	app.post('/teacherReg', controllerTeacher.reg.post);

	//成绩状况
	app.get('/tResult', controllerTeacher.result.get);
	app.post('/tResult',controllerTeacher.result.post)

	//个人资料
	app.get('/user/:_id', controllerUser.user.get);
	
	//发表微博
	// app.get('/add',controllerUser.loginYes, controllerBlog.add.get);
	// app.post('/add', controllerBlog.add.post);
	
	//微博列表
	// app.get('/list', controllerBlog.list.get);
	
	//微博内容
	// app.get('/view/:_id', controllerBlog.view.get);	
	
	//微博修改
	// app.get('/list/:_id/editor', controllerBlog.editor.get);	
	// app.post('/list/:_id/editor', controllerBlog.editor.post);	
}