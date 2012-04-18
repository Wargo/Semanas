Ti.include('/lang.js');

var self = Titanium.UI.currentWindow;

var label = Ti.UI.createLabel({
	top:20,
	left:10,
	right:10,
	text:L('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet orci ante, vitae facilisis leo.')
});

var label1 = Ti.UI.createLabel({
	top:150,
	left:10,
	right:10,
	text:L('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet orci ante, vitae facilisis leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet orci ante, vitae facilisis leo.')
});

var textField = Ti.UI.createTextField({
	hintText:L('Introduce tu fecha de parto'),
	borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	top:100,
	width:250,
	height:40,
	left:10
});

if (Ti.App.Properties.getString('formattedDate')) {
	var formattedDate = Ti.App.Properties.getString('formattedDate');
	showDate = formattedDate.split('-');
	textField.value = showDate[2] + '/' + showDate[1] + '/' + showDate[0];
} else {
	var formattedDate = null;
}

textField.addEventListener('focus', function(e) {
	textField.blur();
	if (Ti.Platform.osname != 'android') {
		do_action();
	}
});

textField.addEventListener('click', function(e){ // tiene que ser focus
	if (Ti.Platform.osname == 'android') {
		do_action();
	}
});

function do_action() {
	var minDate = new Date();
	var maxDate = new Date();
	
	minDate.setFullYear(minDate.getFullYear() - 2);
	maxDate.setFullYear(maxDate.getFullYear() + 2);
	
	if (formattedDate) {
		var date = formattedDate.split('-');
		date = new Date(date[0], date[1] - 1, date[2]);
	} else {
		var date = new Date();
	}
	
	var datePicker = Ti.UI.createPicker({
		type:Ti.UI.PICKER_TYPE_DATE,
		bottom:0,
		minDate:minDate,
		maxDate:maxDate,
		value:date
	});
	
	datePicker.selectionIndicator = true;
	
	datePicker.addEventListener('change', function(e) {
		currentDate = e.value;
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
		
		formattedDate = year + '-' + month + '-' + day;
	});
	
	if (Ti.Platform.osname != 'android') {
		var doneButton = Ti.UI.createButton({
			title:L('Ok'),
			style:Ti.UI.iPhone.SystemButton.SAVE
		});
		
		doneButton.addEventListener('click', function(e){
			self.rightNavButton = null;
			self.remove(datePicker);
			Ti.App.Properties.setString('formattedDate', formattedDate);
			if (formattedDate) {
				showDate = formattedDate.split('-');
				textField.value = showDate[2] + '/' + showDate[1] + '/' + showDate[0];
			}
		});
		
		self.rightNavButton = doneButton;
	} else {
		var doneButton = Ti.UI.createButton({
			title:L('Ok'),
			width:50,
			height:40,
			top:100,
			right:10
		});
		
		doneButton.addEventListener('click', function(e) {
			self.remove(datePicker);
			self.remove(doneButton);
			Ti.App.Properties.setString('formattedDate', formattedDate);
			if (formattedDate) {
				showDate = formattedDate.split('-');
				textField.value = showDate[2] + '/' + showDate[1] + '/' + showDate[0];
			}
		});
		
		self.add(doneButton);
	}
	
	self.add(datePicker);
}

var button = Ti.UI.createButton({
	title:L('Borrar fecha'),
	bottom:10,
	height:30,
	width:120
});

button.addEventListener('click', function(){
	textField.value = null;
	formattedDate = null;
	Ti.App.Properties.setString('formattedDate', null);
});

self.add(label);
self.add(label1);
self.add(button);
self.add(textField);
