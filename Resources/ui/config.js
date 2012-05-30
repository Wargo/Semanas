Ti.include('/lang.js');

var self = Titanium.UI.currentWindow;
		
self.backgroundColor = '#429BDA';
self.backgroundImage = '/images/bg.jpg';

/*
 * Fecha de parto
 */
var view = Ti.UI.createView({
	top:5,
	backgroundColor:'#FFF',
	height:50,
	width:'97%'
});

var label1 = Ti.UI.createLabel({
	text:L('Data di parto'),
	color:'#000',
	top:12,
	left:10
});

var label2 = Ti.UI.createLabel({
	text:'[Vai]',
	color:'#ff0000',
	top:12,
	right:10
});

view.add(label1);
view.add(label2);
self.add(view);

if (Ti.App.Properties.getString('formattedDate')) {
	var formattedDate = Ti.App.Properties.getString('formattedDate');
	showDate = formattedDate.split('-');
	label2.text = showDate[2] + '/' + showDate[1] + '/' + showDate[0];
} else {
	var formattedDate = null;
}

view.addEventListener('click', function() {
	if (formattedDate) {
		var date = formattedDate.split('-');
		date = new Date(date[0], date[1] - 1, date[2]);
	} else {
		var date = new Date();
	}
	
	var datePicker = Ti.UI.createPicker({
		type:Ti.UI.PICKER_TYPE_DATE,
		bottom:0,
		value:date
	});
	
	datePicker.addEventListener('change', function(e) {
		formattedDate = transformDate(e.value);
	});
	
	var dialog = Ti.UI.createWindow({
		//backgroundColor:'#000',
		backgroundImage:'/images/bg.jpg',
		//opacity:0.8,
		//height:'100%',
		//width:'100%'
		//layout:'vertical'
	});
	
	//self.add(dialog);
	Ti.UI.currentTab.open(dialog);
	
	var doneButton = Ti.UI.createButton({
		title:L('Guardar'),
		style:Ti.UI.iPhone.SystemButton.SAVE,
		left:'15%',
		width:'30%',
		top: '50%',
		zIndex:999
	});
	
	var cancelButton = Ti.UI.createButton({
		title:L('Cancellare'),
		right:'15%',
		width:'30%',
		top: '50%',
		zIndex:999
	});
	
	doneButton.addEventListener('click', function(e){
		dialog.close();
		/*
		self.rightNavButton = null;
		self.remove(dialog);
		self.remove(datePicker);
		*/
		setDate(formattedDate);
		//Ti.App.Properties.setString('formattedDate', formattedDate);
		if (formattedDate) {
			showDate = formattedDate.split('-');
			label2.text = showDate[2] + '/' + showDate[1] + '/' + showDate[0];
		}
	});
	
	cancelButton.addEventListener('click', function(e){
		self.rightNavButton = null;
		self.remove(dialog);
		self.remove(datePicker);
	});
	
	var helpButton = Ti.UI.createButton({
		title:L('¿Non conosci la tua data di parto?'),
		width:'80%',
		height:40,
		top:20,
		zIndex:999
	});
	
	helpButton.addEventListener('click', function() {
		var helpWindow = Ti.UI.createWindow({
			title:L('Data di parto'),
			backgroundImage:'/images/bg.jpg'
		});
		var helpText = Ti.UI.createLabel({
			text:L('Inserisci il primo giorno dell\'ultima mestruazione'),
			top:10,
			left:10,
			right:10
		});
		var helpView = Ti.UI.createView({
			top:5,
			backgroundColor:'#FFF',
			height:100,
			width:'97%'
		});
		var helpPicker = Ti.UI.createPicker({
			type:Ti.UI.PICKER_TYPE_DATE,
			bottom:0
		});
		var helpDoneButton = Ti.UI.createButton({
			title:L('Obtener'),
			width:120,
			height:40,
			top:'25%'
		});
		if (Ti.Platform.osname == 'android') {
			helpDoneButton.height = 50;
			helpPicker.top = '50%';
			helpWindow.add(helpDoneButton);
		} else {
			helpWindow.rightNavButton = helpDoneButton;
		}
		
		var now = new Date();
		var helpDate = transformDate(now);
		helpPicker.addEventListener('change', function(e) {
			helpDate = transformDate(e.value);
		});
		
		helpView.add(helpText);
		helpWindow.add(helpView);
		helpWindow.add(helpPicker);
		Ti.UI.currentTab.open(helpWindow);
		
		helpDoneButton.addEventListener('click', function() {
			var helpCurrentDate = helpDate.split('-');
			helpCurrentDate = new Date(helpCurrentDate[0], helpCurrentDate[1] - (-8), helpCurrentDate[2] - (-14));
			
			formattedDate = transformDate(helpCurrentDate);
			setDate(formattedDate);
			//Ti.App.Properties.setString('formattedDate', formattedDate);
			datePicker.value = helpCurrentDate;  // Esto no va en Android
			helpWindow.close();
			
			if (Ti.Platform.osname == 'android') {
				dialog.close();
				showDate = formattedDate.split('-');
				label2.text = showDate[2] + '/' + showDate[1] + '/' + showDate[0];
			}
		});
	});
	
	dialog.add(helpButton);
	
	if (Ti.Platform.osname == 'android') {
		//helpButton.bottom = 20;
		helpButton.height = 50;
		dialog.add(doneButton);
		dialog.add(cancelButton);
		//self.add(dialog);
		datePicker.bottom = '10%';
	} else {
		dialog.rightNavButton = doneButton;
	}
	dialog.add(datePicker);
});
/*
 * Fin fecha de parto
 */

