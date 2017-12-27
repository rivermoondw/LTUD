var db = require('../../../lib/db.js');
var randomstring = require('randomstring');
var md5 = require('md5');
var main_table = 'users';
var role_table = 'roles';
var con = db.con;
var squel = db.squel;
const saltRounds = 10;
exports.getUser = function(email, callback){
	var sql = squel.select({autoQuoteFieldNames:true}).from(main_table)
								.field("id")
								.field("email")
								.field("password")
								.field("salt")
								.field("name")
								.field("role_id")
								.field("avatar")
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
								.field("role_id")
								.field("avatar")
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
	var salt = randomstring.generate(255);
	var encryptPassword = md5(md5(salt)+md5(md5(password)));
	sql = sql.set("salt", salt).set("password", encryptPassword);
	var query = con.query(sql.toString(), function(err, result, fields){
		if (err) throw err;
		console.log("1 record inserted");
	});
}
exports.getList = function(result) {
  var sql = squel.select({
    autoQuoteFieldNames: true
  }).from(main_table)
		.field(main_table+".id")
		.field("email")
		.field("name")
		.field(role_table+".title")
		.join(role_table, null, main_table+".role_id = "+role_table+".id")
	;
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
    .field('email')
    .field('password')
    .field('name')
    .field('role_id')
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
exports.getEmail = function(email, callback) {
	var sql = squel.select({
      autoQuoteFieldNames: true
    }).from(main_table)
    .field('email')
    .where("\`email\` LIKE '"+email+"'");
  var query = con.query(sql.toString(), function(err, result, fields) {
    if (err) callback(err, null);
    else callback(null, result);
  });
}
