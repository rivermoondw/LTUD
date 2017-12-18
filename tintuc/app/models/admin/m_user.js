var db = require('../../../lib/db.js');
var bcrypt = require('bcrypt');
var main_table = 'users';
var con = db.con;
var squel = db.squel;
const saltRound = 10;
exports.getUser = function(email, callback){
	var sql = squel.select({autoQuoteFieldNames:true}).from(main_table)
								.field("id")
								.field("email")
								.field("password")
								.field("name")
								.field("group_id")
								.field("role_id")
								.where("email = '"+email+"'")
	;
	var query = con.query(sql.toString(), function(err, results){
		if (err) callback(err, null);
		else callback(null, results);
	});
}

exports.getUserId = function(id, callback){
	var sql = squel.select({autoQuoteFieldNames:true}).from(main_table)
								.field("users.id")
								.field("email")
								.field("password")
								.field("name")
								.field("group_id")
								.field("role_id")
								.field("roles.title")
								.join("roles", null, "users.role_id = roles.id")
								.where("users.id = "+parseInt(id))
	;
	var query = con.query(sql.toString(), function(err, results){
		if (err) callback(err, null);
		else callback(null, results);
	});
}

exports.add = function(fields, data, password) {
	var sql = squel.insert({ autoQuoteFieldNames: true }).into(main_table);
	fields.map(function(field, i){
		sql = sql.set(field,data[i]);
	});
	var query = con.query(sql.toString(), function(err, result, fields){
		if (err) throw err;
		console.log("1 record inserted");
	});
}
exports.getList = function(result) {
  var sql = squel.select({
    autoQuoteFieldNames: true
  }).from(main_table);
  var query = con.query(sql.toString(), function(err, results, fields) {
    if (err) result(err, null);
    else result(null, results);
  });
}
exports.getId = function(id, callback) {
  var sql = squel.select({
      autoQuoteFieldNames: true
    }).from(main_table)
    .field('id')
    .field('title')
    .field('order_sort')
    .field('show')
    .field('description')
    .where("\`id\` = " + parseInt(id));
  var query = con.query(sql.toString(), function(err, result, fields) {
    if (err) callback(err, null);
    else callback(null, result);
  });
}
exports.edit = function(fields, data, id) {
  var sql = squel.update({
    autoQuoteFieldNames: true
  }).table(main_table);
  fields.map(function(field, i) {
    sql = sql.set(field, data[i])
  });
  sql = sql.where("\`id\` = " + parseInt(id));
  var query = con.query(sql.toString(), function(err, result) {
    if (err) throw err;
    console.log("1 record updated");
  });
}
exports.del = function(id) {
  var sql = squel.delete({
    autoQuoteFieldNames: true
  }).from(main_table).where("\`id\` = " + parseInt(id));
  var query = con.query(sql.toString(), function(err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });
}
