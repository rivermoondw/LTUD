var ejs = require('ejs');
var m_article = require('../../models/admin/m_article.js');
var myFunction = require('../../../lib/my-function.js');
var templates = 'admin';
var layout = './templates/admin/layout.ejs';
var active_parent = 'article';

exports.add = function(req, res) {
  var data = {};
  data.beforeHead = '';
	data.beforeBody = '';
  data.username = req.user[0].name;
  data.role = req.user[0].title;
  data.active = 'add';
  data.active_parent = active_parent;
  data.view = 'article-add';
  data.pageTitle = 'Thêm bài viết';
  data.headContent = 'Thêm bài viết';
  m_article.getCategories(function(err, results) {
    if (err) throw err;
    data.cats = results;
    res.render(layout, data);
  });
}
exports.postAdd = function(req, res) {
  if (req.body.submit) {
    var date = new Date();
    var fields = ['title', 'slug', 'introduction', 'content', 'cat_id', 'view_count', 'show', 'hot_news', 'created_at', 'updated_at'];
    var data = [req.body.title, myFunction.slug(req.body.title), req.body.introduction, req.body.content, parseInt(req.body.cat_id), parseInt(1), parseInt(req.body.show), parseInt(req.body.hot_news), date, date];
    m_article.add(fields, data);
    res.redirect('/admin/article/list');
  }
}
exports.list = function(req, res) {
  var data = {};
  data.beforeHead = '';
	data.beforeBody = '';
  data.username = req.user[0].name;
  data.role = req.user[0].title;
  data.active = 'list';
  data.active_parent = active_parent;
  data.view = 'article-list';
  data.pageTitle = 'Danh sách bài viết';
  data.headContent = 'Danh sách bài viết';
  m_article.getList(function(err, results) {
    if (err) throw err;
    data.rows = results;
    res.render(layout, data);
  });
}
exports.edit = function(req, res) {
  if (!req.params.id) {
    res.redirect('/admin/article/list');
  }
  m_article.getId(req.params.id, function(err, result) {
    if (err) throw err;
    if (result.length == 0) {
      res.redirect('/admin/article/list');
    } else {
      var data = {};
      data.beforeHead = '';
    	data.beforeBody = '';
      data.username = req.user[0].name;
      data.role = req.user[0].title;
      data.active_parent = active_parent;
      data.active = 'edit';
      data.view = 'article-edit';
      data.pageTitle = 'Sửa bài viết';
      data.headContent = 'Sửa bài viết';
      data.result = result[0];
      m_article.getCategories(function(err, results) {
        if (err) throw err;
        data.cats = results;
        res.render(layout, data);
      });
    }
  });
}
exports.postEdit = function(req, res) {
  if (req.body.submit) {
    var date = new Date();
    var fields = ['title', 'introduction', 'slug', 'content', 'cat_id', 'show', 'hot_news', 'updated_at'];
    var data = [req.body.title, req.body.introduction, myFunction.slug(req.body.title), req.body.content, parseInt(req.body.cat_id), parseInt(req.body.show), parseInt(req.body.hot_news), date];
    m_article.edit(fields, data, req.params.id);
    res.redirect('/admin/article/list');
  }
}
exports.del = function(req, res) {
  m_article.getId(req.params.id, function(err, result) {
    if (err) throw err;
    if (result.length == 0) {
      res.redirect('/admin/article/list');
    } else {
      m_article.del(req.params.id);
      res.redirect('/admin/article/list');
    }
  });
}
