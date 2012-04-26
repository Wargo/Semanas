Ti.API.info('Recibir notificación: ' + Ti.App.Properties.getBool('receiveNotifications') + ' ----- ' + Ti.App.Properties.getInt('notificationCount'));
if (Ti.App.Properties.getBool('receiveNotifications')) {
	if (!Ti.App.Properties.getInt('notificationCount')) {
		Ti.App.Properties.setInt('notificationCount', 1); // Para que no haga nada la primera vez
	} else {
		var cont = Ti.App.Properties.getInt('notificationCount');
		cont ++;
		Ti.App.Properties.setInt('notificationCount', cont);
		
		Ti.Android.NotificationManager.notify(cont,
			Ti.Android.createNotification({
				icon:0x7f020000,
				contentTitle:'Título Prueba',
				contentText:'textazooooo',
				tickerText:'recibiendo notificación...',
				//flags:Ti.Android.FLAG_ONGOING_EVENT,
				when: new Date().getTime(),
				contentIntent:Ti.Android.createPendingIntent({
					//flags:Ti.Android.FLAG_UPDATE_CURRENT,
					//flags:Ti.Android.FLAG_ACTIVITY_NO_HISTORY,
					flags:Ti.Android.FLAG_ACTIVITY_NEW_TASK,
					activity:Ti.Android.currentActivity,
					type:Ti.Android.PENDING_INTENT_FOR_ACTIVITY,
					intent:Ti.Android.createIntent({
						category:Ti.Android.CATEGORY_LAUNCHER,
						packageName:Ti.App.id,
						className:Ti.App.id + '.SemanasActivity',
						//url:'app.js',
						action:Ti.Android.ACTION_MAIN,
						//flags:Ti.Android.FLAG_ACTIVITY_CLEAR_TOP | Ti.Android.FLAG_ACTIVITY_SINGLE_TOP,
					})
				})
			})
		);
		
		var service = Ti.Android.currentService;
		if (service) {
			var serviceIntent = service.getIntent();
			Ti.API.info('Extra: ' + serviceIntent.getStringExtra('message'));
			Ti.Android.stopService(serviceIntent);
		}
	}
}