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



//bootstrap and check dependencies

var Cloud = require('ti.cloud');
Cloud.debug = true;

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