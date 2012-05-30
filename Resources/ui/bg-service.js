if (Ti.App.Properties.getBool('receiveNotifications')) {
	Ti.App.iOS.cancelAllLocalNotifications(); 
	
	//var count = Ti.App.Properties.getInt('bg-serviceCount', 0);

	//if (count == 0) {
		//Ti.App.Properties.setInt('bg-serviceCount', count);
	
		//Ti.API.info('bg-service has been run ' + count + ' times');
		
		//Ti.App.currentService.unregister();
		
		var newDate = new Date(new Date().getTime() + 10000); // 7 * 24 * 60 * 60 * 1000);
		var notification = Ti.App.iOS.scheduleLocalNotification({
			alertBody:'Semana actual de tu embarazo',
			alertAction:'Ver semana',
			date:newDate,
			//badge:count
			//repeat:'daily' // weekly
		});
		
		Ti.API.info('Tiene que funcionar');
	//} else {
		//Ti.API.info('No tiene que funcionar');
	//}
	
	//count ++;
}

//Ti.API.info('Por qué no vaaaaa???')
