var home = require('../app/controllers/admin/HomeController.js');
var category = require('../app/controllers/admin/c_category.js')

module.exports = function(app) {
	app.get('/', home.home);
	app.get('/home', home.home);
	app.get('/category/add', category.add);
	app.post('/category/add', category.postAdd);
	app.get('/category/list', category.list);
	app.get('/category/edit', category.edit);
}