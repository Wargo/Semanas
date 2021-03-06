Ti.include('/lang.js');

function AppTabGroup() {
	//declare module dependencies
	var AppWindow = require('ui/AppWindow');
	
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	//create app tabs
	var win1 = new AppWindow(L('Settimane'), 'ui/semanas.js', null),
		win4 = new AppWindow(L('Configurazione'), 'ui/config.js', 'vertical'),
		win5 = new AppWindow(L('Cloud'), 'ui/cloud.js', 'vertical'),
		win2 = new AppWindow(L('Fecha Parto'), 'ui/fecha.js'),
		win3 = new AppWindow(L('Newsletter'), 'ui/newsletter.js');
	
	var tab1 = Ti.UI.createTab({
		title: L('Settimane'),
		icon: '/images/calendar.png',
		//icon: Ti.UI.iPhone.SystemIcon.OPTIONS,
		window: win1
	});
	win1.containingTab = tab1;
	
	
	var tab5 = Ti.UI.createTab({
		title: L('Cloud'),
		icon: '/images/KS_nav_ui.png',
		//icon: Ti.UI.iPhone.SystemIcon.OPTIONS,
		window: win5
	});
	win5.containingTab = tab5;
	
	
	var tab4 = Ti.UI.createTab({
		icon: '/images/spanner.png',
		//icon: Ti.UI.iPhone.SystemIcon.CALENDAR,
		title: L('Configurazione'),
		window: win4
	});
	win4.containingTab = tab4;
	
	var tab2 = Ti.UI.createTab({
		title: L('Fecha de parto'),
		icon: '/images/KS_nav_views.png',
		window: win2
	});
	win2.containingTab = tab2;
	
	var tab3 = Ti.UI.createTab({
		title: L('Newsletter'),
		icon: '/images/KS_nav_views.png',
		window: win3
	});
	win3.containingTab = tab3;
	
	self.addTab(tab1);
	//self.addTab(tab2);
	//self.addTab(tab3);
	self.addTab(tab4);
	//self.addTab(tab5);
	
	Ti.include('/bg_cloud.js');
	getDeviceToken(self);
	
	return self;
};

module.exports = AppTabGroup;