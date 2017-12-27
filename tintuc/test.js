var mysql = require('mysql');
var squel = require('squel');
var bcrypt = require('bcrypt');
var md5 = require('md5');
var path = require('path');

const saltRounds = 10;
const myPassword = '123123';

var str = 'picture.png';
var type = 'image/png';

var database = {
	host: "127.0.0.1",
	user: "root",
	password: "",
	// dateString: true,
	database: "tintuc"
}

var con = mysql.createConnection(database);

con.connect(function(err){
	if (err) throw err;
	console.log('Connected');
});
var table = 'article_contents';
var where = [5, 6];
where.map(function(id){
  let sql = squel.select().from(table).field("title").where("id = "+id);
  let query = con.query(sql.toString(), function(err, results){
    if (err) throw err;
    console.log(id);
    console.log(results);
  })
})
