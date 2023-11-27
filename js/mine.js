jQuery.fn.dataTableExt.oSort['shortdate-asc']  = function(x,y) {
	var xi=x.indexOf("<br>");
	if(xi>-1) x = x.substr(0, xi)
	xi=x.indexOf("-");
	if(xi>-1) {
		var x1 = x.substr(0, xi);
		var x2 = x.substr(x.indexOf(","));
		x=x1+x2;
	}
	
	
	var yi=y.indexOf("<br>");
	if(yi>-1) y = y.substr(0, yi)
	yi=y.indexOf("-");
	if(yi>-1) {
		var y1 = y.substr(0, yi);
		var y2 = y.substr(y.indexOf(","));
		y=y1+y2;								
	}
	
	x=Date.parse(x);
	y=Date.parse(y);
	return ((x < y) ? -1 : ((x > y) ?  1 : 0));
};


jQuery.fn.dataTableExt.oSort['shortdate-desc']  = function(x,y) {
	var xi=x.indexOf("<br>");
	if(xi>-1) x = x.substr(0, xi)
	xi=x.indexOf("-");
	if(xi>-1) {
		var x1 = x.substr(0, xi);
		var x2 = x.substr(x.indexOf(","));
		x=x1+x2;
	}
	
	var yi=y.indexOf("<br>");
	if(yi>-1) y = y.substr(0, yi)
	yi=y.indexOf("-");
	if(yi>-1) {
		var y1 = y.substr(0, yi);
		var y2 = y.substr(y.indexOf(","));
		y=y1+y2;								
	}
			 
	x=Date.parse(x);
	y=Date.parse(y);
 
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};


	$(document).ready(function() {
    $('#myTable').DataTable( {
		"ajax": {
    "url": "documents/list.txt",
    "dataSrc": "data"
  },
		columns:[
			{title:"Title",render:function(data,type,row){
				if(data.length>19){
				return '<a href="articles/'+row[4]+'">' + data.substr(0,9) + '...</a>';
				}
				else{
				return '<a href="articles/'+row[4]+'">' + data+ '</a>';
				}
			}
			},
			{title:"Author"},
			{title:"Research area"},
			{title:"Date"}
		],
		"order": [[ 3, "desc" ]],
        initComplete: function () {
            this.api().columns([1,2]).every( function () {
                var column = this;
                var select = $('<select><option value="">show all</option></select>')
                    .appendTo( $(column.footer()).empty() )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
 
                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );
 
                column.data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                } );
            } );
        }
    } );
} );
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$('a.page-scroll').bind('click', function(event) {
		var entry = $(this);
		$('html, body').stop().animate({
			scrollTop: ($(entry.attr('href')).offset().top-50)
		}, 1000);
		event.preventDefault();
	});

function bodyLoad(){
// Check if a new cache is available on page load. 
window.addEventListener('load', function(e) { 
window.applicationCache.addEventListener('updateready', function(e) { 
if (window.applicationCache.status == window.applicationCache.UPDATEREADY) { 
// Browser downloaded a new app cache. 
// Swap it in and reload the page to get the new hotness. 
window.applicationCache.swapCache(); 
if (confirm('A new version of this site is available. Load it?')) { 
window.location.reload(); 
} 
} else { 
// Manifest didn't changed. Nothing new to server. 
} 
}, false); 
}, false); 
}
