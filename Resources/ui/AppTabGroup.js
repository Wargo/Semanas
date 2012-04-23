Ti.include('/lang.js');

function AppTabGroup() {
	//declare module dependencies
	var AppWindow = require('ui/AppWindow');
	
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	//create app tabs
	var win1 = new AppWindow(L('Semanas'), 'ui/semanas.js'),
		win4 = new AppWindow(L('Configuración'), 'ui/config.js'),
		win2 = new AppWindow(L('Fecha Parto'), 'ui/fecha.js'),
		win3 = new AppWindow(L('Newsletter'), 'ui/newsletter.js');
	
	var tab1 = Ti.UI.createTab({
		title: L('Semanas'),
		icon: '/images/KS_nav_ui.png',
		window: win1
	});
	win1.containingTab = tab1;
	
	var tab4 = Ti.UI.createTab({
		title: L('Configuración'),
		icon: '/images/KS_nav_ui.png',
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
	
	return self;
};

module.exports = AppTabGroup;