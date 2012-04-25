var count = Ti.App.Properties.getInt('bg-serviceCount', 0);

count ++;

Ti.App.Properties.setInt('bg-serviceCount', count);

Ti.API.info('bg-service has been run ' + count + ' times');

//Ti.App.currentService.unregister();


var newDate = new Date(new Date().getTime() + 5000); // 7 * 24 * 60 * 60 * 1000);
var notification = Ti.App.iOS.scheduleLocalNotification({
	alertBody:'Semana actual de tu embarazo',
	alertAction:'Ver semana',
	date:newDate,
	//badge:count
	//repeat:'daily' // weekly
});

Ti.API.info('Por qué no vaaaaa???')
