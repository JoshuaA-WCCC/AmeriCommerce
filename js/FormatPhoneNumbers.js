
//Version 1.0.7 (4-12-2021) 

/**********************************************************************************/
// USAGE:
// if you have one or more elements, you can attach it by the id of each input fields
// formatPhoneNumber('phone_number_field_id');
//
// if you are adding this to an onclick event directly on the input field
// formatPhoneNumber(this.id);
//
// if you want to use this on all elements with a specific css class 
// formatPhoneNumber('phone_number_field_class','class');
//
/**********************************************************************************/

/**********************************************************************************/
//  Phone Number Formats:
// 9 digit or fewer numbers: Not formatted
// 10 digit numbers: (123) 465 - 7890
// 11 digit numbers that start with a 1: 1 (123) 465 - 7890
// 11+ digit numbers that do not start with a 1: DO NOT FORMAT
// 
// Examples when extension is entered after the phone number: 
// (123) 465 - 7890 x 1234
// 1 (123) 465 - 7890 x 1234
/**********************************************************************************/

/**********************************************************************************/
// Disclaimer:
// Script provided AS IS, ABSOLUTELY NO WARRANTY expressed or implied. Use this script at your own risk.
//
// I make no promises that it even remotely covers all possible phone number formats. 
// It is simply intended to make phone numbers more easily read by US based staff of AmeriCommerce Store Owners and 
// for the numbers to have a semblance of a consistent formatting.
/**********************************************************************************/


/***********************************************************************************/
/* the class or element id of the input field(s) containing phone numbers without period (.) or hash (#)*/
const id = 'AddressEditorPhoneTextbox'; 

//page section to listen to for dynamic additions, could be class [include period (.)], id [include hash (#)], or document.body
const parent_id = '.LayoutContentInner'; 
/***********************************************************************************/


// MutationObserver function from https://stackoverflow.com/a/38517525 for detecting if an element with a particular 
// id/class is added to the document and fire a function ONLY if it is found.
//
// Example Usage:
// onElementInserted('body', '.myTargetElement', function(element) {
//    console.log(element);
// });

function onElementInserted(containerSelector, elementSelector, callback) {

    var onMutationsObserved = function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                var elements = $(mutation.addedNodes).find(elementSelector);
                for (var i = 0, len = elements.length; i < len; i++) {
			if(callback){callback(elements[i]);}
			else{console.log('Callback function does not exist/improperly formatted.');}
                }
            }
        });
    };

    var target = $(containerSelector)[0];
    var config = { childList: true, subtree: true };
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var observer = new MutationObserver(onMutationsObserved);    
    observer.observe(target, config);

}


