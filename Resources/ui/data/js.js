Titanium.App.fireEvent('printStyles');

function showCss(css) {
	var styles = document.createElement('link');
	styles.setAttribute('rel', 'stylesheet');
	styles.setAttribute('type', 'text/css');
	styles.setAttribute('href', css);
	document.getElementsByTagName("head")[0].appendChild(styles);
}

function ipad() {
	var imgs = document.getElementsByTagName('img');
	for (var i = 0; i < imgs.length; i++) {
		var img = document.getElementsByTagName('img').item(i);
		img.width = img.width * 2.5;
		img.height = img.height * 2.5;
	}
}

function changeLinks() {
	var links = document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		var link = document.getElementsByTagName('a').item(i);
		link.setAttribute('onclick', "Ti.App.fireEvent('openURL', { url: '" + link.href + "'}); return false;");
	}
}