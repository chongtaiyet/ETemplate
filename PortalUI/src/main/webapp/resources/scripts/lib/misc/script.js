/**************************************************************************/
/* use to detect user browser type */
/**************************************************************************/
function whichBrs() {
var agt=navigator.userAgent.toLowerCase();
if (agt.indexOf("opera") != -1) return 'Opera';
if (agt.indexOf("staroffice") != -1) return 'Star Office';
if (agt.indexOf("webtv") != -1) return 'WebTV';
if (agt.indexOf("beonex") != -1) return 'Beonex';
if (agt.indexOf("chimera") != -1) return 'Chimera';
if (agt.indexOf("netpositive") != -1) return 'NetPositive';
if (agt.indexOf("phoenix") != -1) return 'Phoenix';
if (agt.indexOf("firefox") != -1) return 'Firefox';
if (agt.indexOf("safari") != -1) return 'Safari';
if (agt.indexOf("skipstone") != -1) return 'SkipStone';
if (agt.indexOf("msie") != -1) return 'Internet Explorer';
if (agt.indexOf("netscape") != -1) return 'Netscape';
if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
if (agt.indexOf('\/') != -1) {
if (agt.substr(0,agt.indexOf('\/')) != 'mozilla') {
return navigator.userAgent.substr(0,agt.indexOf('\/'));}
else return 'Netscape';} else if (agt.indexOf(' ') != -1)
return navigator.userAgent.substr(0,agt.indexOf(' '));
else return navigator.userAgent;
}


/*Search Toggle*/
function toggleAdvanceSearch() {
	if (document.getElementById("advanceSearch").style.display=='none'){
		document.getElementById("advanceSearch").style.display='';
		document.getElementById("label").innerHTML='<a href="#" onClick="toggleAdvanceSearch();clearAdvanceSearchFields();" class="require_header">Basic Search</a>';
	} else {
		document.getElementById("advanceSearch").style.display='none';
		document.getElementById("label").innerHTML='<a href="#" onClick="toggleAdvanceSearch()" class="require_header">Advanced Search</a>';
	}
}


function hideNum(imgname)
{
	var imgtodisplay = document.getElementById(imgname);
	imgtodisplay.style.display="none";
}

function tabNum(tabname)
{

	//hideAllNums();
	if(tabname=="personaldetails" || tabname =="tab1" || tabname=="tab_account")
	{
		showNum("img1_on");
		showNum("img2_off");
		showNum("img3_off");
		showNum("img4_off");
		showNum("img5_off");
	}else if(tabname=="portfolio" || tabname =="tab2" || tabname=="tab_easysave"){
		showNum("img1_on");
		showNum("img2_on");
		showNum("img3_off");
		showNum("img4_off");
		showNum("img5_off");
	} else if(tabname=="investment" || tabname =="tab3" || tabname=="tab_attachment"){
		showNum("img1_on");
		showNum("img2_on");
		showNum("img3_on");
		showNum("img4_off");
		showNum("img5_off");
	} else if(tabname=="previeworder" || tabname =="tab4" || tabname=="tab_previeworder"){
		showNum("img1_on");
		showNum("img2_on");
		showNum("img3_on");
		showNum("img4_on");
		showNum("img5_off");
	}else if(tabname=="ordersubmit" || tabname=="tab_ordersubmit"){
		showNum("img1_on");
		showNum("img2_on");
		showNum("img3_on");
		showNum("img4_on");
		showNum("img5_on");
	}
	
}



/* *****add remove rows for the table ***** */

function addRow(tableID) {

    var table = document.getElementById(tableID);

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var colCount = table.rows[0].cells.length;

    for(var i=0; i<colCount; i++) {

	var newcell = row.insertCell(i);

	newcell.innerHTML = table.rows[0].cells[i].innerHTML;

	switch(newcell.childNodes[0].type) {
	    case "text":
		    newcell.childNodes[0].value = "";
		    break;
	    case "checkbox":
		    newcell.childNodes[0].checked = false;
		    break;
	    case "select-one":
		    newcell.childNodes[0].selectedIndex = 0;
		    break;
		}
    }
}

