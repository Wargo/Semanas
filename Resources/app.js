/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.  
 * A starting point for tab-based application with multiple top-level windows. 
 * Requires Titanium Mobile SDK 1.8.0+.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

/*

var senderId = 'wargo0@gmail.com';
 
var c2dm = require('com.findlaw.titanium.c2dm');
Ti.API.info("module is => " + c2dm);
 
Ti.API.info('Registering...');
c2dm.register(senderId, {
    success:function(e) {
        Ti.API.info('JS registration success event: ' + e.registrationId);
        // send the registration is to your server
    },
    error:function(e) {
        Ti.API.error("Error during registration: "+e.error);
 
        var message;
        if(e.error == "ACCOUNT_MISSING") {
            message = "No Google account found; you'll need to add one (in Settings/Accounts) in order to activate notifications";
        } else {
            message = "Error during registration: "+e.error
        }
 
        Titanium.UI.createAlertDialog({
            title: 'Push Notification Setup',
            message: message,
            buttonNames: ['OK']
        }).show();
    },
    callback:function(e) // called when a push notification is received
    {
        Ti.API.info('JS message event: ' + JSON.stringify(e.data));
 
        var intent = Ti.Android.createIntent({
            action: Ti.Android.ACTION_MAIN,
            flags: Ti.Android.FLAG_ACTIVITY_NEW_TASK | Ti.Android.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED,
            className: 'com.artvisual.semanas.SemanasActivity',
            packageName: 'com.artvisual.semanas'
        });
        intent.addCategory(Ti.Android.CATEGORY_LAUNCHER);
 
        // This is fairly static: Not much need to be altered here
        var pending = Ti.Android.createPendingIntent({
            activity: Ti.Android.currentActivity,
            intent: intent,
            type: Ti.Android.PENDING_INTENT_FOR_ACTIVITY,
        });
 
        var notification = Ti.Android.createNotification({
            contentIntent: pending,
            contentTitle: 'New message',
            contentText: e.data.message,
            tickerText: "New message"
        });
 
        Ti.Android.NotificationManager.notify(1, notification);
    }
});


*/


/*
var Cloud = require('ti.cloud');
Cloud.debug = true;  // optional; if you add this line, set it to false for production

// example assumes you have a set of text fields named username, password, etc.
Cloud.Users.create({
    username: 'ana',
    password: 'password',
    password_confirmation: 'password',
    first_name: 'nombre',
    last_name: 'appellido'
}, function (e) {
    if (e.success) {
		// user created successfully
		Ti.API.info('usuario creado');
    } else {
        // oops, something went wrong
		Ti.API.info('usuario no creado');
    }
});

var deviceToken;
if (Ti.Platform.osname == 'android') {
	var CloudPush = require('ti.cloudpush');
	CloudPush.retrieveDeviceToken({
	    success: function deviceTokenSuccess(e) {
	        //alert('Device Token: ' + e.deviceToken);
	        deviceToken = e.deviceToken;
	    },
	    error: function deviceTokenError(e) {
	        //alert('Failed to register for push! ' + e.error);
	    }
	});
} else {
	Titanium.Network.registerForPushNotifications({
		types: [
			Titanium.Network.NOTIFICATION_TYPE_BADGE,
			Titanium.Network.NOTIFICATION_TYPE_ALERT,
			Titanium.Network.NOTIFICATION_TYPE_SOUND
		],
		success:function(e) {
			deviceToken = e.deviceToken;
			alert("Device token received " + deviceToken);
		},
		error:function(e) {
			alert("Error during registration: " + e.error);
		},
		callback:function(e) {
			// called when a push notification is received.
			alert("Received a push notification\n\nPayload:\n\n" + JSON.stringify(e.data));
		}
	});
}

Cloud.PushNotifications.subscribe({
    channel: 'canal',
    device_token: deviceToken, //'f7702d77b34ed94869f664e7a297ccc173bec93a2b815css6asd28461a0358db',
    type: Ti.Platform.name === 'iPhone OS' ? 'ios' : Ti.Platform.name
}, function (e) {
    if (e.success) {
        channel.value = '';
        alert('Subscribed!');
    } else {
        error(e);
    }
});


/*

var sdk = new Cocoafish('wa6CTq2dirU7BBniGd7EjrruB6vakw8I');  // app key
var data = {
	type: 'ios',
	channel: 'friend_request',
	device_token: 'f7702d77b34ed94869f664e7a297ccc173bec93a2b815css6asd28461a0358db'
};
sdk.sendRequest('https://api.cloud.appcelerator.com/v1/push_notification/subscribe.json', 'POST', data, callback);

//SDK Callback:

function callback(data) {
  if(data) {
    if(data.meta) {
      var meta = data.meta;
      if(meta.status == 'ok' 
		&& meta.code == 200 
		&& meta.method_name == 'SubscribeNotification') {
			alert('hola?');
      }
    }
  }
}
*/

//bootstrap and check dependencies

if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}
else if (Ti.Platform.osname === 'mobileweb') {
	alert('Mobile web is not yet supported by this template');
}
else {
	//require and open top level UI component
	var AppTabGroup = require('ui/AppTabGroup');
	new AppTabGroup().open();
}