var ejs = require('ejs');
var m_role = require('../../models/admin/m_role.js');
var myFunction = require('../../../lib/my-function.js');
var layout = './templates/admin/layout.ejs';
var active_parent = 'role';

exports.add = function(req, res) {
	var data = {};
	data.beforeHead = '';
	data.beforeBody = '';
	data.active = 'add';
  data.username = req.user[0].name;
  data.role = req.user[0].title;
	data.active_parent = active_parent;
	data.view = 'role-add';
	data.pageTitle = 'Thêm vai trò';
	data.headContent = 'Thêm vai trò';
	res.render(layout, data);
}
exports.postAdd = function(req, res) {
	if (req.body.submit){
		var date = new Date();
		var fields = ['title', 'description', 'created_at', 'updated_at'];
		var data = [req.body.title, req.body.description, date, date];
		m_role.add(fields, data, req.body.permission);
		res.redirect('/admin/role/list');
	}
}
exports.list = function(req, res) {
	var data = {};
	data.beforeHead = '';
	data.beforeBody = '';
  data.username = req.user[0].name;
  data.role = req.user[0].title;
	data.active = 'list';
	data.active_parent = active_parent
	data.view = 'role-list';
	data.pageTitle = 'Danh sách vai trò';
	data.headContent = 'Danh sách vai trò';
	m_role.getList(function(err, results){
		if (err) throw err;
		data.rows = results;
		res.render(layout, data);
	});
}
exports.edit = function(req, res) {
	if (!req.params.id) {
		res.redirect('/admin/role/list');
	}
	m_role.getId(req.params.id, function(err, result){
		if (err) throw err;
		if (result.length == 0){
			res.redirect('/admin/role/list');
		}
		else {
			var data = {};
			data.beforeHead = '';
			data.beforeBody = '';
      data.username = req.user[0].name;
      data.role = req.user[0].title;
			data.active_parent = active_parent;
			data.active = 'edit';
			data.view = 'role-edit';
			data.pageTitle = 'Sửa vai trò';
			data.headContent = 'Sửa vai trò';
			data.result = result[0];
			res.render(layout, data);
		}
	});
}
exports.postEdit = function(req, res) {
	if (req.body.submit) {
		var date = new Date();
		var fields = ['title', 'description', 'updated_at'];
		var data = [req.body.title, req.body.description, date];
		m_role.edit(fields, data, req.params.id);
		res.redirect('/admin/role/list');
	}
}
exports.del = function(req, res) {
	m_role.getId(req.params.id, function(err, result){
		if (err) throw err;
		if (result.length == 0){
			res.redirect('/admin/role/list');
		}
		else {
			m_role.del(req.params.id);
			res.redirect('/admin/role/list');
		}
	});
}
