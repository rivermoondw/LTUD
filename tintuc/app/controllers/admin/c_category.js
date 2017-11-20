var ejs = require('ejs');
var load_view = require('../../../lib/load-view.js');
var m_category = require('../../models/admin/m_category.js');
var myFunction = require('../../../lib/my-function.js');
const templates = 'admin';
const layout = './templates/admin/layout.ejs'
exports.add = function(req, res) {
	var data = {};
	var view = 'category-add';
	data.pageTitle = 'Thêm danh mục';
	data.headContent = 'Thêm danh mục';
	data.content = load_view.loadView(view, templates);
	res.render(layout, data);
}
exports.postAdd = function(req, res) {
	if (req.body.submit){
		var date = new Date();
		// var created_at = date.getFullYear()+'-'+myFunction.addZero((date.getMonth()+1))+'-'+myFunction.addZero(date.getDate())+' '+myFunction.addZero((date.getHours()+1))+':'+myFunction.addZero(date.getMinutes())+':'+myFunction.addZero(date.getSeconds());
		var data = {
			title: req.body.title,
			order_sort: req.body.order_sort,
			description: req.body.description,
			show: req.body.show,
			slug: myFunction.slug(req.body.title),
			created_at: date,
			updated_at: date
		};
		m_category.add(data);
		res.redirect('/category/list');
	}
}
exports.list = function(req, res) {
	var data = {};
	var view = 'category-list';
	data.pageTitle = 'Danh sách danh mục';
	data.headContent = 'Danh sách danh mục';
	data.content = load_view.loadView(view, templates);
	res.render(layout, data);
}
exports.edit = function(req, res) {
	var data = {};
	var view = 'category-edit';
	data.pageTitle = 'Sửa danh mục';
	data.headContent = 'Sửa danh mục';
	data.content = load_view.loadView(view, templates);
	res.render(layout, data);
}