function deleteRow(tableID) {
    try {
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;

    for(var i=0; i<rowCount; i++) {
	var row = table.rows[i];
	var chkbox = row.cells[0].childNodes[0];
	if(null != chkbox && true == chkbox.checked) {
	    if(rowCount <= 1) {
		alert("Cannot delete all the rows.");
		break;
	    }
	    table.deleteRow(i);
	    rowCount--;
	    i--;
	}

    }
    }catch(e) {
	alert(e);
    }
}

function showNum(imgname)
{
	var imgtodisplay = document.getElementById(imgname);
	imgtodisplay.style.display="block";
}

/*
 * Modified by sgarku for revitalise
 * Add a parameter for element to hide, open element id and close element Id
 */
function open_hide(stat, openElement, closeElement, idElement){
	if (null == openElement && null == closeElement && null == idElement) {
		if (stat == "open") {
			hide(document.getElementById('maxi'));
			show(document.getElementById('mini') );
			show(document.getElementById('custResult'));
		} else {
			show(document.getElementById('maxi') );
			hide(document.getElementById('mini'));
			hide(document.getElementById('custResult') );
		}
	}
	else {
		if (stat == "open") {
			hide(document.getElementById(openElement));
			show(document.getElementById(closeElement) );
			show(document.getElementById(idElement));
		} else {
			show(document.getElementById(openElement) );
			hide(document.getElementById(closeElement));
			hide(document.getElementById(idElement) );
		}
	}
}

function show(obj){
	obj.style.display="";
}

function hide(obj){
	obj.style.display="none";
}


/******************************** start - my code for the tab ********************************/

//AOL Revitalize by oliverc, This tab is for the innerTab for Client Reports.
var tabLinksInnerTab = new Array();
var contentDivsInnerTab = new Array();

var tabLinks = new Array();   
var contentDivs = new Array();
var globalTabType = "";

function initMyTab(tabType) {
	
	globalTabType = tabType;
      // Grab the tab links and content divs from the page
	  var tabListItems = new Array();
	  if(document.getElementById('tabs') != null)
		tabListItems = document.getElementById('tabs').childNodes;

	for ( var i = 0; i < tabListItems.length; i++ ) {
        if ( tabListItems[i].nodeName == "LI" ) {
          var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
          var id = getHash( tabLink.getAttribute('href') );
          tabLinks[id] = tabLink;
          contentDivs[id] = document.getElementById( id );
        }
      }

      // Assign onclick events to the tab links, and
      // highlight the first tab
      var i = 0;

      for ( var id in tabLinks ) {

		if("personaldetails" == id){
			tabLinks[id].onclick = showTab;			
		}
		else
		{
			if(globalTabType != '0')
			{
		        tabLinks[id].onclick = "";//disable tab. Used in step by step application form.
			}
			else
			{
				tabLinks[id].onclick = showTab;
			}
		}
        tabLinks[id].onfocus = function() { this.blur() };
        if ( i == 0 ) tabLinks[id].className = 'selected';
        i++;
      }

      // Hide all content divs except the first
      var i = 0;

      for ( var id in contentDivs ) {
        if ( i != 0 ) contentDivs[id].className = 'tabContent hide';
        i++;
      }

}


var tabLinks2 = new Array();
var contentDivs2 = new Array();
var globalTabType2 = "";

function showTab() {
      var selectedId = getHash( this.getAttribute('href') );
      // Highlight the selected tab, and dim all others.
      // Also show the selected content div, and hide all others.
	  if(globalTabType == '0')
	  {
		  
	  }
	  else
	  {
		  tabNum(selectedId); // with numbers on top of the tab.
	  }

      for ( var id in contentDivs ) {
        if ( id == selectedId ) {
          tabLinks[id].className = 'selected';
          contentDivs[id].className = 'tabContent';
        } else {
          tabLinks[id].className = '';
          contentDivs[id].className = 'tabContent hide';
        }
      }

      // Stop the browser following the link
      return false;
}


