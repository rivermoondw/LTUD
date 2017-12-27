var db = require('../../../lib/db.js');
var con = db.con;
var squel = db.squel;
var cat_table = 'article_categories';
var news_table = 'article_contents';
var user_table = 'users';

exports.getNewestNews = function(callback) {
  var sql = squel.select({autoQuoteFieldNames:true}).from(news_table)
                .field("id")
                .field("title")
                .where("\`show\` = 1")
                .order("created_at", false)
                .limit(10)
  ;
  var query = con.query(sql.toString(), function(err, results){
    if (err) callback(err, null);
    else callback(null, results);
  });
}

exports.getNewsByCat = function(cats, callback){
  let sql = squel.select({autoQuoteFieldNames:true}).from(news_table)
                .field(news_table+".id")
                .field(news_table+".title", "newsTitle")
                .field("introduction")
                .field("cat_id")
                .field("url_img")
                .field(news_table+".slug", "newsSlug")
                .field(cat_table+".slug", "catSlug")
                .join(cat_table, null, cat_table+".id = "+news_table+".cat_id")
                .where(news_table+".show = 1")
                .order(news_table+".created_at", false)
  ;
  let exp = squel.expr();
  cats.map(function(cat){
    exp.or("cat_id = ?", cat.id)
  })
  sql.where(exp);
  let query = con.query(sql.toString(), function(err, results){
    if (err) callback(err, null);
    else callback(null, results);
  })
}

exports.getListByCat = function(slug, callback) {
  let sql = squel.select({autoQuoteFieldNames:true}).from(news_table)
                .field(news_table+".id")
                .field(news_table+".title", "newsTitle")
                .field("introduction")
                .field(news_table+".slug", "newsSlug")
                .field("url_img")
                .field("name")
                .field(cat_table+".title", "catTitle")
                .field(cat_table+".slug", "catSlug")
                .join(cat_table, null, cat_table+".id = "+news_table+".cat_id")
                .join(user_table, null, user_table+".id = "+news_table+".user_id")
                .where(cat_table+".slug = '"+slug+"'")
                .where(news_table+".show = 1")
  ;
  let query = con.query(sql.toString(), function(err, results){
    if (err) callback(err, null);
    else callback(null, results);
  })
}

exports.getNewsContent = function(slug, callback){
  let sql = squel.select({autoQuoteFieldNames:true}).from(news_table)
                .field(news_table+".id")
                .field(news_table+".title", "newsTitle")
                .field("introduction")
                .field("content")
                .field(news_table+".slug", "newsSlug")
                .field("url_img")
                .field("name")
                .field(cat_table+".title", "catTitle")
                .field(cat_table+".slug", "catSlug")
                .join(cat_table, null, cat_table+".id = "+news_table+".cat_id")
                .join(user_table, null, user_table+".id = "+news_table+".user_id")
                .where(news_table+".slug = '"+slug+"'")
                .where(news_table+".show = 1")
  ;
  let query = con.query(sql.toString(), function(err, results){
    if (err) callback(err, null);
    else callback(null, results);
  })
}
