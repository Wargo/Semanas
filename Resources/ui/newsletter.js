var self = Titanium.UI.currentWindow;

var button = Ti.UI.createButton({
	height:44,
	width:200,
	title:L('Apúntame!'),
	top:20
});
self.add(button);

button.addEventListener('click', function() {
	//containingTab attribute must be set by parent tab group on
	//the window for this work
	var newsletter = Ti.UI.createWindow({
		title: L('Datos newsletter'),
		backgroundColor: 'white'
	});
	
	var label = Ti.UI.createLabel({
		text:L('Introduce tu email'),
		height:'auto',
		width:'auto',
		top:30
	});
	var textField = Ti.UI.createTextField({
		hintText:'Email',
		height:'auto',
		width:250,
		top:80,
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType:Ti.UI.KEYBOARD_EMAIL
	});
	var button = Ti.UI.createButton({
		title:L('Guardar'),
		top:130,
		height:'auto',
		width:'auto'
	});
	var label2 = Ti.UI.createLabel({
		text:L('Para darte de baja, pincha aquí'),
		height:'auto',
		width:'auto',
		bottom:80
	});
	var button2 = Ti.UI.createButton({
		title:L('Darme de baja'),
		bottom:20,
		height:'auto',
		width:'auto'
		//returnKeyType:Ti.UI.RETURNKEY_GO
	});
	newsletter.add(label);
	newsletter.add(textField);
	newsletter.add(button);
	newsletter.add(label2);
	newsletter.add(button2);
	self.containingTab.open(newsletter);
});