var ejs = require('ejs');

exports.loadView = function(view, templates) {
	var content;
	ejs.renderFile('./app/views/'+templates+'/'+view+'.ejs', function(err, str){
		if (err) {
			console.log(err);
		}
		else {
			content = str;
		}
	});
	return content;
}