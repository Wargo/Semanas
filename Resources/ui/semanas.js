Ti.include('/lang.js');

var self = Titanium.UI.currentWindow;

if (Ti.Platform.osname == 'android') {
	var intent = Ti.Android.createIntent({
		action:Ti.Android.ACTION_MAIN,
		//data:'pruebas',
		//url:'app.js',
		packageName:Ti.App.id,
		category:Ti.Android.CATEGORY_LAUNCHER
	});
	var pending = Ti.Android.createPendingIntent({
		activity:Ti.Android.currentActivity,
		intent:intent,
		type:Ti.Android.PENDING_INTENT_FOR_ACTIVITY,
		flags:Ti.Android.FLAG_UPDATE_CURRENT
	});
	var notification = Ti.Android.createNotification({
		icon:0x7f020000,
		contentTitle:'Nueva Semana',
		contentText:'bla bla bla blu blu blu',
		tickerText:L('Nueva notificación...'),
		contentIntent:pending,
		//when: new Date().getTime()// + 120000,
		//when: 0, // Para que no salga la fecha en la notificación
	});
	
	Ti.Android.NotificationManager.notify(1, notification);
} else {
	var d = new Date(new Date().getTime() + 15000);
	
	var notification = Ti.App.iOS.scheduleLocalNotification({
		alertBody:L('Semana actual de tu embarazo'),
		alertAction:L('Ver Semana'),
		//userInfo:{'key':'value'},
		date:d,
		//repeat:'weekly'
	});
}

var readFile = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'data.js');
var local_data = readFile.read();
data = eval(local_data.text);

data = [];
var cont = 1;
for (var i = 1; i <= 42; i++) {
	//for (var j = 1; j <= Math.random() * 10 + 1; j ++) {
	for (var j = 1; j <= 2; j ++) {
		item = {
			title:'Título ' + cont,
			intro:'Una donna celiaca come deve comportarsi in gravidanza? Una donna celiaca come deve comportarsi in gravidanza? Una donna celiaca come deve comportarsi in gravidanza?',
			url:'data/articulo' + j + '.html',
			hasChild:true,
			leftImage:'data/images/prueba.png',
		}
		if (j == 1) {
			item.header = 'Semana ' + i;
		}
		cont ++;
		data.push(item);
	}
}

tableData = [];
index = 0;
for (i in data) {
	var row = Ti.UI.createTableViewRow({
		height:90,
		link:data[i].url
	});
	var title = Ti.UI.createLabel({
		text:data[i].title,
		font:{fontSize:24},
		color:'#257CBC',
		top:3,
		height:35,
		left:'5%',
		width:'90%'
	});
	var intro = Ti.UI.createLabel({
		text:data[i].intro,
		font:{fontSize:18},
		color:'#333',
		top:35,
		left:'5%',
		height:45,
		width:'90%'
	});

	if (Ti.Platform.osname != 'android') {
		title.left = 60;
		title.top = 6;
		title.font = {fontSize:18};
		intro.font = {fontSize:14};
		intro.left = 60;
		if (Ti.Platform.osname == 'iphone') {
			title.width = 230;
			intro.width = 230;
		}
	}
	
	if (data[i].header) {
		row.header = data[i].header;
		index ++;
		row.index = index;
	} else {
		row.index = null;
	}
	
	row.add(title);
	row.add(intro);
	row.hasChild = data[i].hasChild;
	row.leftImage = data[i].leftImage;
	//row.header = header;
	tableData.push(row);
}

var tableView = Ti.UI.createTableView({
	//data:data,
	data:tableData,
	separatorColor:'#429BDA',
	borderWidth:1
});

self.add(tableView);

tableView.addEventListener('click', function(e) {
	var webview = Ti.UI.createWebView({
		url:e.rowData.link
	});
	var win = Ti.UI.createWindow();
	win.add(webview);
	Ti.UI.currentTab.open(win);
	Ti.App.addEventListener('printStyles', function(e) {
		/*
		var	script = 'var styles = document.createElement(\'link\');';
		script += 'styles.setAttribute(\'rel\', \'stylesheet\');';
		script += 'styles.setAttribute(\'type\', \'text/css\');';
		if (Ti.Platform.osname == 'android') {
			script += 'styles.setAttribute(\'href\', \'styles_android.css\');';
		} else {
			script += 'styles.setAttribute(\'href\', \'styles_ios.css\');';
		}
		script += 'document.getElementsByTagName("head")[0].appendChild(styles);';
		webview.evalJS(script);
		
		var script2 = 'var prueba = document.createElement(\'div\');';
		script2 += 'prueba.innerHTML = \'hola a todos\';';
		script2 += 'document.getElementsByTagName("body")[0].appendChild(prueba);';
		webview.evalJS(script2);
		*/
		var styles = '';
		if (Ti.Platform.osname == 'android') {
			styles = 'styles_android.css';
		} else {
			styles = 'styles_ios.css';
		}
		
		webview.evalJS('showCss("' + styles + '");');
	});
});

var todayButton = Ti.UI.createButton({
	title:L('Hoy'),
	style:Ti.UI.iPhone.SystemButton.SAVE
});

if (Ti.Platform.osname == 'android') {
	var todayButton = Ti.UI.createView({
		backgroundColor:'#000',
		opacity:0.8,
		bottom:0,
		width:'100%',
		height:60,
	})
	var text = Ti.UI.createLabel({
		text:L('Acceder a la semana actual'),
		color:'#FFF'
	})
	todayButton.add(text);
	self.add(todayButton);
} else {
	self.rightNavButton = todayButton;
}

todayButton.addEventListener('click', function() {
	if (Ti.App.Properties.getString('formattedDate')) {
		goTo();
	} else {
		alert(L('Necesitas introducir tu fecha de parto'));
	}
});

if (Ti.App.Properties.getString('formattedDate')) {
	goTo();
}

function goTo() {
	var today = new Date();
	var date = Ti.App.Properties.getString('formattedDate');
	date = date.split('-');
	date = new Date(date[0], date[1] - 1, date[2]);
	var diff = date.getTime() - today.getTime();
	var week = 40 - Math.round(diff/(1000 * 60 * 60 * 24 * 7));
	
	if (Ti.Platform.osname == 'android') {
		tableView.scrollToIndex(getRow(week, data));
	} else {
		tableView.scrollToIndex(getRow(week, data), {
			animated:true,
			position:Ti.UI.iPhone.TableViewScrollPosition.TOP
		});
	}
}

function sleep(milliseconds) {
	var ini = new Date().getTime();
	while ((new Date().getTime() - ini) < milliseconds) {}
}

function getRow(num, data) {
	var cont = 0;
	var aux = 0;
	for (i in data) {
		if (data[i].header) {
			aux ++;
			if (Ti.Platform.osname == 'android') {
				cont ++; // Para que cuente los headers
			}
		}
		if (aux == num) {
			if (Ti.Platform.osname == 'android') {
				cont = cont - 1; // Para que muestre el header
			}
			return cont;
		}
		cont ++;
	}
}
