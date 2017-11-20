var ejs = require('ejs');
var load_view = require('../../../lib/load-view.js');
exports.home = function(req, res) {
	var data = {};
	// ejs.renderFile('./app/views/admin/home_view.ejs',function(err, str){
	// 	if (err){
	// 		console.log(err);
	// 	}
	// 	else {
	// 		data.content = str;
	// 	}
	// });
	var view = 'home_view';
	var templates = 'admin';
	data.pageTitle = 'Trang chủ';
	data.headContent = 'Thêm danh mục';
	data.content = load_view.loadView(view, templates);
	res.render('./templates/admin/layout.ejs',data);
}