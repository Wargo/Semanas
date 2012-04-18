Ti.include('/lang.js');

var self = Titanium.UI.currentWindow;

var readFile = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'data.js');
var local_data = readFile.read();
data = eval(local_data.text);

var view = Ti.UI.createScrollView({
	layout:'vertical',
	contentHeight:'auto'
});

for (row in data) {
	var title = Ti.UI.createLabel({
		text:data[row].title,
		height:'auto',
		width:'auto',
		color:'#000'
	});
	
	var label = Ti.UI.createLabel({
		text:data[row].content,
		height:'auto',
		width:'auto',
		color:'#000',
		bottom:10
	});
	
	var image = Ti.UI.createImageView({
		image:'/images/data/semana1.jpg',
		bottom:20
	})
	
	view.add(title);
	view.add(label);
	view.add(image);
	
}

self.add(view);

view.scrollTo(0,500);