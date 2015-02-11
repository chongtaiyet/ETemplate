// JavaScript Document
/**

Property of Firium Singapore.

	Date		REF#		Change By		Description
	----		----		---------		--------------------------------------------------------------------------
	15/02/2008	0001		Irawan			To give the ability to pass parameter without using the server side include
											this is only used for prototyping.
	17/02/08	0002		Irawan			Create new redirect function with message to alert the user.

*/

function redirect(URLStr) { 
	//alert("You are being redirected to: " + URLStr);
	window.location.href = URLStr; 
}

// 0002 
function redirectWithMessage(URLStr,msg) { 
	if (null != msg){
		alert(msg);
	}
	window.location.href = URLStr; 
}

// redirection with parameters (only for login) -->
function redirectForLogin(URLStr,paramToPass) { 
	//alert("You are being redirected (with param) to: " + URLStr);
	window.location.href = URLStr+"?inputVal="+paramToPass; 
}

// redirection with parameters -->
function redirectWithParam(URLStr,paramToPass) { 
	//alert("You are being redirected (with param) to: " + URLStr);
	window.location.href = URLStr+"?"+paramToPass; 
}

function redirectAccount(URLStr,paramToPass) {
     //alert("you are being redirected (with param) to: " + URLStr);
	 window.location.href = URLStr+"?inputVal="+paramToPass;
}

var qsParm = new Array();
function qs() {
	var query = window.location.search.substring(1);
	var parms = query.split('&');
	for (var i=0; i<parms.length; i++) {
		var pos = parms[i].indexOf('=');
		if (pos > 0) {
			var key = parms[i].substring(0,pos);
			var val = parms[i].substring(pos+1);
			qsParm[key] = val;
		}
	}
}

function show(obj){
	//alert("show");
	obj.style.display="";
}

function hide(obj){
	//alert(" hide");
	obj.style.display="none";
}

function round(number,X) {
// rounds number to X decimal places, defaults to 2
	X = (!X ? 2 : X);
	return Math.round(number*Math.pow(10,X))/Math.pow(10,X);
}

function confirmNext(txt, next){
	if(confirm(txt)){
		redirect(next);
	} 
	return false;
}

function trim(str) { 
	return str.replace(/^\s+|\s+$/g, ''); 
};

function leftTrim(sString){
	while (sString.substring(0,1) == ' '){
		sString = sString.substring(1, sString.length);
	}
	return sString;
}

function rightTrim(sString){
	while (sString.substring(sString.length-1, sString.length) == ' '){
		sString = sString.substring(0,sString.length-1);
	}
	return sString;
}

function keyup(field, countfield) {
	
  //var str = new String(what.value);
  //var len = str.length;
  //alert(str + " - " +len);
  //document.getElementById(targetField).value = 255 - len;
  //if (len > 4000) {
  	//document.getElementById(tagetWarning).style = '<br>Some information will be lost, please revise your entry';
  //}
  
  var maxlimit=255;
  if (field.value.length > maxlimit) {
    field.value = field.value.substring(0, maxlimit);
  } else {
    document.getElementById(countfield).value = maxlimit - field.value.length;
  }

}


// Added by sgarrk on 15/04/2009 to keep variable maxlimit for different text boxes
function keyup2(field, countfield, maxlimit) {
	//Modified by sgarmde: PM2240: to add 1 in length for every new line
	var text = field.value;
    var newLines = text.match(/(\r\n|\n|\r)/g);
    var addition = 0;
    if (newLines != null) {
        addition = newLines.length;
    }	
    var finalLength = field.value.length + addition; //add an extra count for all new lines

  if (finalLength > maxlimit) {
    field.value = field.value.substring(0, maxlimit - addition);
  } 
  document.getElementById(countfield).value = maxlimit - finalLength;
  //End: Modified by sgarmde: PM2240: to add 1 in length for every new line
}


//added by graciayh 5 feb 2010 for revitalise
//purpose : Getting request parameter 
function getParameter ( parameterName ) {
   // Add "=" to the parameter name (i.e. parameterName=value)
   var parameterName = parameterName + "=";
   var queryString = window.top.location.search.substring(1);
   if ( queryString.length > 0 ) {
      // Find the beginning of the string
      begin = queryString.indexOf ( parameterName );
      // If the parameter name is not found, skip it, otherwise return the value
      if ( begin != -1 ) {
         // Add the length (integer) to the beginning
         begin += parameterName.length;
         // Multiple parameters are separated by the "&" sign
         end = queryString.indexOf ( "&" , begin );
      if ( end == -1 ) {
         end = queryString.length
      }
      // Return the string
      return unescape ( queryString.substring ( begin, end ) );
   }
   // Return "null" if no parameter has been found
   return "null";
   }
}