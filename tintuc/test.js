var date = new Date();
var day = date.getFullYear()+'-'+addZero((date.getMonth()+1))+'-'+addZero(date.getDate())+' '+addZero((date.getHours()+1))+':'+addZero(date.getMinutes())+':'+addZero(date.getSeconds());
console.log(day);

function addZero(str) {
	str = str.toString();
	if (str.length == 1) {
		str = str.replace(str, '0'+str);
	}
	return str
}