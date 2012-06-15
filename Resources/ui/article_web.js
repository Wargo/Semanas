var win = Ti.UI.currentWindow;
win.backgroundColor = '#429BDA';

var webview = Ti.UI.createWebView({
	url: win.bbdd,
	left:5, right:5, bottom: 5,
	borderRadius:5,
	top:40
});

win.add(webview);

Ti.App.addEventListener('printStyles', function(e) {
	var styles = '';
	if (Ti.Platform.osname == 'android') {
		styles = 'styles_android.css';
	} else if (Ti.Platform.osname == 'ipad') {
		styles = 'styles_ipad.css';
	} else {
		styles = 'styles_ios.css';
	}
	
	if (Ti.Platform.osname == 'ipad') {
		setTimeout(function() {
			webview.evalJS('ipad();');
		}, 100);
	}
	setTimeout(function() {
		webview.evalJS('showCss("' + styles + '");');
	}, 100);
	
	setTimeout(function() {
		webview.evalJS('changeLinks();');
	}, 100);
});

Ti.App.addEventListener('openURL', function(e) {
	Ti.Platform.openURL(e.url);
});

var view = Ti.UI.createView({
	top:0,
	height:40,
	//backgroundColor:'#429BDA'
});

var label = Ti.UI.createLabel({
	text:win.myTitle,
	color:'#FFF'
});

view.add(label);
win.add(view);
