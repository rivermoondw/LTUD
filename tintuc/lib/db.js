var mysql = require('mysql');
var database = require('../config/database.js');

var con = mysql.createConnection(database);

con.connect(function(err){
	if (err) throw err;
	console.log('Connected');
});

exports.insert = function(table, data) {
	var sql = "INSERT INTO ?? SET ?";
	var query = con.query(sql, [table, data], function(err, result, fields){
		if (err) throw err;
		console.log(query.sql);
		console.log("1 records inserted");
	});
}
