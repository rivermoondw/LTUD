var db = require('../../../lib/db.js');
var main_table = 'article_categories';
exports.add = function(data) {
	data.order_sort = parseInt(data.order_sort);
	db.insert(main_table, data);
}