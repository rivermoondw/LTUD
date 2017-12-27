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
  data.hotNews = res.locals.hotNews;
  data.news = [];
  m_page.getNewsByCat(data.cats, function(err, results){
    if (err) throw err;
    data.cats.map(function(cat, index){
      data.news.push({name: cat.title, data:[]});
      results.map(function(result){
        if (result.cat_id == cat.id && index < 4 && data.news[index].data.length < 5){
          data.news[index].data.push(result)
        }
      })
    })
    res.render(layout, data);
  });
}

exports.listNews = function(req, res) {
  var data = {};
  data.pageTitle = res.locals.title;
  data.view = 'list';
  data.cats = res.locals.menu;
  data.hotNews = res.locals.hotNews;
  m_page.getListByCat(req.params.cat, function(err, results){
    if (err) throw err;
    data.listNews = results;
    res.render(layout, data);
  })
}

exports.contentNews = function(req, res){
  var data = {};
  data.pageTitle = res.locals.title;
  data.catTitle = res.locals.catTitle;
  data.view = 'content';
  data.cats = res.locals.menu;
  data.hotNews = res.locals.hotNews;
  m_page.getNewsContent(req.params.article, function(err, results){
    if (err) throw err;
    data.newsContent = results[0];
    res.render(layout, data);
  })
}