function showTab2(selectedId,isclientreporttab) {

	//var selectedId = getHash( this.getAttribute('href') );
	//if(document.getElementById('img1_on')  != null){
	
		//AOL Revitalize by oliverc comment the code below to disable the image checking.
		//tabNum(selectedId);
		
	//}
	labeltab(selectedId,isclientreporttab); //enable the previous tab.
	// Highlight the selected tab, and dim all others.
	// Also show the selected content div, and hide all others.

	//AOL Revitalize by oliverc, This tab is for the innerTab for Client Reports.	
	if(isclientreporttab == "true")
	{
      for ( var id in contentDivsInnerTab) {
        if ( id == selectedId ) {
        
          tabLinksInnerTab[id].className = 'selected';
          //contentDivs[id].className = 'tabContent';
        } else {
          tabLinksInnerTab[id].className = '';
          //contentDivs[id].className = 'tabContent hide';
        }
      }
	}else{
      for ( var id in contentDivs ) {
        if ( id == selectedId ) {
        
          tabLinks[id].className = 'selected';
          //contentDivs[id].className = 'tabContent';
        } else {
          tabLinks[id].className = '';
          //contentDivs[id].className = 'tabContent hide';
        }
      }
	}
	
      // Stop the browser following the link
      return false;
}
/***********************************************
* REVITALIZE - SY 12 Feb 2010
* Add inner tab
***********************************************/
var tab2Links = new Array();
var content2Divs = new Array();

function showTab3(selectedId) {

	labeltab2(selectedId); //enable the previous tab.

	// Highlight the selected tab, and dim all others.
	// Also show the selected content div, and hide all others.
      for ( var id in content2Divs ) {
        if ( id == selectedId ) {
          tab2Links[id].className = 'selected';
        } else {
          tab2Links[id].className = '';
        }
      }

      // Stop the browser following the link
      return false;
}
function labeltab2(tabID) 
{
      var tabListItems = document.getElementById('tabs2').childNodes;

      for ( var i = 0; i < tabListItems.length; i++ ) {
  
        if ( tabListItems[i].nodeName == "LI") {
		
          var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
		  
		  var id = "";
		  if (tabLink.toString().indexOf("#") == -1 && (tabLink.toString().indexOf(".do") != -1 || tabLink.toString().indexOf("forwarddetailTab") != -1))
			id = getHash( tabLink.getAttribute('id') );
		  else
			id = getHash( tabLink.getAttribute('href') );

          tab2Links[id] = tabLink;

          content2Divs[id] = document.getElementById( id );
        }
      }
}

/***********************************************
* END
***********************************************/

function getFirstChildWithTagName( element, tagName ) {
  for ( var i = 0; i < element.childNodes.length; i++ ) {
	if ( element.childNodes[i].nodeName == tagName ) return element.childNodes[i];
  }
}

function labeltab(tabID,isclientreporttab) 
{
	//This function remember's w/c tab is safe to go back or advance to.

      // Grab the tab links and content divs from the page
      
      //AOL Revitalize by oliverc, This tab is for the innerTab for Client Reports. 
      if(isclientreporttab == "true")
      {
      	var tabListItems = document.getElementById('tabs2').childNodes;
      }else{
      	var tabListItems = document.getElementById('tabs').childNodes;
      }

      for ( var i = 0; i < tabListItems.length; i++ ) {
  
        if ( tabListItems[i].nodeName == "LI") {
		
          var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
		  // modified by sgarku if tab is an URL using id
		  var id = "";
		  if (tabLink.toString().indexOf("#") == -1 && (tabLink.toString().indexOf(".do") != -1 || tabLink.toString().indexOf("javascript") != -1))
		 {
			id = getHash( tabLink.getAttribute('id') );
		  }else{
			id = getHash( tabLink.getAttribute('href') );
		}
		
		//AOL Revitalize by oliverc, This tab is for the innerTab for Client Reports.
		if(isclientreporttab == "true")
		{
          	tabLinksInnerTab[id] = tabLink;
          	contentDivsInnerTab[id] = document.getElementById( id );
		}else{
			tabLinks[id] = tabLink;
			contentDivs[id] = document.getElementById( id );
        }

          
        }
      }

      // Assign onclick events to the tab links, and
      // highlight the first tab
      var i = 0;

		if("ordersubmit" == tabID){
			for ( var id in tabLinks ) {
				tabLinks[id].onclick = "";
				tabLinks[id].onfocus = function() { this.blur() };
			}	
		}else{
			for ( var id in tabLinks ) {
				if(id == tabID)
				{
					tabLinks[id].onclick = showTab;
					tabLinks[id].onfocus = function() { this.blur() };
					break;
				}
			}	
		}
}

