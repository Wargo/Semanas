Ti.include('/lang.js');

var self = Titanium.UI.currentWindow;

var label = Ti.UI.createLabel({
	top:20,
	right:10,
	left:10,
	text:L('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet orci ante, vitae facilisis leo. Etiam vehicula porttitor mi in elementum. Sed posuere, dui sit amet pellentesque vestibulum, enim massa ullamcorper justo, vitae viverra turpis nisl a elit. Pellentesque vulputate, sapien et tristique lacinia, dolor neque pretium felis, in sagittis neque sapien ac odio.')
});
self.add(label);

var button = Ti.UI.createButton({
	height:44,
	width:200,
	title:L('Apúntame!'),
	bottom:20
});
self.add(button);

button.addEventListener('click', function() {
	//containingTab attribute must be set by parent tab group on
	//the window for this work
	var newsletter = Ti.UI.createWindow({
		title: L('Datos newsletter'),
		backgroundColor: 'white',
		url:'form.js'
	});
	
	self.containingTab.open(newsletter);
});
