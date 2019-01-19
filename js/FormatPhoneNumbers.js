//modified from https://jsfiddle.net/rafj3md0/ by JoshuaA JoshuaA@CougarPartsCatalog.com
//Version 1.0 (1-15-2019)

/**********************************************************************************/
// USAGE:
// if you just have one or more elements, you can attach it by the id of the input fields
// formatPhoneNumber('phone_number_field_id');
//
// if you are adding this to an onclick event directly on the input field
// formatPhoneNumber(this.id);
//
// if you just to use this on all elements with a specific css class 
// formatPhoneNumber('phone_number_field_class','class');
//
/**********************************************************************************/

/**********************************************************************************/
// Disclaimer:
// Script provided AS IS, ABSOLUTELY NO WARRANTY expressed or implied. Use this script at your own risk.
//
// I make no promises that it even remotely covers all possible phone number formats. 
// It is simply intended to make phone numbers more easily read by US based staff of AmeriCommerce Store Owners and 
// for the numbers to have a semblance of a consistent formatting.
/**********************************************************************************/

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
	var val = event.target.value;
	if(val.replace(/\D/g,'').length==9 ||val.replace(/\D/g,'').length==10 ||(val.replace(/\D/g,'').length==11 && val.replace(/\D/g,'').substring(0,1)==1)){ //if number matches US/Canada number format
	
	
	if(val.slice(-1)==" " || val.slice(-1)=="x") return;
	if(val.replace(/\D/g,'').substring(0,1)==0){
		val = val.substr(1);
	}

	const target = event.target;
	const input = val.replace(/\D/g,'').substring(0,11); // First 11 digits of input only
	const zip = input.slice(-10).substring(0,3);
	const middle = input.slice(-7).substring(0,3);
	const last = input.slice(-4);

	if(input.length > 10){target.value = `1 (${zip}) ${middle} - ${last}`;}
	else if(input.length > 9){target.value = `(${zip}) ${middle} - ${last}`;}
	
	}
	else if(val.substring(0,1)=='+'||val.replace(/\D/g,'').length>10){
		var val = event.target.value;
	if(val.slice(-1)==" " || val.slice(-1)=="x") return;

	const target = event.target;
	const input = val.replace(/\D/g,''); 
	const country_digits=input.length-10;
	const country = input.substring(0,country_digits);
	const zip = input.slice(-10).substring(0,3);
	const middle = input.slice(-7).substring(0,3);
	const last = input.slice(-4);

	if(input.length > 9){target.value = `+${country} (${zip}) ${middle} - ${last}`;}
	}
};


if(type=='id'){
const inputElement = document.getElementById(id);
inputElement.addEventListener('keydown',enforceFormat);
inputElement.addEventListener('keyup',formatToPhone);



}
else if(type=='class'){
const classname = document.getElementsByClassName(id);

	for (var i = 0; i < classname.length; i++) {
	classname[i].addEventListener('keydown',enforceFormat);
	classname[i].addEventListener('keyup',formatToPhone);
	}
}



} //end function


formatPhoneNumber('AddressEditorPhoneTextbox','class');  


//if any of the divs on the page are modified fire formatPhoneNumber to add the formatter to new phone number fields
var element = document.getElementsByClassName('LayoutContentInner')[0];

  var observer = new MutationObserver(function (mutations, observer) {
	  console.log(mutations);
    formatPhoneNumber('AddressEditorPhoneTextbox','class');
  });
  observer.observe(element, {
	  attributes: true,
    childList: true,
    characterData: true,
    subtree: true
  });


