var db = require('../../../lib/db.js');
var con = db.con;
var squel = db.squel;
var cat_table = 'article_categories';
var news_table = 'article_contents';

exports.getNewestNews = function(callback) {
  var sql = squel.select({autoQuoteFieldNames:true}).from(news_table)
                .field("id")
                .field("title")
                .order("created_at", false)
                .limit(10)
  ;
  var query = con.query(sql.toString(), function(err, results){
    if (err) callback(err, null);
    else callback(null, results);
  });
}
exports.getNews = function(callback) {

}