/******************************** end - my code for the tab ********************************/



/******************************** code for profile.htm ********************************/
var url = "profile2.htm";





/***********************************************************
javascript for progress bar created by graciayh 28 Jan 2010
***********************************************************/

function getHash( url ) {
  var hashPos = url.lastIndexOf ( '#' );
  return url.substring( hashPos + 1 );
}	

function showNum(imgname)
{
	var imgtodisplay = document.getElementById(imgname);
	imgtodisplay.style.display="block";
}

function hideAllNums(maxIndex)
{
	try
	{
		for (cnt=1;cnt<=maxIndex;cnt++) {
			document.getElementById('img'+cnt+'_on').style.display="none";
			document.getElementById('img'+cnt+'_off').style.display="none";
		}
		document.getElementById('end_on').style.display="none";
		document.getElementById('end_off').style.display="none";
	}
	catch(e)
	{
		alert(e);
	}
}

function tabNumForTransactions(currIndex, maxIndex)
{
	
	hideAllNums(maxIndex);
	
	//turn on the the image steps until current idx
	for (cnt=1;cnt<=currIndex;cnt++) {
		showNum ("img"+cnt+"_on");
		document.getElementById("img"+cnt+"_on").className='btnDefault';
		document.getElementsByName('link'+cnt)[0].className='selected';
	}
	
	//turn off the image steps from current idx until max idx
	for (cnt=currIndex+1;cnt<=maxIndex;cnt++) {
		showNum ("img"+cnt+"_off");
		document.getElementsByName('link'+cnt)[0].className='';
	}
	
	if (currIndex == maxIndex) {
		showNum ("end_on");
	} else {
		showNum ("end_off");
	}
	
	if (currIndex == maxIndex) {
		for (cnt=1;cnt<=maxIndex;cnt++){
			if (document.getElementById('imgLink'+cnt) != null)
				document.getElementById('imgLink'+cnt).onclick=null;
			if (document.getElementsByName ('link'+cnt) != null)
				document.getElementsByName('link'+cnt)[0].onclick=null;
		}
	}
	
	for (cnt=currIndex+1;cnt<=maxIndex;cnt++){
		if (document.getElementsByName ('link'+cnt) != null)
			document.getElementsByName('link'+cnt)[0].onclick=null;
	}
}

function renderTab (tabId, selectedId, currIndex, maxIndex) {
	var selectedId = getHash(selectedId);

	if(document.getElementById('img1_on')  != null){
		tabNumForTransactions(currIndex, maxIndex);
	}
		
	var tabListItems = document.getElementById(tabId).childNodes;
	for (var i = 0; i < tabListItems.length; i++ ) {
       if ( tabListItems[i].nodeName == "LI" ) {
          var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
		  var id = "";
			id = getHash( tabLink.getAttribute('id') );
          tabLinks[id] = tabLink;
          if (document.getElementById (id)!= null) {
          	contentDivs[id] = document.getElementById(id);
          }
        }
      }
	
	// Highlight the selected tab, and dim all others.
	// Also show the selected content div, and hide all others.
     for ( var id in contentDivs ) {
      	if ( id == selectedId ) {
      		contentDivs[id].className = 'tabContent';
      	} else {
      		contentDivs[id].className = 'tabContent hide';
      	}
      }
      	
      /*for ( var id in tabLinks ) {
        if ( id == selectedId ) {
          tabLinks[id].className = 'selected';
          tabLinks[id].onfocus = function() { this.blur() };
        } else {
          tabLinks[id].className = '';
        }
      }*/
      
	  window.scrollTo(0,0);
      return false;
}


