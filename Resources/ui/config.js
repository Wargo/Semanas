Ti.include('/lang.js');

var self = Titanium.UI.currentWindow;

self.backgroundColor = '#429BDA';
self.backgroundImage = '/images/bg.jpg'

var view = Ti.UI.createView({
	top:5,
	backgroundColor:'#FFF',
	height:50,
	width:'97%'
});

var label1 = Ti.UI.createLabel({
	text:L('Fecha de parto'),
	color:'#000',
	top:12,
	left:10
});

var label2 = Ti.UI.createLabel({
	text:'[Seleccionar]',
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
	
	var dialog = Ti.UI.createView({
		backgroundColor:'#000',
		opacity:0.8,
		height:'100%',
		width:'100%'
	});
	
	self.add(dialog);
	
	var doneButton = Ti.UI.createButton({
		title:L('Guardar'),
		style:Ti.UI.iPhone.SystemButton.SAVE,
		left:'15%',
		width:'30%',
		top: '50%',
		zIndex:999
	});
	
	var cancelButton = Ti.UI.createButton({
		title:L('Cancelar'),
		right:'15%',
		width:'30%',
		top: '50%',
		zIndex:999
	});
	
	doneButton.addEventListener('click', function(e){
		self.rightNavButton = null;
		self.remove(dialog);
		self.remove(datePicker);
		
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
		title:L('¿No conoces tu fecha de parto?'),
		width:'80%',
		height:40,
		top:20,
		zIndex:999
	});
	
	helpButton.addEventListener('click', function() {
		var helpWindow = Ti.UI.createWindow({
			title:L('Fecha de parto'),
			backgroundColor:'#FFF'
		});
		var helpText = Ti.UI.createLabel({
			text:L('Para obtener tu fecha de parto, escribe aquí la fecha de tu última regla'),
			top:10,
			left:10,
			right:10
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
		
		helpWindow.add(helpText);
		helpWindow.add(helpPicker);
		Ti.UI.currentTab.open(helpWindow);
		
		helpDoneButton.addEventListener('click', function() {
			var helpCurrentDate = helpDate.split('-');
			helpCurrentDate = new Date(helpCurrentDate[0], helpCurrentDate[1] - (-8), helpCurrentDate[2] - (-14));
			
			formattedDate = transformDate(helpCurrentDate);
			setDate(formattedDate);
			//Ti.App.Properties.setString('formattedDate', formattedDate);
			datePicker.value = helpCurrentDate;  // Esto no va en Android
			
			if (Ti.Platform.osname == 'android') {
				self.remove(dialog);
				
				showDate = formattedDate.split('-');
				label2.text = showDate[2] + '/' + showDate[1] + '/' + showDate[0];
			}
			helpWindow.close();
		});
	});
	
	dialog.add(helpButton);
	
	if (Ti.Platform.osname == 'android') {
		helpButton.bottom = 20;
		helpButton.height = 50;
		helpButton.top = null;
		dialog.add(doneButton);
		dialog.add(cancelButton);
		dialog.add(datePicker);
		self.add(dialog);
		datePicker.top = '10%';
	} else {
		self.rightNavButton = doneButton;
		self.add(datePicker);
	}
});

if (Ti.App.Properties.getString('email')) {
	var currentEmail = Ti.App.Properties.getString('email');
	var default_email = null;
} else {
	var currentEmail = L('[Seleccionar]');
	var default_email = currentEmail;
}

var view2 = Ti.UI.createView({
	top:56,
	backgroundColor:'#FFF',
	height:50,
	width:'97%'
});

var label3 = Ti.UI.createLabel({
	text:L('Email'),
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
	var dialog2 = Ti.UI.createView({
		backgroundColor:'#000',
		opacity:0.8,
		height:'100%',
		width:'100%'
	})
	self.add(dialog2);
			
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
		title:L('Guardar'),
		left:'15%',
		width:'30%',
		top:'40%'
	});
	var cancelButton2 = Ti.UI.createButton({
		title:L('Cancelar'),
		right:'15%',
		width:'30%',
		top:'40%'
	});
	
	doneButton2.addEventListener('click', function(e) {
		Ti.App.Properties.setString('email', textField.value);
		if (textField.value) {
			label4.text = textField.value;
		} else {
			label4.text = L('[Seleccionar]');
		}
		textField.blur();
		self.remove(dialog2);
		default_email = null;
	});	
	cancelButton2.addEventListener('click', function(e) {
		textField.blur();
		self.remove(dialog2);
	});

	dialog2.add(doneButton2);
	dialog2.add(cancelButton2);
});

var view3 = Ti.UI.createView({
	top:107,
	backgroundColor:'#FFF',
	height:50,
	width:'97%'
});

var label5 = Ti.UI.createLabel({
	text:L('¿Recibir Newsletter?'),
	color:'#000',
	top:12,
	left:10
});
		
if (Ti.App.Properties.getString('newsletter')) {
	var newsletter = Ti.App.Properties.getString('newsletter');
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
		Ti.App.Properties.setString('newsletter', e.value);
	} else {
		if (e.value) {
			alert(L('Debes introducir un email real'));
			switcher.value = false;
		}
	}
});

self.add(view3);
view3.add(label5);

var timeOut = setTimeout(view3.add(switcher), 500);
clearTimeout(timeOut);

var deleteDataButton = Ti.UI.createButton({
	title:L('Borrar todos los datos'),
	bottom:30,
	cancel:0,
	width:200
});

deleteDataButton.addEventListener('click', function() {
	var confirm = Ti.UI.createAlertDialog({
		buttonNames: [L('Cancelar'),L('Aceptar')],
		cancel:0,
		title:L('¿Seguro?')
	});
	confirm.show();
	confirm.addEventListener('click', function(e) {
		if (e.index === e.cancel || e.cancel === true) {
			return;
		}
		Ti.App.Properties.setString('email', null);
		setDate(null);
		Ti.App.Properties.setString('newsletter', null);
		label2.text = L('[Seleccionar]');
		label4.text = L('[Seleccionar]');
		default_email = L('[Seleccionar]');
		switcher.value = false;
	});
});

self.add(deleteDataButton);


if (Ti.Platform.osname == 'android') {
	view.height = view2.height =  view3.height = 70;
	view2.top = 76;
	view3.top = 147;
	label1.top = label2.top = label3.top = label4.top = label5.top = 20;
	switcher.top = 5;
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
	
	if (date) {
		var newDate = new Date(new Date().getTime + 24 * 60 * 60 * 1000); // 7 *
		var notification = Ti.App.iOS.scheduleLocalNotification({
			alertBody:L('Semana actual de tu embarazo'),
			alertAction:L('Ver semana'),
			date:newDate,
			repeat:'daily' // weekly
		});
	}

}
