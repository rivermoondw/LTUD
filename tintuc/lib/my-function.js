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
								.where("\`show\` = 1")
	;
	var query = con.query(sql.toString(), function(err, results) {
		if (err) throw err;
		res.locals.menu = results;
		next();
	});
}

exports.getNewestNews = function(req, res, next) {
  var sql = squel.select({autoQuoteFieldNames:true}).from(news_table)
                .field("id")
                .field("title")
                .order("created_at", false)
                .limit(10)
  ;
  var query = con.query(sql.toString(), function(err, results){
    if (err) throw err;
    res.locals.newsestNews = results;
		next();
  });
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
				res.redirect('/admin/role/list');
			}
		});
	}
	next();
}