/***********************************************
* REVITALIZE - SY 05 March 2010
* Pagination
***********************************************/
function iskey(e){
	
	var keynum = 0;
	if(window.event){ /* IE */
	  return keynum = parseInt(e.keyCode);
	}
	else if(e.which){ /* Netscape/Firefox/Opera */
	  return keynum = parseInt(e.which);
	}
}

function renderPage(form_name,pageno_view_name,lastpage_var,key) {

	var keyno = 0;
	keyno = iskey(key);
	if (keyno == 13){ 	/* check presskey is enter. */
		var pageNum = document.getElementById(pageno_view_name).value;
		var lastPageNum = document.getElementById(lastpage_var).value;
		if(+pageNum > +lastPageNum) {
			pageNum = lastPageNum;
		}
		/* handle enter key will not submit the page */
		if(window.event){ /* IE */
			key.keyCode = 0;
			if (form_name == 'viewClientProfileForm'){
				navigateSubmitClientProfile(pageNum); /* Online Transaction */
			}else{
				navigateSubmit(pageNum);
			}
			return false;
		}
		else if(key.which){ /* Netscape/Firefox/Opera */
			if (form_name == 'viewClientProfileForm'){
				navigateSubmitClientProfile(pageNum); /* Online Transaction */
			}else{
				navigateSubmit(pageNum);
			}
			return false;
		} 
	}else if ( ! ( keyno > 47 && keyno < 58  || keyno == 8 )) { /* keyno=48 is 0; keyno=57 is 9; keyno=8 is backspace */
		return false;
	}
}

/***********************************************
* REVITALIZE - SY 29 March 2010
* Hide the Global error after submitted page.
***********************************************/
function hide_global_err(){
	if(null != document.getElementById('errorMessageID')){
		var obj = document.getElementById('errorMessageID');
		obj.style.display="none";
	}
}

/************************************************************
javascript for select tab 
created by graciayh 14 may 2010

parameter : 
	tabId - tab id
	tabIdIndex - the index of the tabs
*************************************************************/

function constructTab (tabId, tabIdIndex) 
{
	var linkArray = new Array();	
	
	var tabListItems = document.getElementById('tab' + tabIdIndex).childNodes;
	for ( var i = 0; i < tabListItems.length; i++ ) {
        if ( tabListItems[i].nodeName == "LI") {
        
        	var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
        	var id = tabLink.getAttribute('id');
          	linkArray[id] = tabLink;          	
        }
      }
        
	  for ( var id in linkArray ) {
		if(id == tabId)
		{
			linkArray[id].className = 'selected';
			break;
		} else {
			linkArray[id].className = '';
		}
	  }	
}

function toggleTab (tabId, tabIdIndex) 
{
	var linkArray = new Array();	
	
	var tabListItems = document.getElementById('tab' + tabIdIndex).childNodes;
	for ( var i = 0; i < tabListItems.length; i++ ) {
        if ( tabListItems[i].nodeName == "LI") {
        
        	var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
        	var id = tabLink.getAttribute('id');

          	linkArray[id] = tabLink;       
          	
        }
      }
      
        
	  for ( var id in linkArray ) {
		if(id == tabId)
		{
			document.getElementById(id + '_content').style.display = "block";
			linkArray[id].className = 'selected';				
		} else {
			document.getElementById(id + '_content').style.display = "none";
			linkArray[id].className = '';
		}
	  }	
}
/***********************************************
* REVITALIZE - 21 May 2010 - sgarsy
* Information Tool tip.
***********************************************/
var horizontal_offset="9px" //horizontal offset of hint box from anchor link

var vertical_offset="0" //horizontal offset of hint box from anchor link. No need to change.
var ie=document.all
var ns6=document.getElementById&&!document.all

function getposOffset(what, offsettype){
	var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
	var parentEl=what.offsetParent;
	while (parentEl!=null){
	totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
	parentEl=parentEl.offsetParent;
	}
	return totaloffset;
}

