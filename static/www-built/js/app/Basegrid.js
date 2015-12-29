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

define("jquery jqueryui slick.grid plugins/slick.rowselectionmodel plugins/slick.headermenu slick.remotemodel slick.editors".split(" "),function(r,t,m,n,p,q,u){return function(a,g,k){a.ajaxSettings.traditional=!0;var b,f=new q;g.initHeaderMenu();a.map(g.getColumns(),function(c){0!=c.searchable&&a("#searchField").append(a("\x3coption\x3e\x3c/option\x3e").attr("value",void 0!=c.sfield?c.sfield:c.field).text(c.name))});a("#searchField").select2();f.setUrl(g.getUrl());var h=null;a("#openCreateButton").click(function(){var c=
new k("div.item-details-form-tmpl");a(c.getForm()).on("form-saved",function(e,d){if(void 0!=d.success&&0===d.success)dialog=a("\x3cdiv/\x3e"),a(dialog).attr("title",g.getErrorHeader()),a(dialog).append("\x3cp\x3e\x3c/p\x3e").append(document.createTextNode(d.errorMsg)),a(dialog).dialog({resizable:!1,height:150,closeText:"",modal:!0,buttons:[{text:"Ok",click:function(){a(this).dialog("destroy")}}]});else{a(c.getForm()).find("input[name\x3did]").val(d.id);f.clear();var l=b.getViewport();f.ensureData(l.top,
l.bottom);b.updateRowCount();b.resizeCanvas();a(c.el).remove()}});c.enableForm();c.show(!0);return!1});a("#openDeleteButton").click(function(){var c=b.getSelectedRows()[0],e={},e=b.getDataItem(c),d=g.getDeleteText(e),c=a("\x3cdiv/\x3e");a(c).attr("title",d);a(c).attr("id","dialog-confirm");d=a("\x3cspan\x3e\x3c/span\x3e").addClass("ui-icon").addClass("ui-icon-alert");a(d).css({"float":"left",margin:"0 7px 20px 0"});a("\x3cp\x3e\x3c/p\x3e").append(d).append(g.getDialogText(e)).appendTo(a(c));a(c).dialog({resizable:!1,
height:150,closeText:"",modal:!0,buttons:{Yes:function(){a(this).dialog("close");a.ajax({success:function(){f.clear();var a=b.getViewport();f.ensureData(a.top,a.bottom)},method:"post",url:g.getUrl(),data:{id:e.id,action:"delete"}})},No:function(){a(this).dialog("close")}}});return!1});a("#openDetailsButton").click(function(){var c=b.getSelectedRows()[0],e=new k("div.item-details-form-tmpl");a(e.getForm()).on("form-saved",function(d,f){void 0!=f.success&&0===f.success?(dialog=a("\x3cdiv/\x3e"),a(dialog).attr("title",
g.getErrorHeader()),a(dialog).append("\x3cp\x3e\x3c/p\x3e").append(document.createTextNode(f.errorMsg)),a(dialog).dialog({resizable:!1,height:150,closeText:"",modal:!0,buttons:[{text:"Ok",click:function(){a(this).dialog("destroy")}}]})):(b.invalidateRow(c),b.getData()[c]=f,b.render(),a(e.el).remove())});e.populate(b.getDataItem(c));e.enableForm();e.show()});a(g).on("row-saved",function(c,e,d){0===e.success?(dialog=a("\x3cdiv/\x3e"),a(dialog).attr("title",g.getErrorHeader()),a(dialog).append("\x3cp\x3e\x3c/p\x3e").append(document.createTextNode(e.errorMsg)),
a(dialog).dialog({resizable:!1,height:150,closeText:"",modal:!0,buttons:[{text:"Ok",click:function(){a(this).dialog("destroy")}}]})):(b.invalidateRow(d),b.getData()[d]=e,console.dir(e),b.render());return!1});b=new m("#myGrid",f.data,g.getColumns(),g.getOptions());b.onViewportChanged.subscribe(function(a,e){var d=b.getViewport();f.ensureData(d.top,d.bottom)});b.onSort.subscribe(function(a,e){f.setSort(e.sortCols);var d=b.getViewport();f.ensureData(d.top,d.bottom)});f.onDataLoading.subscribe(function(){h||
(h=a("\x3cspan class\x3d'loading-indicator'\x3e\x3clabel\x3e"+g.getBufferText()+"\x3c/label\x3e\x3c/span\x3e").appendTo(document.body),a("#myGrid"),a(h).position({postition:"center",of:"#myGrid"}));h.show()});f.onDataLoaded.subscribe(function(a,e){for(var d=e.from;d<=e.to;d++)b.invalidateRow(d);b.updateRowCount();b.render();b.resizeCanvas();h.fadeOut()});b.setSelectionModel(new n);headerMenuPlugin=new p;headerMenuPlugin.onCommand.subscribe(function(a,e){f.setSort([{sortAsc:"sort-asc"==e.command,sortCol:{field:e.column.field}}]);
var d=b.getViewport();f.ensureData(d.top,d.bottom)});b.registerPlugin(headerMenuPlugin);f.setSearch("","t1.id");f.setSort([{field:"username",sortAsc:!0}]);b.setSortColumn("id",!1);b.setSortColumn("username",!1);b.onViewportChanged.notify();b.updateRowCount();a("#txtSearch").keyup(function(c){13==c.which&&(f.setSearch(a("#txtSearch").val(),a("#searchField").val()),c=b.getViewport(),f.ensureData(c.top,c.bottom))});a("#myGrid").show()}});