//Below modified from https://jsfiddle.net/rafj3md0/ by JoshuaA JoshuaA@CougarPartsCatalog.com
function formatPhoneNumber(id,type){ //id= element id or element class, type =id/class

type = typeof type !== 'undefined' ? type : 'id';

const isNumericInput = (event) => {
	const key = event.keyCode;
	return ((key >= 48 && key <= 57) || // Allow number line
		(key >= 96 && key <= 105) // Allow number pad
	);
};

const isModifierKey = (event) => {
	const key = event.keyCode;
	return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
		(key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
		(key > 36 && key < 41) || // Allow left, up, right, down
		(
			// Allow Ctrl/Command + A,C,V,X,Z
			(event.ctrlKey === true || event.metaKey === true) &&
			(key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
		)
};

const isFormatKey = (event) => {
	const key = event.keyCode;
	return (event.shiftKey === true && key === 187) || // Allow Plus on Number line for international dialing codes
		(key === 107 || key === 109 || key === 189 || key === 88|| key === 32) || // Allow number pad plus, number pad subtract/dash, Dash, x for extension numbers, space bar
		(
			// Allow shift + 9 AKA left parentheses, shift + 0 AKA right parentheses
			(event.shiftKey === true) &&
			(key === 9 || key === 0)
		)
};

const enforceFormat = (event) => {
	// Input must be of a valid number format or a modifier key, and not longer than ten digits
	if(!isNumericInput(event) && !isModifierKey(event) && !isFormatKey(event)){
		event.preventDefault();
	}
};

const formatToPhone = (event) => {
	if(isModifierKey(event)) {return;}
	console.log('PhoneNumber Format Triggered');
	const target = event.target;
	const val = event.target.value;
	const val_strip_ext = val.split("x")[0];
	const val_ext = val.split("x")[1];
	
	if(val.slice(-1)==" "){return;} 
	   
	  if( val.indexOf("x")>0) {
		  target.value = val_strip_ext.trim()+ ' x '+val_ext.trim();
		return;}
	
	if(val_strip_ext.replace(/\D/g,'').length==9 ||val_strip_ext.replace(/\D/g,'').length==10 ||(val_strip_ext.replace(/\D/g,'').length==11 && val.replace(/\D/g,'').substring(0,1)==1)){ //if number matches US/Canada number format
	
	if(val.replace(/\D/g,'').substring(0,1)==0){
		val = val.substr(1);
	}
	
	const input = val.replace(/\D/g,'').substring(0,11); // First 11 digits of input only
	const zip = input.slice(-10).substring(0,3);
	const middle = input.slice(-7).substring(0,3);
	const last = input.slice(-4);

	if(input.length < 9){return;}
	else if(val.substring(0,2)=='+1' ||val.substring(0,3)!='+(1'){
	const input = val.replace(/\D/g,''); 
	const country_digits=input.length-10;
	const country = input.substring(0,country_digits);
	const zip = input.slice(-10).substring(0,3);
	const middle = input.slice(-7).substring(0,3);
	const last = input.slice(-4);
	target.value = `+${country} (${zip}) ${middle} - ${last}`;}
		
	else if((val.substring(0,1)=='+' && val.substring(0,2)!='+1' && val.substring(0,2)!='+(')||(val.replace(/\D/g,'').length>10 && val.substring(0,2)!='+1' && val.substring(0,2)!='+(' )){

		return;
		//removed formating to allow international customers format numbers as needed 
	/*const input = val.replace(/\D/g,''); 
	const country_digits=input.length-10;
	const country = input.substring(0,country_digits);
	const zip = input.slice(-10).substring(0,3);
	const middle = input.slice(-7).substring(0,3);
	const last = input.slice(-4);

	if(input.length > 9){target.value = `+${country} (${zip}) ${middle} - ${last}`;}*/
	}

	else if(input.length > 10){target.value = `1 (${zip}) ${middle} - ${last}`;}
	else if(input.length > 9){target.value = `(${zip}) ${middle} - ${last}`;}
	
	}
	
};

if(type=='id'){
const inputElement = document.getElementById(id);
inputElement.addEventListener('keydown',enforceFormat);
inputElement.addEventListener('keyup',formatToPhone);
inputElement.addEventListener('input',formatToPhone);
}
else if(type=='class'){
const classname = document.getElementsByClassName(id);
	for (var i = 0; i < classname.length; i++) {
	classname[i].addEventListener('keydown',enforceFormat);
	classname[i].addEventListener('keyup',formatToPhone);
	classname[i].addEventListener('input',formatToPhone);
	classname[i].addEventListener('load',formatToPhone);
	 }
}
	
} //end formatPhoneNumber function



//check pre-filled data
function trigger_format(id,type){
var event = new Event('keyup'); //create mock event to be triggeed on first load to check for pre-filled content

	if(type=='id'){
		const inputElement = document.getElementById(id);
		inputElement.dispatchEvent(event); //trigger onload to format any prefilled data
	}
	else if(type=='class'){
	const classname = document.getElementsByClassName(id);
		for (var i = 0; i < classname.length; i++) {
			classname[i].dispatchEvent(event); //trigger onload to format any prefilled data
	 	}
	}	
} //end trigger_format function

formatPhoneNumber(id,'class');  //initiate formatting of phone number fields on key & input
trigger_format(id,'class');  //trigger formatting any phone number fields that are pre-filled when the page loads.

// if any of the divs on the page are modified check if they contain a phone number class and add formatPhoneNumber 
// listener to new phone number fields
onElementInserted(parent_id, '.'+id, function(element) {
trigger_format(element.id,'id');
    console.log(element.id);
});
