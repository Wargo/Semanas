Ti.include('/lang.js');

var newsletter = Titanium.UI.currentWindow;

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
});
var label3 = Ti.UI.createLabel({
	text:L('Enhorabuena!\r\nYa estás registrado en la newsletter\r\nTu email es:') + ' ' + Ti.App.Properties.getString('email'),
	height:'auto',
	width:'auto',
	textAlign:'center',
	top:20
});
var button3 = Ti.UI.createButton({
	title:L('Editar'),
	top:100,
	height:'auto',
	width:'auto'
});
var button4 = Ti.UI.createButton({
	title:L('Cancelar'),
	top:130,
	right:60,
	height:'auto',
	width:'auto'
});
var button5 = Ti.UI.createButton({
	title:L('Editar'),
	top:130,
	left:60,
	height:'auto',
	width:'auto'
});

if (email = Ti.App.Properties.getString('email')) {
	newsletter.add(label3);
	newsletter.add(button3);
	newsletter.add(label2);
	newsletter.add(button2);
} else {
	newsletter.add(label);
	newsletter.add(textField);
	newsletter.add(button);
}
button.addEventListener('click', function(e) { // Guardar
	save();
});
button5.addEventListener('click', function(e) { // Editar-Guardar
	save();
});
button2.addEventListener('click', function(e) { // Baja
	Ti.App.Properties.setString('email', null);
	textField.value = null;
	newsletter.remove(label3);
	newsletter.remove(button3);
	newsletter.remove(label2);
	newsletter.remove(button2);
	newsletter.add(label);
	newsletter.add(textField);
	newsletter.add(button);
});
button3.addEventListener('click', function(e) { // Editar
	textField.value = Ti.App.Properties.getString('email');
	newsletter.remove(label3);
	newsletter.remove(button3);
	newsletter.remove(label2);
	newsletter.remove(button2);
	newsletter.add(label);
	newsletter.add(textField);
	newsletter.add(button5);
	newsletter.add(button4);
});
button4.addEventListener('click', function(e) { // Cancelar
	newsletter.add(label3);
	newsletter.add(button3);
	newsletter.add(label2);
	newsletter.add(button2);
	newsletter.remove(label);
	textField.blur();
	newsletter.remove(textField);
	newsletter.remove(button);
	newsletter.remove(button4);
	newsletter.remove(button5);
});

function save() {
	if (!textField.value) {
		alert(L('Debes rellenar el campo'));
	} else{
		Ti.App.Properties.setString('email', textField.value);
		label3.text = L('Enhorabuena!\r\nYa estás registrado en la newsletter\r\nTu email es:') + ' ' + textField.value;
		newsletter.add(label3);
		newsletter.add(button3);
		newsletter.add(label2);
		newsletter.add(button2);
		newsletter.remove(label);
		textField.blur();
		newsletter.remove(textField);
		newsletter.remove(button);
		newsletter.remove(button4);
		newsletter.remove(button5);
	}
}
