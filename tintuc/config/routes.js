var home = require('../app/controllers/admin/HomeController.js');
var category = require('../app/controllers/admin/c_category.js');
var article = require('../app/controllers/admin/c_article');
var role = require('../app/controllers/admin/c_role');
var user = require('../app/controllers/admin/c_user');
var page = require('../app/controllers/frontend/c_page.js');
var myFunction = require('../lib/my-function.js');
var path = require('path');
var multer = require('multer');

var storageUser = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload/user')
  },
  filename: function (req, file, cb) {
		let fileName = myFunction.slug(req.user[0].name.toLowerCase()) + '-' + Date.now() + path.extname(file.originalname);
    cb(null, fileName)
  }
})
var uploadUser = multer({ storage: storageUser })
var storageArticle = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/upload/article')
  },
  filename: function(req, file, cb){
    let fileName = myFunction.slug(req.body.title) + '-' + Date.now() + path.extname(file.originalname);
    cb(null, fileName)
  }
})
var uploadArticle = multer({ storage: storageArticle })

module.exports = function(app, passport) {
	app.get('/admin/category/add', myFunction.isLoggedIn, myFunction.checkPermission, category.add);
	app.post('/admin/category/add', myFunction.isLoggedIn, myFunction.checkPermission, category.postAdd);
	app.get('/admin/category/list', myFunction.isLoggedIn, myFunction.checkPermission, category.list);
	app.get('/admin/category/edit/:id?', myFunction.isLoggedIn, myFunction.checkPermission, category.edit);
	app.post('/admin/category/edit/:id?', myFunction.isLoggedIn, myFunction.checkPermission, category.postEdit);
	app.post('/admin/category/del/:id?', myFunction.isLoggedIn, category.del);
	app.get('/admin/article/add', myFunction.isLoggedIn, myFunction.checkPermission, article.add);
	app.post('/admin/article/add', myFunction.isLoggedIn, myFunction.checkPermission, uploadArticle.single('article-img'), article.postAdd);
	app.get('/admin/article/list', myFunction.isLoggedIn, myFunction.checkPermission, article.list);
	app.get('/admin/article/edit/:id?', myFunction.isLoggedIn, myFunction.checkPermission, article.edit);
	app.post('/admin/article/edit/:id?', myFunction.isLoggedIn, myFunction.checkPermission, article.postEdit);
	app.post('/admin/article/del/:id?', myFunction.isLoggedIn, article.del);
	app.get('/admin/role/add', myFunction.isLoggedIn, myFunction.checkPermission, role.add);
	app.post('/admin/role/add', myFunction.isLoggedIn, myFunction.checkPermission, role.postAdd);
	app.get('/admin/role/list', myFunction.isLoggedIn, myFunction.checkPermission, role.list);
	app.get('/admin/role/edit/:id?', myFunction.isLoggedIn, myFunction.checkPermission, role.edit);
	app.post('/admin/role/edit/:id?', myFunction.isLoggedIn, myFunction.checkPermission, role.postEdit);
	app.post('/admin/role/del/:id?', myFunction.isLoggedIn, role.del);
	app.get('/admin/user/add', myFunction.isLoggedIn, myFunction.checkPermission, user.add);
	app.post('/admin/user/add', myFunction.isLoggedIn, myFunction.checkPermission, uploadUser.single('avatar'), user.postAdd);
	app.get('/admin/user/list', myFunction.isLoggedIn, myFunction.checkPermission, user.list);
	app.get('/admin/user/edit/:id?', myFunction.isLoggedIn, myFunction.checkPermission, user.edit);
	app.post('/admin/user/edit/:id?', myFunction.isLoggedIn, myFunction.checkPermission, user.postEdit);
	app.post('/admin/user/del/:id?', myFunction.isLoggedIn, user.del);

	app.get('/admin/login', myFunction.checkLogin, function(req, res){
		res.render('./admin/login.ejs', {message: req.flash('loginMessage')});
	});
	app.post('/admin/login', passport.authenticate('local-login', {
		successRedirect: '/admin/user/list',
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
  app.get('/admin/logout', function(req, res){
    req.logout();
    res.redirect('/admin/login');
  });
  app.get('/', myFunction.getMenu, myFunction.getNewestNews, myFunction.getHotNews, page.home);
	app.get('/:cat', myFunction.checkCat, myFunction.getMenu, myFunction.getHotNews, page.listNews);
  app.get('/:cat/:article', myFunction.checkContent, myFunction.getMenu, myFunction.getHotNews, page.contentNews)
}