function iecompattest(){
	return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function showwithedgehint(menucontents, obj, e, tipwidth){
	createhintbox();
	if (document.getElementById("hintbox")){
		dropmenuobj=document.getElementById("hintbox")
		dropmenuobj.innerHTML=menucontents
		dropmenuobj.style.left=dropmenuobj.style.top=-500
		if (tipwidth!=""){
			dropmenuobj.widthobj=dropmenuobj.style
			dropmenuobj.widthobj.width=tipwidth
		}
		dropmenuobj.x=getposOffset(obj, "left")
		dropmenuobj.y=getposOffset(obj, "top")
		dropmenuobj.style.left=dropmenuobj.x-clearbrowseredge(obj, "rightedge")+obj.offsetWidth+"px"
		dropmenuobj.style.top=dropmenuobj.y+"px"
		dropmenuobj.style.visibility="visible"
		obj.onmouseout=hidetip
	}
}

function showhint(menucontents, obj, e, tipwidth){
	createhintbox();
	if (document.getElementById("hintbox")){
		dropmenuobj=document.getElementById("hintbox")
		dropmenuobj.innerHTML=menucontents
		dropmenuobj.style.left=dropmenuobj.style.top=-500
		if (tipwidth!=""){
			dropmenuobj.widthobj=dropmenuobj.style
			dropmenuobj.widthobj.width=tipwidth
		}
		dropmenuobj.x=getposOffset(obj, "left")
		dropmenuobj.y=getposOffset(obj, "top")
		dropmenuobj.style.left=dropmenuobj.x-clearbrowseredge(obj, "rightedge")+obj.offsetWidth+"px"
		dropmenuobj.style.top=dropmenuobj.y-clearbrowseredge(obj, "bottomedge")+"px"
		dropmenuobj.style.visibility="visible"
		obj.onmouseout=hidetip
	}
}
function createhintbox(){
	var divblock=document.createElement("div")
	divblock.setAttribute("id", "hintbox")
	divblock.setAttribute("style", "font-family: Arial, Helvetica, Sans-serif; font-size: 12px; color: #333333;")
	document.body.appendChild(divblock)
}

function hidetip(e){
	dropmenuobj.style.visibility="hidden"
	dropmenuobj.style.left="-500px"
}
function clearbrowseredge(obj, whichedge){
	var edgeoffset=(whichedge=="rightedge")? parseInt(horizontal_offset)*-1 : parseInt(vertical_offset)*-1
	if (whichedge=="rightedge"){
		var windowedge=ie && !window.opera? iecompattest().scrollLeft+iecompattest().clientWidth-30 : window.pageXOffset+window.innerWidth-40
		dropmenuobj.contentmeasure=dropmenuobj.offsetWidth
		if (windowedge-dropmenuobj.x < dropmenuobj.contentmeasure)
			edgeoffset=dropmenuobj.contentmeasure+obj.offsetWidth+parseInt(horizontal_offset)
	}
	else{
		var windowedge=ie && !window.opera? iecompattest().scrollTop+iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18
		dropmenuobj.contentmeasure=dropmenuobj.offsetHeight
		if (windowedge-dropmenuobj.y < dropmenuobj.contentmeasure)
		edgeoffset=dropmenuobj.contentmeasure-obj.offsetHeight
	}
	return edgeoffset
}

function openFundCentrePopup(url) {
	/*temporarily commented - since FE is not ready*/
	popupWindow = window.open(url,'popUpWindow', 'width=800px,height=500px,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=no');
	popupWindow.moveTo(0,0);	
    if (window.focus) {popupWindow.focus()}
}

function isNumeric(sText)
{
   var ValidChars = "0123456789";
   var Char;
	
   for (i = 0; i < sText.length; i++) 
      { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
         {
         return false;
         }
      }
      
   return true;
}

function getCheckedValue(radioObj) {
	if(!radioObj)
		return "";
	var radioLength = radioObj.length;
	if(radioLength == undefined)
		if(radioObj.checked)
			return radioObj.value;
		else
			return "-";
	for(var i = 0; i < radioLength; i++) {
		if(radioObj[i].checked) {
			return radioObj[i].value;
		}
	}
	return "-";
}

function displayTitle(tabIndex) {
		if (document.getElementById('title' + tabIndex)!=null)
			document.getElementById('title' + tabIndex).style.display='block';
	}