function AppWindow(title, url) {
	var self = Ti.UI.createWindow({
		title:title,
		url:url,
		backgroundColor:'#EDF8F8'
		//backgroundImage: '/images/embarazo.jpg'
	});
	
	return self;
};

module.exports = AppWindow;
