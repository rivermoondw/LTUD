var ejs = require('ejs');
var m_category = require('../../models/admin/m_category.js');
var myFunction = require('../../../lib/my-function.js');
var layout = './templates/admin/layout.ejs';
var active_parent = 'category';

exports.add = function(req, res) {
	var data = {};
	data.beforeHead = '';
	data.beforeBody = '';
	data.username = req.user[0].name;
  data.role = req.user[0].title;
	data.avatar = req.user[0].avatar;
	data.active = 'add';
	data.active_parent = active_parent;
	data.view = 'category-add';
	data.pageTitle = 'Thêm danh mục';
	data.headContent = 'Thêm danh mục';
	res.render(layout, data);
}
exports.postAdd = function(req, res) {
	if (req.body.submit){
		var date = new Date();
		var fields = ['title', 'order_sort', 'description', 'show', 'slug', 'created_at', 'updated_at'];
		var data = [req.body.title, parseInt(req.body.order_sort), req.body.description, parseInt(req.body.show), myFunction.slug(req.body.title), date, date];
		m_category.add(fields, data);
		res.redirect('/admin/category/list');
	}
}
exports.list = function(req, res) {
	var data = {};
	data.beforeHead = '';
	data.beforeBody = '';
	data.username = req.user[0].name;
  data.role = req.user[0].title;
	data.avatar = req.user[0].avatar;
	data.active = 'list';
	data.active_parent = active_parent
	data.view = 'category-list';
	data.pageTitle = 'Danh sách danh mục';
	data.headContent = 'Danh sách danh mục';
	m_category.getList(function(err, results){
		if (err) throw err;
		data.rows = results;
		res.render(layout, data);
	});
}
exports.edit = function(req, res) {
	if (!req.params.id) {
		res.redirect('/admin/category/list');
	}
	m_category.getId(req.params.id, function(err, result){
		if (err) throw err;
		if (result.length == 0){
			res.redirect('/admin/category/list');
		}
		else {
			var data = {};
			data.beforeHead = '';
			data.beforeBody = '';
			data.username = req.user[0].name;
		  data.role = req.user[0].title;
			data.avatar = req.user[0].avatar;
			data.active_parent = active_parent;
			data.active = 'edit';
			data.view = 'category-edit';
			data.pageTitle = 'Sửa danh mục';
			data.headContent = 'Sửa danh mục';
			data.result = result[0];
			res.render(layout, data);
		}
	});
}
exports.postEdit = function(req, res) {
	if (req.body.submit) {
		var date = new Date();
		var fields = ['title', 'order_sort', 'description', 'show', 'slug', 'updated_at'];
		var data = [req.body.title, parseInt(req.body.order_sort), req.body.description, parseInt(req.body.show), myFunction.slug(req.body.title), date];
		m_category.edit(fields, data, req.params.id);
		res.redirect('/admin/category/list');
	}
}
exports.del = function(req, res) {
	m_category.getId(req.params.id, function(err, result){
		if (err) throw err;
		if (result.length == 0){
			res.redirect('/admin/category/list');
		}
		else {
			m_category.del(req.params.id);
			res.redirect('/admin/category/list');
		}
	});
}
