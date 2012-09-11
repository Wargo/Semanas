var win = Ti.UI.currentWindow;
win.backgroundColor = '#FFF';

var view = Ti.UI.createScrollView({
	contentHeight:'auto',
	backgroundColor:'#FFF',
	layout:'vertical',
	left:5,top:5,right:5,bottom:5,
	top:0
});
win.add(view);

var readFile = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'ui/' + win.bbdd);
var local_data = readFile.read();

var match, _title = "", regex = /<h1>(.*?)<\/h1>/ig;
while (match = regex.exec(local_data)) { _title += match[1]; }

var title = Ti.UI.createLabel({
	text:_title,
	color:'#FFF',
	font:{fontSize:20},
	height:45
});
var titleView = Ti.UI.createView({
	top:5,
	backgroundColor:'#429BDA',
	height:45,
	opacity:0.9
})
titleView.add(title);
win.add(titleView);

var match, _text = "", regex = /<p>(.*?)<\/p>/ig;
while (match = regex.exec(local_data)) {
	if (trim(stripTags(match[1]))) {
		if (trim(stripTags(match[1])) != 'Continua a leggere') {
			_text += trim(stripTags(match[1])) + "\r\n\r\n";
		}
	}
}

var text = Ti.UI.createLabel({
	text:trim(_text),
	top:55,
	font:{fontSize:16},
	color:'#333'
});
view.add(text);

var match, _list = "", regex = /<li>(.*?)<\/li>/ig;
while (match = regex.exec(local_data)) { _list += "· " + stripTags(match[1]) + '\r\n\r\n'; }

var list = Ti.UI.createLabel({
	text:trim(_list),
	top:15,
	font:{fontSize:16},
	color:'#333'
});
view.add(list);

function stripTags(string) {
	return string.replace(/(<([^>]+)>)/ig,"");
}

function ltrim(str) { 
	for(var k = 0; k < str.length && isWhitespace(str.charAt(k)); k++);
	return str.substring(k, str.length);
}
function rtrim(str) {
	for(var j=str.length-1; j>=0 && isWhitespace(str.charAt(j)) ; j--) ;
	return str.substring(0,j+1);
}
function trim(str) {
	return ltrim(rtrim(str));
}
function isWhitespace(charToCheck) {
	var whitespaceChars = " \t\n\r\f";
	return (whitespaceChars.indexOf(charToCheck) != -1);
}