/*
 * Email
 */
if (Ti.App.Properties.getString('email')) {
	var currentEmail = Ti.App.Properties.getString('email');
	var default_email = null;
} else {
	var currentEmail = L('[Vai]');
	var default_email = currentEmail;
}

var view2 = Ti.UI.createView({
	//top:56,
	top:1,
	backgroundColor:'#FFF',
	height:50,
	width:'97%'
});

var label3 = Ti.UI.createLabel({
	text:L('E-mail'),
	color:'#000',
	top:12,
	left:10
});

var label4 = Ti.UI.createLabel({
	text:currentEmail,
	color:'#ff0000',
	top:12,
	right:10
});

view2.add(label3);
view2.add(label4);

self.add(view2);

view2.addEventListener('click', function() {
	var dialog2 = Ti.UI.createWindow({
		title:L('Data di parto'),
		backgroundImage:'/images/bg.jpg'
	});
	
	Ti.UI.currentTab.open(dialog2);
			
	var textField = Ti.UI.createTextField({
		top:'25%',
		width:'70%',
		value:label4.text,
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType:Ti.UI.KEYBOARD_EMAIL,
		font:{fontSize:16}
	});
	
	dialog2.add(textField);
	
	textField.focus();
	textField.value = label4.text;

	if (default_email) {
		textField.value = null;
		textField.hintText = default_email;
	}

	var doneButton2 = Ti.UI.createButton({
		title:L('Salvare'),
		left:'15%',
		width:'30%',
		top:'40%'
	});
	var cancelButton2 = Ti.UI.createButton({
		title:L('Cancellare'),
		right:'15%',
		width:'30%',
		top:'40%'
	});
	
	doneButton2.addEventListener('click', function(e) {
		Ti.App.Properties.setString('email', textField.value);
		if (textField.value) {
			label4.text = textField.value;
		} else {
			label4.text = L('[Vai]');
		}
		textField.blur();
		//self.remove(dialog2);
		dialog2.close();
		default_email = null;
	});	
	cancelButton2.addEventListener('click', function(e) {
		textField.blur();
		//self.remove(dialog2);
		dialog2.close();
	});

	dialog2.add(doneButton2);
	dialog2.add(cancelButton2);
});
/*
 * Fin email
 */

/*
 * Recibir newsletter
 */
var view3 = Ti.UI.createView({
	//top:107,
	top:1,
	backgroundColor:'#FFF',
	height:50,
	width:'97%'
});

var label5 = Ti.UI.createLabel({
	text:L('Ricevi la Newsletter?'),
	color:'#000',
	top:12,
	left:10
});
		
if (Ti.App.Properties.getBool('newsletter')) {
	var newsletter = Ti.App.Properties.getBool('newsletter');
} else {
	var newsletter = false;
}

var switcher = Ti.UI.createSwitch({
	value:newsletter,
	top:12,
	right:10
});

switcher.addEventListener('change', function(e) {
	if (Ti.App.Properties.getString('email')) {
		Ti.App.Properties.setBool('newsletter', e.value);
		saveRemote(Ti.App.Properties.getString('email'), e.value);
	} else {
		if (e.value) {
			var alert = Ti.UI.createAlertDialog({
				title:L('Errore'),
				message:L('Devi introdurre un indirizzo mail'),
				ok:'Ok'
			});
			alert.show();
			switcher.value = false;
		}
	}
});

self.add(view3);
view3.add(label5);

var timeOut = setTimeout(view3.add(switcher), 500);
clearTimeout(timeOut);
/*
 * Recibir newsletter
 */

/*
 * Recibir notificaciones
 */
var view4 = Ti.UI.createView({
	//top:158,
	top:1,
	backgroundColor:'#FFF',
	height:50,
	width:'97%'
});

var label6 = Ti.UI.createLabel({
	text:L('Ricevi Notifiche?'),
	color:'#000',
	top:12,
	left:10
});

if (Ti.App.Properties.getBool('receiveNotifications')) {
	var notifications = Ti.App.Properties.getBool('receiveNotifications');
} else {
	var notifications = false;
}

