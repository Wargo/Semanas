Ti.include('/lang.js');

var self = Titanium.UI.currentWindow;

var readFile = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'data.js');
var local_data = readFile.read();
data = eval(local_data.text);

data = [];
var cont = 0;
for (var i = 1; i <= 42; i++) {
	//for (var j = 1; j <= Math.random() * 10 + 1; j ++) {
	for (var j = 1; j <= 3; j ++) {
		item = {
			title:'titulo ' + cont,
			intro:'Una donna celiaca come deve comportarsi in gravidanza?',
			url:'data/articulo2.html',
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
		title.width = 230;
		intro.font = {fontSize:14};
		intro.width = 230;
		intro.left = 60;
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
});

var todayButton = Ti.UI.createButton({
	title:L('Hoy'),
	style:Ti.UI.iPhone.SystemButton.SAVE
});

self.rightNavButton = todayButton;

todayButton.addEventListener('click', function() {
	if (Ti.App.Properties.getString('formattedDate')) {
		goTo();
	} else {
		alert(L('Necesitas introducir tu fecha de parto'));
	}
});

goTo();

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
				cont ++;
			}
		}
		if (aux == num) {
			if (Ti.Platform.osname == 'android') {
				cont = cont - 1;
			}
			return cont;
		}
		cont ++;
	}
}
