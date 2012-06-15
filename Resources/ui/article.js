var win = Ti.UI.currentWindow;

var view = Ti.UI.createScrollView({
	contentHeight:'auto',
	layout:'vertical'
});
win.add(view);

var readFile = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'ui/' + win.bbdd);
var local_data = readFile.read();

var match, _title = "", regex = /<h1>(.*?)<\/h1>/ig;
while (match = regex.exec(local_data)) { _title += match[1]; }

var title = Ti.UI.createLabel({
	text:_title,
	top:10
});
view.add(title);


var match, _intro = "", regex = /<strong>(.*?)<\/strong>/ig;
while (match = regex.exec(local_data)) { _intro += match[1]; break; }

var intro = Ti.UI.createLabel({
	text:_intro,
	top:10
});
view.add(intro);


var match, _text = "", regex = /<p>(.*?)<\/p>/ig;
while (match = regex.exec(local_data)) { _text += "\r\n\r\n" + match[1]; }

_text = _text.replace(_intro, '').replace('<strong></strong>', '');

var text = Ti.UI.createLabel({
	text:trim(_text),
	top:10
});
view.add(text);






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