var switcher2 = Ti.UI.createSwitch({
	value:notifications,
	top:12,
	right:10
});

switcher2.addEventListener('change', function(e) {
	if (Ti.App.Properties.getString('formattedDate')) {
		Ti.App.Properties.setBool('receiveNotifications', e.value);
		if (e.value) {
			if (Ti.Platform.osname == 'android') {
				/*
				Ti.App.Properties.setInt('notificationCount', 0);
				var fecha = new Date();
				Ti.API.info('---------------llamo----------------- ' + fecha);
				var intent = Ti.Android.createServiceIntent({
					url:'notification.js'
				});
				//Ti.Android.stopService(intent); // Lo paro antes de volver a arrancarlo
				var now = new Date().getTime();
				var date = new Date(2012, 03, 25, 15, 33, 01).getTime();
				var newDate = date - now;
				var newDate = 10000;
				
				intent.putExtra('interval', newDate);
				intent.putExtra('message', 'this is message'); // Pasando parámetros
				Ti.Android.startService(intent);
				*/
			} else {
				/*
				Esto no termina de funcionar
				var newDate = new Date(2012, 03, 25, 17, 20, 01);
				newDate = new Date(new Date().getTime() + 5000); // 7 * 24 * 60 * 60 * 1000);
				Ti.App.iOS.scheduleLocalNotification({
					alertBody:L('Semana actual de tu embarazo'),
					alertAction:L('Ver semana'),
					date:newDate,
					//repeat:'daily' // weekly
				});
				*/
				/*
				 * Esto lo pondré cuando se guarde la fecha
				 * var service = Ti.App.iOS.registerBackgroundService({url:'bg-service.js'})
				 */
			}
		} else {
			if (Ti.Platform.osname == 'android') {
				var intent = Ti.Android.createServiceIntent({
					url:'notification.js'
				});
				Ti.Android.stopService(intent);
			} else {
				// no lo he puesto dentro del bg-service
			}
		}
	} else {
		if (e.value) {
			var alert = Ti.UI.createAlertDialog({
				title:L('Errore'),
				message:L('Devi introdurre una data di parto'),
				ok:'Ok'
			});
			alert.show();
			switcher2.value = false;
		}
	}
});

self.add(view4);
view4.add(label6);

var timeOut2 = setTimeout(view4.add(switcher2), 500);
clearTimeout(timeOut2);
/*
 * fin recibir notificaciones
 */

/*
 * Botón de borrar
 */
var deleteDataButton = Ti.UI.createButton({
	title:L('Eliminare tutti i dati'),
	top:50,
	cancel:0,
	width:200
});

deleteDataButton.addEventListener('click', function() {
	var confirm = Ti.UI.createAlertDialog({
		buttonNames: [L('Sì'),L('No')],
		cancel:1,
		title:L('Conferma'),
		message:L('Sei sicura di voler eliminare tutto?')
	});
	confirm.show();
	confirm.addEventListener('click', function(e) {
		if (e.index === e.cancel || e.cancel === true) { // Comparador iOS y Android
			return;
		}
		saveRemote(Ti.App.Properties.getString('email'), false);
		Ti.App.Properties.setString('email', null);
		setDate(null);
		Ti.App.Properties.setBool('newsletter', false);
		Ti.App.Properties.setBool('receiveNotifications', false);
		label2.text = L('[Vai]');
		label4.text = L('[Vai]');
		default_email = L('[Vai]');
		switcher.value = false;
		switcher2.value = false;
	});
});

self.add(deleteDataButton);
/*
 * Fin botón de borrar
 */


if (Ti.Platform.osname == 'android') {
	view.height = view2.height =  view3.height = view4.height = 70;
	//view2.top = 76;
	//view3.top = 147;
	//view4.top = 218;
	label1.top = label2.top = label3.top = label4.top = label5.top = label6.top = 20;
	switcher.top = switcher2.top = 5;
	deleteDataButton.width = 250;
}

function transformDate(currentDate) {
	var day = currentDate.getDate().toString();
	var month = currentDate.getMonth() + 1;
	month = month.toString();
	var year = currentDate.getFullYear().toString();
	
	if (day.length < 2) {
		day = '0' + day;
	}
	if (month.length < 2) {
		month = '0' + month;
	}
	helpDate = year + '-' + month + '-' + day;
	return helpDate;
}

function setDate(date) {
	Ti.App.Properties.setString('formattedDate', date);
	//Ti.App.iOS.registerBackgroundService({url:'bg-service.js'});
}

function saveRemote(email, active) {
	var url = 'http://www.lagravidanza.net/email.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.info('email guardado');
		},
		onerror: function(e) {
			Ti.API.info('error guardando el email');
		},
		timeout: 5000
	});
	client.open('POST', url);
	client.send({_save_email:email,_save_active:active});
}
