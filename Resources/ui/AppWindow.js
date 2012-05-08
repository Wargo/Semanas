function AppWindow(title, url, layout) {
	var self = Ti.UI.createWindow({
		title:title,
		url:url,
		backgroundColor:'#EDF8F8',
		layout:layout
		//backgroundImage: '/images/embarazo.jpg'
	});
	
	return self;
};

module.exports = AppWindow;
