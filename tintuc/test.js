var mysql = require('mysql');
var squel = require('squel');
var bcrypt = require('bcrypt');
var md5 = require('md5');

const saltRounds = 10;
const myPassword = '123123';

var salt = bcrypt.genSaltSync(saltRounds);
var hash = bcrypt.hashSync(md5(myPassword), salt);
console.log(salt);
console.log(hash);

if (bcrypt.compareSync(md5(myPassword), md5(hash))) {
	console.log("ok");
}
// var database = {
// 	host: "127.0.0.1",
// 	user: "root",
// 	password: "",
// 	// dateString: true,
// 	database: "tintuc"
// }
//
// var con = mysql.createConnection(database);
//
// con.connect(function(err){
// 	if (err) throw err;
// 	console.log('Connected');
// });
// var table = 'article_contents';
// var fields = ['id', 'title'];
// var data = [1, 'test'];
// var sql = squel.insert().into(table);
// fields.map(function(field, i){
// 	sql = sql.set(field,data[i]);
// });
// console.log(sql.toString());
