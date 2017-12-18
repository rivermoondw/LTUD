var db = require('../../../lib/db.js');
var main_table = 'roles';
var permission_table = 'role_permission';
var con = db.con;
var squel = db.squel;
exports.add = function(fields, data, permission) {
	var sql = squel.insert({ autoQuoteFieldNames: true }).into(main_table);
	fields.map(function(field, i){
		sql = sql.set(field,data[i]);
	});
	var query = con.query(sql.toString(), function(err, result, fields){
		if (err) throw err;
		if (result.affectedRows > 0) {
			var insertData = [];
			permission.map(function(permission, i){
				insertData.push({role_id: result.insertId, permission: permission})
			});
			sql = squel.insert({autoQuoteFieldNames:true}).into(permission_table).setFieldsRows(insertData);
			var query = con.query(sql.toString(), function(err, results){
				if (err) throw err;
				console.log(results.affectedRows+" permission inserted");
			});
		}
		console.log("1 role inserted");
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
