var db = require('../../../lib/db.js');
var main_table = 'role_permission';
var role_table = 'roles';
var con = db.con;
var squel = db.squel;

exports.getPermission = function(role_id, callback) {
  var sql = squel.select({autoQuoteFieldNames:true}).from(main_table)
                .field("permission")
                .where("role_id = "+parseInt(role_id))
  ;
  var query = con.query(sql.toString(), function(err, results){
    if (err) callback(err, null);
    else callback(null, results);
  });
}
