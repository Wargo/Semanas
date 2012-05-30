var Cloud 			= require('ti.cloud');
var trace 			= Ti.API.info;
var user_device_token 	= Ti.App.Properties.getString("device_token",null);



var win = Titanium.UI.createWindow({  
    title:'TestPush iOS App',
    backgroundColor:'#fff'
});
win.open();

function init(){
	buildUI();

}
setTimeout(init,500);

function buildUI(){
	var register_local_push = Ti.UI.createButton({
		width:200,
		height:30,
		top:30,
		title:"REGISTER LOCAL PUSH"
	});
	win.add(register_local_push);
	register_local_push.addEventListener('click',getDeviceToken);
	var register_user_btn = Ti.UI.createButton({
		width:200,
		height:30,
		top:70,
		title:"REGISTER USER"
	});
	win.add(register_user_btn);
	register_user_btn.addEventListener('click',registerUser);
	var login_btn = Ti.UI.createButton({
		width:200,
		height:30,
		top:110,
		title:"LOGIN"
	});
	win.add(login_btn);
	login_btn.addEventListener('click',login);
	var register_server_push_btn = Ti.UI.createButton({
		width:200,
		height:30,
		top:150,
		title:"REGISTER SERVER PUSH"
	});
	win.add(register_server_push_btn);
	register_server_push_btn.addEventListener('click',subscribeToServerPush);
}

//REGISTER USER ON CLOUD
function registerUser(){
	trace("REGISTER");
	Cloud.Users.create({
	    username: "new_username",
	    password: "new_password",
	    password_confirmation: "new_password",
	    first_name: "Firstname",
	    last_name: "Lastname"
	}, function (e) {
	    if (e.success) {
	    	alert("USER CREATED SUCCESSFULLY.");
			// user created successfully
	    } else {
	        // oops, something went wrong
	       alert("USER not created. something went wrong "+e);
	    }
	});
}

//LOGIN TO CLOUD AS A USER THAT WE CREATED BEFORE
function login(){
	Cloud.Users.login({
	    login: 'new_username',
	    password: 'new_password'
		}, function (e) {
	    if (e.success) {
	        var user = e.users[0];
	        alert('Success:\\n' +
	            'id: ' + user.id + '\\n' +
	            'first name: ' + user.first_name + '\\n' +
	            'last name: ' + user.last_name);
	    } else {
	        alert('Error:\\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}
//REGISTER LOCAL PUSH NOTIFICATION HERE
function getDeviceToken(){
	trace("REGISTERING LOCAL PUSH");
	Titanium.Network.registerForPushNotifications({
	    types: [
	        Titanium.Network.NOTIFICATION_TYPE_BADGE,
	        Titanium.Network.NOTIFICATION_TYPE_ALERT,
	        Titanium.Network.NOTIFICATION_TYPE_SOUND
	    ],
	    success:function(e)
	    {
	        user_device_token = e.deviceToken;
	        Ti.App.Properties.setString("device_token",user_device_token);
			alert("Device token received "+user_device_token);
	    },
	    error:function(e)
	    {
	        alert("Error during registration: "+e.error);
	    },
	    callback:function(e)
	    {
	        // called when a push notification is received.
	        alert("Received a push notification\n\nPayload:\n\n"+JSON.stringify(e.data));
	    }
	 
	});

}
//REGISTER SERVER PUSH 
function subscribeToServerPush(){
	Cloud.PushNotifications.subscribe({
    	channel: 'friend_request',
    	type:'ios',
    	device_token: user_device_token
		}, function (e) {
	    if (e.success) {
	        alert('Success'+((e.error && e.message) || JSON.stringify(e)));
	    } else {
	        alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}


