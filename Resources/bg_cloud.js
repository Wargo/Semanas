var Cloud 			= require('ti.cloud');
//var trace 			= Ti.API.info;
var user_device_token 	= Ti.App.Properties.getString("device_token",null);

//getDeviceToken();
//registerUser();
//login();
//subscribeToServerPush();

//REGISTER USER ON CLOUD
function registerUser(){
	//trace("REGISTER");
	Cloud.Users.create({
	    username: "new_username_" + Ti.Platform.name, //_" + Math.floor((Math.random() * 100) + 1),
	    password: "new_password",
	    password_confirmation: "new_password",
	    first_name: "Firstname",
	    last_name: "Lastname"
	}, function (e) {
	    if (e.success) {
	    	//alert("USER CREATED SUCCESSFULLY.");
			// user created successfully
	    } else {
	        // oops, something went wrong
	       //alert("USER not created. something went wrong "+e);
	    }
	    login();
	});
}

//LOGIN TO CLOUD AS A USER THAT WE CREATED BEFORE
function login(){
	Cloud.Users.login({
	    login: 'new_username_' + Ti.Platform.name,
	    password: 'new_password'
	}, function (e) {
	    if (e.success) {
	        var user = e.users[0];
	        Ti.App.Properties.setString("user",user)
	        //alert(e);
	        /*
	        alert('Success:\\n' +
	            'id: ' + user.id + '\\n' +
	            'first name: ' + user.first_name + '\\n' +
	            'last name: ' + user.last_name);
	        */
	    } else {
	        //alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	    subscribeToServerPush();
	});
}
//REGISTER LOCAL PUSH NOTIFICATION HERE
function getDeviceToken(tabs){
	if (Ti.Platform.osname == 'android') {
		var CloudPush = require('ti.cloudpush');
		CloudPush.retrieveDeviceToken({
	        success: function deviceTokenSuccess(e) {
	            user_device_token = e.deviceToken;
		        Ti.App.Properties.setString("device_token",user_device_token);
		        //alert(e);
		        registerUser();
	        },
	        error: function deviceTokenError(e) {
	        	alert(e);
	        }
	    });
	    CloudPush.addEventListener('callback', function (evt) {
	        alert(evt.payload);
	        alert('callback');
	    });
	    CloudPush.addEventListener('trayClickLaunchedApp', function (evt) {
	        Ti.API.info('Tray Click Launched App (app was not running)');
	    });
	    CloudPush.addEventListener('trayClickFocusedApp', function (evt) {
	        Ti.API.info('Tray Click Focused App (app was already running)');
	    });
	} else {
		Titanium.Network.registerForPushNotifications({
		    types: [
		        Titanium.Network.NOTIFICATION_TYPE_BADGE,
		        Titanium.Network.NOTIFICATION_TYPE_ALERT,
		        Titanium.Network.NOTIFICATION_TYPE_SOUND
		    ],
		    success:function(e) {
		        user_device_token = e.deviceToken;
		        Ti.App.Properties.setString("device_token",user_device_token);
		        alert(user_device_token);
				//alert("Device token received "+user_device_token);
				registerUser();
		    },
		    error:function(e) {
		        //alert("Error during registration: "+e.error);
		    },
		    callback:function(e) {
		        // called when a push notification is received.
		        //alert("Received a push notification\n\nPayload:\n\n"+JSON.stringify(e.data));
				Ti.UI.iPhone.appBadge = 0;
				
		        tabs.setActiveTab(0);
		        /*
	            if (Ti.App.Properties.getString('formattedDate')) {
					goTo();
				}
				*/
		    }
		});
	}
}
//alert(Ti.UI.iPhone.appBadge);

//REGISTER SERVER PUSH 
function subscribeToServerPush(){
	Cloud.PushNotifications.subscribe({
    	channel: 'friend_request',
    	type: Ti.Platform.name === 'android' ? 'android' : 'ios',
    	device_token: user_device_token
	}, function (e) {
	    if (e.success) {
	        //alert('Success'+((e.error && e.message) || JSON.stringify(e)));
	    } else {
	        //alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}


