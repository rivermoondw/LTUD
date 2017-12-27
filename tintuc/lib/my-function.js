var db = require('./db.js');
var con = db.con;
var squel = db.squel;
var cat_table = 'article_categories';
var news_table = 'article_contents';
var permission_table = 'role_permission';

exports.slug = function(str) {
	str = str.replace(/^\s+|\s+$/g,'');
	str = str.toLowerCase();

	var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;ÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬĐÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴàáảãạăằắẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ";
	var to =   "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------AAAAAAAAAAAAAAAAADEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYYaaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyy";
	for (var i=0,l=from.length;i<l;i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	str = str.replace(/[^a-z0-9 -]/g, '')
	.replace(/\s+/g, '-')
	.replace(/-+/g, '-');
	return str;
}

exports.getMenu = function (req, res, next){
	var sql = squel.select({autoQuoteFieldNames:true}).from(cat_table)
								.field("id")
								.field("title")
								.field("slug")
								.where("\`show\` = 1")
								.order("order_sort")
	;
	var query = con.query(sql.toString(), function(err, results) {
		if (err) throw err;
		res.locals.menu = results;
		next();
	});
}

exports.getNewestNews = function(req, res, next) {
  var sql = squel.select({autoQuoteFieldNames:true}).from(news_table)
								.field(news_table+".id")
                .field(news_table+".title", "newsTitle")
                .field("introduction")
                .field("url_img")
                .field(news_table+".slug", "newsSlug")
                .field(cat_table+".slug", "catSlug")
                .join(cat_table, null, cat_table+".id = "+news_table+".cat_id")
								.where(news_table+".\`show\` = 1")
                .order(news_table+".created_at", false)
                .limit(10)
  ;
  var query = con.query(sql.toString(), function(err, results){
    if (err) throw err;
    res.locals.newsestNews = results;
		next();
  });
}

exports.getHotNews = function(req, res, next){
	var sql = squel.select({autoQuoteFieldNames:true}).from(news_table)
								.field(news_table+".id")
                .field(news_table+".title", "newsTitle")
                .field("url_img")
                .field(news_table+".slug", "newsSlug")
                .field(cat_table+".slug", "catSlug")
                .join(cat_table, null, cat_table+".id = "+news_table+".cat_id")
								.where("hot_news = 1")
								.where(news_table+".show = 1")
								.order(news_table+".created_at", false)
								.limit(10)
	;
	var query = con.query(sql.toString(), function(err, results){
		if (err) throw err;
		res.locals.hotNews = results;
		next();
	})
}

exports.addZero = function(str) {
	str = str.toString();
	if (str.length == 1) {
		str = str.replace(str, '0'+str);
	}
	return str
}

exports.isLoggedIn = function(req, res, next) {
	if (req.user) {
		next();
	}
	else {
		res.redirect('/admin/login');
	}
}

exports.checkLogin = function(req, res, next) {
	if (!req.user) {
		next();
	}
	else {
		res.redirect('/admin/category/list');
	}
}

exports.checkPermission = function(req, res, next) {
	var regex = /\/[^\/]*\/[^\/]*\/[^\/]*/g;
	var matches = regex.exec(req.path);
	if (matches != null) {
		var roleId = req.user[0].role_id;
		var sql = squel.select({autoQuoteFieldNames:true}).from(permission_table)
									.field("permission")
									.where("role_id = "+parseInt(roleId))
		;
		var query = con.query(sql.toString(), function(err, results){
			if (err) throw err;
			var permission = false;
			results.map(function(val) {
				if (matches[0] == val.permission) {
					permission = true;
				}
			});
			if (!permission) {
				res.redirect('/admin/user/add');
			}
			else {
				next();
			}
		});
	}
}

exports.checkCat = function(req, res, next){
	if (req.params.cat != 'admin'){
		let sql = squel.select({autoQuoteFieldNames:true}).from(cat_table)
									.field("title")
									.where("slug = '"+req.params.cat+"'")
									.where("\`show\` = 1")
		;
		let query = con.query(sql.toString(), function(err, results){
			if (err) throw err;
			if (results.length == 0){
				res.redirect("/");
			}
			else {
				res.locals.title = results[0].title;
				next();
			}
		})
	}
}

exports.checkContent = function(req, res, next){
	if (req.params.cat != 'admin'){
		let sql = squel.select({autoQuoteFieldNames:true}).from(news_table)
									.field(news_table+".title", "newsTitle")
									.field(cat_table+".title", "catTitle")
									.join(cat_table, null, cat_table+".id = "+news_table+".cat_id")
									.where(news_table+".slug = '"+req.params.article+"'")
									.where(cat_table+".slug = '"+req.params.cat+"'")
									.where(news_table+".show = 1")
		;
		let query = con.query(sql.toString(), function(err, results){
			if (err) throw err;
			if (results.length == 0){
				res.redirect("/");
			}
			else {
				res.locals.title = results[0].newsTitle;
				res.locals.catTitle = results[0].catTitle;
				next();
			}
		})
	}
}
