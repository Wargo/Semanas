function AppWindow(title, url) {
	var self = Ti.UI.createWindow({
		title:title,
		url:url,
		backgroundColor:'white'
	});
	
	return self;
};

module.exports = AppWindow;
