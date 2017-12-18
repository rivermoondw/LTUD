var home = require('../app/controllers/admin/HomeController.js');
var category = require('../app/controllers/admin/c_category.js');
var article = require('../app/controllers/admin/c_article');
var role = require('../app/controllers/admin/c_role');
var page = require('../app/controllers/frontend/c_page.js');
var myFunction = require('../lib/my-function.js');
var path = require('path');

module.exports = function(app, passport) {
	app.get('/admin/category/add', myFunction.isLoggedIn, myFunction.checkPermission, category.add);
	app.post('/admin/category/add', myFunction.isLoggedIn, category.postAdd);
	app.get('/admin/category/list', myFunction.isLoggedIn, myFunction.checkPermission, category.list);
	app.get('/admin/category/edit/:id?', myFunction.isLoggedIn, myFunction.checkPermission, category.edit);
	app.post('/admin/category/edit/:id?', myFunction.isLoggedIn, category.postEdit);
	app.post('/admin/category/del/:id?', myFunction.isLoggedIn, category.del);
	app.get('/admin/article/add', myFunction.isLoggedIn, article.add);
	app.post('/admin/article/add', myFunction.isLoggedIn, article.postAdd);
	app.get('/admin/article/list', myFunction.isLoggedIn, article.list);
	app.get('/admin/article/edit/:id?', myFunction.isLoggedIn, article.edit);
	app.post('/admin/article/edit/:id?', myFunction.isLoggedIn, article.postEdit);
	app.post('/admin/article/del/:id?', myFunction.isLoggedIn, article.del);
	app.get('/admin/role/add', myFunction.isLoggedIn, role.add);
	app.post('/admin/role/add', myFunction.isLoggedIn, role.postAdd);
	app.get('/admin/role/list', myFunction.isLoggedIn, role.list);
	app.get('/admin/role/edit/:id?', myFunction.isLoggedIn, role.edit);
	app.post('/admin/role/edit/:id?', myFunction.isLoggedIn, role.postEdit);
	app.post('/admin/role/del/:id?', myFunction.isLoggedIn, role.del);
	app.get('/', myFunction.getMenu, myFunction.getNewestNews, page.home);
	app.get('/:slug', page.listNews);

	app.get('/admin/login', myFunction.checkLogin, function(req, res){
		res.render('./admin/login.ejs', {message: req.flash('loginMessage')});
	});
	app.post('/admin/login', passport.authenticate('local-login', {
		successRedirect: '/admin/role/add',
		failureRedirect: '/admin/login',
		failureFlash: true
	}),
	function(req, res){
		if (req.body.remember){
			req.session.cookie.maxAge = 1000*60*3;
		}
		else {
			req.session.cookie.expires = false;
		}
	});
	app.get('/upload', function(req, res){
		res.render('./upload.ejs');
	});
	app.post('/upload', function(req, res){
		if (!req.files) {
			return res.status(400).send('No files were uploaded.');
		}
		var sampleFile = req.files.sampleFile;
		var fileName = 'file.jpg';
		var directory = 'E:\\LTUD\\Server\\tintuc\\public\\upload' ;
		var saveFile = path.format({dir:directory, base:fileName});
		sampleFile.mv(saveFile, function(err){
			if (err) return res.status(500).send(err);
			res.send('File uploaded!');
		});
	});
}
