//===============================================
// Example 13.1
// JavaScript source: index.js
//===============================================

var blankStr = '';
var br = '<br />';

var remoteURL = 'http://www.fancxn.com';
//var localURL = 'help.html';

function onBodyLoad() {
  //Let the user know we've launched
  alert("onBodyLoad");
  //Set the Cordova deviceready event listener, so we'll know
  //when Cordova is ready
  document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
  console.log("Entering onDeviceReady");
  //Let the user know that the deviceReady event has fired
  navigator.notification.alert("Cordova is ready", null, "Device Ready", "Continue");
  console.log("Leaving onDeviceReady");
}

/***********************************************
 * Remote Content
 ***********************************************/

function loadRemote1() {
  console.log('Entering loadRemote1');
  //Clear the eventOutput portion of the page
 // $('#eventOutput').html(blankStr);
  //do the InAppBrowser stuff
  var refRemote1 = window.open(remoteURL, '_blank', 'location=yes');
  registerEventListeners(refRemote1);
  console.log("Leaving loadRemote1");
}



/***********************************************
 * Event Listener Functions
 ***********************************************/

function registerEventListeners(theWindow) {
  theWindow.addEventListener('loadstart', onLoadEvent);
  theWindow.addEventListener('loadstop', onLoadEvent);
  theWindow.addEventListener('loaderror', onLoadError);
  theWindow.addEventListener('exit', onExit);
}

function onLoadEvent(res) {
  console.log('Entering loadEvent');
  console.log(JSON.stringify(res));
  console.log('Type: ' + res.type);
  console.log('URL: ' + res.url);
  $('#eventOutput').append(JSON.stringify(res) + br);
}

function onLoadError(errObj) {
  console.log('Entering loadError');
  var errorStr = JSON.stringify(errObj);
  console.error(errorStr);
  console.error('Code: ' + errObj.code);
  console.error('Message: ' + errObj.message);
  //do something based on event.type
  $('#eventOutput').append(errorStr + br);
  navigator.notification.alert(errorStr, null, "IAB Error", "Continue");
}

function onExit(res) {
  console.log('Entering onExit');
  console.log(JSON.stringify(res));
  console.log('Type: ' + res.type);
  $('#eventOutput').append(JSON.stringify(res) + br);
}



