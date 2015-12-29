/* 
 * The MIT License
 *
 * Copyright 2015 Jesper Schmitz Mouridsen.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


/* 
 * The MIT License
 *
 * Copyright 2015 Jesper Schmitz Mouridsen.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


define(["jquery","jqueryui","slick.grid","plugins/slick.rowselectionmodel","plugins/slick.headermenu","slick.remotemodel","slick.editors"],function($,ui,slickgrid,rowsel,hMenu,remoteModel,editor) {
  function bgrid($,config,form) 
  {

	$.ajaxSettings.traditional = true;

  var grid,loader = new remoteModel();
 config.initHeaderMenu();
  
$.map(config.getColumns(), function(item) {
	if(!(item.searchable==false)) {   
     $('#searchField')
         .append($("<option></option>")
         .attr("value",((item.sfield!=undefined) ? item.sfield : item.field))
         .text(item['name'])); 
}
});
  $('#searchField').select2();
  loader.setUrl(config.getUrl());	
   

  var loadingIndicator = null;                  

$("#openCreateButton").click(function() {
    var formular = new form("div.item-details-form-tmpl");
$(formular.getForm()).on("form-saved",function(e,data) {

if(data.success != undefined && data.success===0) {
dialog = $("<div/>");
$(dialog).attr("title",config.getErrorHeader());
$(dialog).append("<p></p>").append(document.createTextNode(data.errorMsg));
$(dialog).dialog({
resizable: false,
height:150,
closeText:'',
modal: true,
buttons: [ { text: "Ok", click: function() { $( this ).dialog( "destroy" );  } }]
});


} else {
$(formular.getForm()).find("input[name=id]").val(data.id);
loader.clear();
var vp = grid.getViewport();
loader.ensureData(vp.top, vp.bottom);
      grid.updateRowCount();
      grid.resizeCanvas();
$(formular.el).remove();
}
});
formular.enableForm();
formular.show(true);
return false;
}); 
 

$("#openDeleteButton").click(function() {

var row = (grid.getSelectedRows())[0],record = {},dialog;
record = grid.getDataItem(row);
var myDeleteText = config.getDeleteText(record);
dialog = $("<div/>");
$(dialog).attr("title",myDeleteText);

$(dialog).attr("id","dialog-confirm");
var s = $("<span></span>").addClass("ui-icon").addClass("ui-icon-alert");
$(s).css({'float':"left",margin: "0 7px 20px 0"});
$("<p></p>").append(s).append(config.getDialogText(record)).appendTo($(dialog));
$(dialog).dialog({
resizable: false,
height:150,
closeText:'',
modal: true,
buttons: {
"Yes": function() {
$( this ).dialog( "close" );
$.ajax({
success:function() {
loader.clear();
var vp = grid.getViewport();
loader.ensureData(vp.top, vp.bottom);
}, 
method:'post',url:config.getUrl(),data:{id:record.id,action:'delete'}});
},
"No": function() {
$( this ).dialog( "close" );
}
}
});


return false;
}); 
 

 $("#openDetailsButton").click(function() {
    var row = (grid.getSelectedRows())[0];
    var formular = new form("div.item-details-form-tmpl");	
$(formular.getForm()).on("form-saved",function(e,data) {
if(data.success != undefined && data.success===0) {
dialog = $("<div/>");
$(dialog).attr("title",config.getErrorHeader());
$(dialog).append("<p></p>").append(document.createTextNode(data.errorMsg));
$(dialog).dialog({
resizable: false,
height:150,
closeText:'',
modal: true,
buttons: [ { text: "Ok", click: function() { $(this).dialog("destroy"); } } ]
});
} else {
grid.invalidateRow(row);
(grid.getData())[row]=data;
grid.render();
 	$(formular.el).remove();
}
});
formular.populate(grid.getDataItem(row));
formular.enableForm();
formular.show();
});
$(config).on("row-saved",function(e,data,row) {
  if(data.success===0) {
    dialog = $("<div/>");
$(dialog).attr("title",config.getErrorHeader());
$(dialog).append("<p></p>").append(document.createTextNode(data.errorMsg));
$(dialog).dialog({
resizable: false,
height:150,
closeText:'',
modal: true,
buttons: [ { text: "Ok", click: function() {$( this ).dialog( "destroy" ); } } ]
});
	
	} else {
grid.invalidateRow(row);
(grid.getData())[row]=data;
console.dir(data);
grid.render();
	}
return false;
	
 });   	
    grid = new slickgrid("#myGrid", loader.data, config.getColumns(), config.getOptions());
grid.onViewportChanged.subscribe(function (e, args) {
      var vp = grid.getViewport();
      loader.ensureData(vp.top, vp.bottom);
    });

    grid.onSort.subscribe(function (e, args) {
      loader.setSort(args.sortCols);
      var vp = grid.getViewport();
      loader.ensureData(vp.top, vp.bottom);
    });

    loader.onDataLoading.subscribe(function () {
      if (!loadingIndicator) {
        loadingIndicator = $("<span class='loading-indicator'><label>"+config.getBufferText()+"</label></span>").appendTo(document.body);
        var $g = $("#myGrid");
	
        $(loadingIndicator).position({"postition":"center","of":"#myGrid"});
      }

      loadingIndicator.show();
    });

    loader.onDataLoaded.subscribe(function (e, args) {
      for (var i = args.from; i <= args.to; i++) {
        grid.invalidateRow(i);
      }

      grid.updateRowCount();
      grid.render();
        grid.resizeCanvas();
      loadingIndicator.fadeOut();
    });


    grid.setSelectionModel(new rowsel);
headerMenuPlugin = new hMenu();
  headerMenuPlugin.onCommand.subscribe(function(e, args) {
	var sortfield = args.column.field;
	 			
      loader.setSort([{sortAsc:(args.command == 'sort-asc'),sortCol:{field:sortfield}}]);
var vp = grid.getViewport();
        loader.ensureData(vp.top, vp.bottom);
    });
	
    grid.registerPlugin(headerMenuPlugin);
    loader.setSearch("","t1.id");	
    loader.setSort([{field:'username',sortAsc:true}]);
    grid.setSortColumn("id", false);
    grid.setSortColumn("username", false);

    // load the first page
    grid.onViewportChanged.notify();
    grid.updateRowCount();	
  	
	$("#txtSearch").keyup(function (e) {
      if (e.which == 13) { 
	 loader.setSearch($("#txtSearch").val(),$("#searchField").val());
	      var vp = grid.getViewport();
	      loader.ensureData(vp.top, vp.bottom);
}
});
	$("#myGrid").show();
}
return bgrid;
});

  


