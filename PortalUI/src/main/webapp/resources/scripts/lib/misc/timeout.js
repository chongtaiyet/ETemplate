//----------------Settings -------------------------------------------//
var GRACE_PERIOD = 60; //seconds, grace period for user to respond
//----------------End of Settings-------------------------------------//

//----------------Variables should be set in templates----------------//
//set in script.jsp
var SESSION_LIFETIME = 900;
var appRoot = "";


//The url to logout action, defaulted to front end logout action
//set in admintemplate.jsp
var logOffUrl = "/login/doLogout.do";

var logOffUrlManuLife = "/login/manulifedoLogout.do";

var logOffUrlDBS = "/login/dbsdoLogout.do";

var logOffUrlNonBranded = "/login/doLogout2.do";

//----------------End of Variables should be set in templates---------//


//----------------Internal Variables Used Here only  ----------------//
var SESSION_BUFFER = 120;
var timerid = 0;
var btimerid = false;
var MSGTIMEOUT = "Your session is going to expired soon. Would you like to extend it?";
var MSGLOGOUT = "For your protection, you have been logged-off.\nPlease click on Log-In to re-signon";
var COOKIENAME = "_iplan.userName";
var img = new Image(); //for refreshes
var pageLoaded = false; //for marking the page is loaded in onload event
//----------------End of Internal Variables -------------------------//

//startTimer(): Start the timer to check user session timeout
//It is invoked in masterhead.jsp, in onload event
function startTimer(){
	pageLoaded = true;
    if(isLogin()){
        //alert("Timer started, counting down: " + (SESSION_LIFETIME - SESSION_BUFFER) + " secs" );
        timerid = window.setTimeout('alertTimeout()', (SESSION_LIFETIME - SESSION_BUFFER)*1000);
        btimerid = true;
    }
}
function stopTimer(){
    if (btimerid) {
        clearTimeout(timerid); 
    }
    btimerid = false;
}
function isLogin(){
    var userName = getCookie(COOKIENAME);
    if(userName){
        //alert("Cookie is " + getCookie(COOKIENAME));
        return true;
    }
    //alert("No cookie found");
    return false;
}

function getCookie(name){
    var dc;
    var allCookies;
    var aCookie;
    var i;
    dc = unescape(document.cookie);
    allCookies = dc.split("; ");
    for (i = 0; i < allCookies.length; i++){
        aCookie = allCookies[i].split("=");
        if (name == aCookie[0])
        return aCookie[1];
    }
    return "";
}

// alertTimeout(): "Keep Alive" function to check for session inactivity
// parameters:  none
// return:  none
// comment: this runs regularly in background to check for session inactivity
// uses many functions above
function alertTimeout()
{
	var FSCookies;
	var bExtendSession;
	var expires;
	var i;
	var localdom;
	var Begin = new Date();

	var bchoice = false;
	self.focus();
	bchoice = confirm(MSGTIMEOUT)

	if ( ( gettimediff(Begin) < ( (GRACE_PERIOD*1000) - 5000) ) && bchoice)
	{
	    dorefresh();
		clrsettimeout();
	}
	else
	{
	    if(bchoice){
	        alert(MSGLOGOUT);
	    }
		dosignoff();
	}
}

function dorefresh(){
    img.src = appRoot + '/common/include/refresh.jsp';
}

function dosignoff(){
    if (btimerid){
        stopTimer();
    }

	if (getCookie("_iplan.resourceBundleVar")=="ML")
		window.location.href=appRoot + logOffUrlManuLife;
	else if (getCookie("_iplan.resourceBundleVar")=="DBS")
		window.location.href=appRoot + logOffUrlDBS;
    else if (getCookie("_iplan.resourceBundleVar")=="AOL")
    	window.location.href=appRoot + logOffUrl;
    else
    	window.location.href=appRoot + logOffUrlNonBranded;
    	
    deletecookie(COOKIENAME);
}


// deletecookie(): deletes cookie
// parameters:  name - name of cookie to delete
//		path - path of above cookie
//		domain - domain of above cookie
// return: none
// comment: uses global constants
// if path & domain empty, assumes shared FS domain & path
function deletecookie (name,path,domain)
{
  var expdate = new Date();
  expdate.setYear(1985);
  document.cookie = name + "=" +
	"; expires=" + expdate.toGMTString() + 
	"; path=" + path +
	"; domain=" + domain;
}
// returns diff in 2 times, 1 passed in & 1 now
function gettimediff(begin)
{
	var end = new Date();
	return end.getTime() - begin.getTime();
}


function clrsettimeout()
{
    if (btimerid) {
        stopTimer();
    }
    startTimer();
}

