Titanium.App.fireEvent('printStyles');
function showCss(css) {
	var styles = document.createElement('link');
	styles.setAttribute('rel', 'stylesheet');
	styles.setAttribute('type', 'text/css');
	styles.setAttribute('href', css);
	document.getElementsByTagName("head")[0].appendChild(styles);
}