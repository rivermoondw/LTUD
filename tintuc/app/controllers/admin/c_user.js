var ejs = require('ejs');
var m_user = require('../../models/admin/m_user.js');
var m_role = require('../../models/admin/m_role.js');
var myFunction = require('../../../lib/my-function.js');
var layout = './templates/admin/layout.ejs';
var active_parent = 'user';
var path = require('path');

exports.add = function(req, res) {
	var data = {};
	data.beforeHead = '';
	data.beforeBody = '';
  data.username = req.user[0].name;
  data.role = req.user[0].title;
	data.avatar = req.user[0].avatar;
	data.active_parent = active_parent;
	data.active = 'add';
	data.view = 'user-add';
	data.pageTitle = 'Thêm tài khoản';
	data.headContent = 'Thêm tài khoản';
  m_role.getList(function(err, results) {
    data.roles = results;
    res.render(layout, data);
  });
}
exports.postAdd = function(req, res) {
	if (req.body.submit){
		m_user.getEmail(req.body.email, function(err, result) {
			if (result.length > 0) {
				res.redirect('/admin/user/add');
			}
			else {
				var date = new Date();
				var fields = ['email', 'name', 'role_id', 'avatar', 'created_at', 'updated_at'];
				var data = [req.body.email, req.body.name, parseInt(req.body.role_id), req.file.filename, date, date];
				m_user.add(fields, data, req.body.password);
				res.redirect('/admin/user/list');
			}
		});
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
	data.active_parent = active_parent;
	data.view = 'user-list';
	data.pageTitle = 'Danh sách tài khoản';
	data.headContent = 'Danh sách tài khoản';
	m_user.getList(function(err, results){
		if (err) throw err;
		data.rows = results;
		res.render(layout, data);
	});
}
exports.edit = function(req, res) {
	if (!req.params.id) {
		res.redirect('/admin/user/list');
	}
	m_user.getId(req.params.id, function(err, result){
		if (err) throw err;
		if (result.length == 0){
			res.redirect('/admin/user/list');
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
			data.view = 'user-edit';
			data.pageTitle = 'Sửa tài khoản';
			data.headContent = 'Sửa tài khoản';
			data.result = result[0];
			res.render(layout, data);
		}
	});
}
exports.postEdit = function(req, res) {
	if (req.body.submit) {
		var date = new Date();
		var fields = ['email', 'name', 'role_id', 'updated_at'];
		var data = [req.body.email, req.body.name, parseInt(req.body.role_id), date];
		m_user.edit(fields, data, req.params.id);
		res.redirect('/admin/user/list');
	}
}
exports.del = function(req, res) {
	m_user.getId(req.params.id, function(err, result){
		if (err) throw err;
		if (result.length == 0){
			res.redirect('/admin/user/list');
		}
		else {
			m_user.del(req.params.id);
			res.redirect('/admin/user/list');
		}
	});
}
