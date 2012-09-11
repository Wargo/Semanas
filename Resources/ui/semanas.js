Ti.include('/lang.js');

var self = Titanium.UI.currentWindow;
//self.barImage = '/images/bg.jpg';

//var readFile = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'data.js');
//var readFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'data.js');
//var local_data = readFile.read();

//data = eval(local_data.text);

Ti.include('/data.js');

/*
data = [];
var cont = 1;
for (var i = 1; i <= 42; i++) {
	//for (var j = 1; j <= Math.random() * 10 + 1; j ++) {
	for (var j = 1; j <= 3; j ++) {
		exampleImage = ['bebe.gif', 'general.gif', 'mama.gif'];
		item = {
			title:'Título ' + cont,
			intro:'Una donna celiaca come deve comportarsi in gravidanza? Una donna celiaca come deve comportarsi in gravidanza? Una donna celiaca come deve comportarsi in gravidanza?',
			url:'data/articulo' + j + '.html',
			hasChild:true,
			leftImage:'data/images/' + exampleImage[j - 1],
		}
		if (j == 1) {
			item.header = 'Semana ' + i;
		}
		cont ++;
		data.push(item);
	}
}
*/

tableData = [];
index = 0;
for (i in data) {
	var row = Ti.UI.createTableViewRow({
		backgroundColor:'#FFF',
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
		intro.left = title.left = 70;
		title.top = 6;
		title.font = {fontSize:18};
		intro.font = {fontSize:14};
		if (Ti.Platform.osname == 'iphone') {
			title.width = 230;
			intro.width = 230;
		}
		if (Ti.Platform.osname == 'ipad') {
			title.font = {fontSize:28};
			intro.font = {fontSize:20};
			row.height = 110;
			intro.height = 60;
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
	var current = e.index;
	open_window(current, data, false);
});
	
var root = Ti.UI.createWindow();

function open_window (current, data, self) {
	var win = Ti.UI.createWindow({
		url:'article.js',
		//url:'article_web.js',
		backgroundColor:'#FFF',
		barColor:'#257CBC',
		backButtonTitle:L('Settimani')
	});
	win.bbdd = data[current].url;
	win.myTitle = data[current].title;

	var settimana = Math.ceil((current + 1) / 3); // TODO ese número 3 es dinámico, artículos por semana
	//win.title = 'Sett. ' + settimana + ': ' + data[current].title;
	win.title = 'Settimana ' + settimana;
	
	var paging = Ti.UI.createButtonBar({
		//style:Ti.UI.iPhone.SystemButtonStyle.BAR,
		backgroundColor:'#257CBC',
		//style:2,
		labels:[{title:' < ', enabled:true}, {title:' > ', enabled:true}]
	});
	win.rightNavButton = paging;
	
	/*
	var back = Ti.UI.createButton({
		title:'Semanas'
	})
	win.leftNavButton = back;
	
	back.addEventListener('click', function(e) {
		win.close();
	});
	*/
	
	paging.addEventListener('click', function(e) {
		if (e.index === 1) { // next
			open_window(current + 1, data, win);
		} else if(e.index === 0) { // back
			open_window(current - 1, data, win);
		}
	});
	
	//win.add(webview);
	
	/*
	var nav = Ti.UI.iPhone.createNavigationGroup({
		window:win
	});
	
	win.nav = nav;
	root.add(nav);
	
	var back = Ti.UI.createButton({title:L('Settimani')});
	win.leftNavButton = back;
	back.addEventListener('click', function() {
		root.close();
	})
	*/
	
	if (false)
	if (self) {
		//root.open(win, {animated:true});
		win.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
	} else {
		root.open();
	}
	
	
	if (self) {
		/*
		setTimeout(function() {
			//self.close();
			Ti.UI.currentTab.close(self, {animated: false});
		}, 300);
		*/
		
		var disappear = Ti.UI.createAnimation({
			//top:400,
			opacity:0,
			//transition: Ti.UI.iPhone.AnimationStyle.CURL_UP,
			//transform: win,
			duration:200
		});
		self.animate(disappear);
		disappear.addEventListener('complete', function() {
			win.opacity = 0;
			Ti.UI.currentTab.open(win, {animated: false});
			var appear = Ti.UI.createAnimation({
				opacity:1,
				duration:400
			});
			win.animate(appear);
			appear.addEventListener('complete', function() {
				Ti.UI.currentTab.close(self, {animated: false});
			})
		});
	} else {
		Ti.UI.currentTab.open(win, {
			//animation: Ti.UI.iPhone.AnimationStyle.CURL_UP
			animated: true
		})
	}
	
	setTimeout(function() {
		if (current <= 0) {
			paging.labels = [{title:' < ', enabled:false}, {title:' > ', enabled:true}];
		} else if (current >= 119) { // TODO ese número es dinámico (total de artículos)
			paging.labels = [{title:' < ', enabled:true}, {title:' > ', enabled:false}];
		}
	}, 500);
};

var todayButton = Ti.UI.createButton({
	title:L('Oggi'),
	style:Ti.UI.iPhone.SystemButton.SAVE
});

if (Ti.Platform.osname == 'android') {
	var todayButton = Ti.UI.createView({
		backgroundColor:'#000',
		opacity:0.8,
		bottom:0,
		width:'100%',
		height:60,
	});
	var text = Ti.UI.createLabel({
		text:L('Vai alla tua settimana'),
		color:'#FFF'
	});
	todayButton.add(text);
	self.add(todayButton);
} else {
	self.rightNavButton = todayButton;
}

todayButton.addEventListener('click', function() {
	if (Ti.App.Properties.getString('formattedDate')) {
		goTo();
	} else {
		var alert = Ti.UI.createAlertDialog({
			title:L('Errore'),
			message:L('Devi introdurre una data di parto'),
			ok:'Ok'
		});
		alert.show();
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
	
	if (getRow(week, data)) {
		if (Ti.Platform.osname == 'android') {
			tableView.scrollToIndex(getRow(week, data));
		} else {
			tableView.scrollToIndex(getRow(week, data), {
				animated:true,
				position:Ti.UI.iPhone.TableViewScrollPosition.TOP
			});
		}
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
