//data-AutocompleteSettings (autocomplete url "&o=") avaialable settings numresults=10,noattribs,nomfgs,noprods,nocats or +this.element.attr('data-AutocompleteSettings') to grab settings from the page

//autocomplete function

function initiate_autocomplete(element){

element.autocomplete({

minLength: 2,
source: function(request, response) {
$.ajax({
	type: "GET",
	url: "/store/Autocomplete.aspx?q=" + request.term + "&o=" + this.element.attr('data-AutocompleteSettings'),
	contentType: "application/json; charset=utf-8",
	dataType: "json"
	})
	.done(function(data) {
		response($.map(data, function(item) {
		return {
	label: item.Name + " (" + item.Type + ")",
	value: item.Name
	};
	}));
	})
	.success(function(data){console.log('AutoSearch Results: ');console.log(data);})
	.select(function(event, ui) {

		if(ui.item.type=="Category"){
			var cat_id=ui.item.id;
			window.location='/store/Category.aspx?catID='+cat_id;
		}

		else if(ui.item.type=="Product"){
			var item_id=ui.item.id;
			window.location='/store/ProductDetails.aspx?itemID='+item_id; 
		}

		else{
			event.target.value = ui.item.value;
			$("input[id$='" + event.target.getAttribute("data-button-id") + "'").click();
		}
	});

}
	});
}


function override_autosearch(){
  $('input:text.AutocompleteSearchBox').autocomplete( "destroy" ); //remove any previously defined autocomplete
  $('input:text.AutocompleteSearchBox').each(function(){initiate_autocomplete($(this));});// for each autosearch enabled search box   
}//end function to override built in autosearch

$(function(){
  setTimeout(override_autosearch(),250);//wait for 250 milliseconds to make sure page is loaded then override the default autocomplete 
});
