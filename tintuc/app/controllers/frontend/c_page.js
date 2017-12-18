var ejs = require('ejs');
var layout = './templates/frontend/layout.ejs';
var m_article = require('../../models/admin/m_article.js');
var m_page = require('../../models/frontend/m_page.js');

exports.home = function(req, res) {
  var data = {};
  data.pageTitle = 'Trang chủ';
  data.view = 'home';
  data.cats = res.locals.menu;
  data.newsestNews = res.locals.newsestNews;
  res.render(layout, data);
}

exports.listNews = function(req, res) {
  var data = {};
}
