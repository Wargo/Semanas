function AppWindow(title, url) {
	var self = Ti.UI.createWindow({
		title:title,
		url:url,
		backgroundColor:'white',
		backgroundImage: '/images/embarazo.jpg'
	});
	
	return self;
};

module.exports = AppWindow;
