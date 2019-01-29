// get the results from /store/sitemonitor.aspx and parse into array and output the version of the site

//function from https://stackoverflow.com/a/1099670
function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

$.get('https://secure.cougarpartscatalog.com/store/sitemonitor.aspx',function(data){
var site_status = getQueryParams(data);
console.log("Site Version: "+site_status['Code Version']);
});
