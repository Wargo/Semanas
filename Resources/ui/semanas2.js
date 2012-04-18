Ti.include('/lang.js');

var self = Titanium.UI.currentWindow;

var readFile = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'data.js');
var local_data = readFile.read();
data = eval(local_data.text);

var tableView = Ti.UI.createTableView({
	data:data,
	separatorColor:'#429BDA',
	borderWidth:1,
	rowHeight:80
});

self.add(tableView);

tableView.addEventListener('click', function(e) {
	var webview = Ti.UI.createWebView({
		url:e.rowData.url
	});
	var win = Ti.UI.createWindow();
	win.add(webview);
	Ti.UI.currentTab.open(win);
});
