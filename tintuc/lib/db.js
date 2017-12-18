var mysql = require('mysql');
var database = require('../config/database.js');
var squel = require('squel');
squel.registerValueHandler(Date, function(date) {
  return '"' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '"';
});
var con = mysql.createConnection(database);
con.connect(function(err) {
  if (err) throw err;
  console.log('database connected');
});
exports.con = con;
exports.squel = squel;
