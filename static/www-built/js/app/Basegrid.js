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

define("jquery jqueryui slick.grid plugins/slick.rowselectionmodel plugins/slick.headermenu slick.remotemodel slick.editors".split(" "),function(r,t,m,n,p,q,u){return function(a,g,k){a.ajaxSettings.traditional=!0;var c,f=new q;g.initHeaderMenu();a.map(g.getColumns(),function(b){0!=b.searchable&&a("#searchField").append(a("\x3coption\x3e\x3c/option\x3e").attr("value",void 0!=b.sfield?b.sfield:b.field).text(b.name))});a("#searchField").select2();f.setUrl(g.getUrl());var h=null;a("#openCreateButton").click(function(){var b=
new k("div.item-details-form-tmpl");a(b.getForm()).on("form-saved",function(e,d){if(void 0!=d.success&&0===d.success)dialog=a("\x3cdiv/\x3e"),a(dialog).attr("title",g.getErrorHeader()),a(dialog).append("\x3cp\x3e\x3c/p\x3e").append(document.createTextNode(d.errorMsg)),a(dialog).dialog({resizable:!1,height:250,closeText:"",modal:!0,buttons:[{text:"Ok",click:function(){a(this).dialog("destroy")}}]});else{a(b.getForm()).find("input[name\x3did]").val(d.id);f.clear();var l=c.getViewport();f.ensureData(l.top,
l.bottom);c.updateRowCount();c.resizeCanvas();a(b.el).remove()}});b.enableForm();b.show(!0);return!1});a("#openDeleteButton").click(function(){var b=c.getSelectedRows()[0],e={},e=c.getDataItem(b),d=g.getDeleteText(e),b=a("\x3cdiv/\x3e");a(b).attr("title",d);a(b).attr("id","dialog-confirm");d=a("\x3cspan\x3e\x3c/span\x3e").addClass("ui-icon").addClass("ui-icon-alert");a(d).css({"float":"left",margin:"0 7px 20px 0"});a("\x3cp\x3e\x3c/p\x3e").append(d).append(g.getDialogText(e)).appendTo(a(b));a(b).dialog({resizable:!1,
height:250,closeText:"",modal:!0,buttons:{Yes:function(){a(this).dialog("close");a.ajax({success:function(){f.clear();var a=c.getViewport();f.ensureData(a.top,a.bottom)},method:"post",url:g.getUrl(),data:{id:e.id,action:"delete"}})},No:function(){a(this).dialog("close")}}});return!1});a("#openDetailsButton").click(function(){var b=c.getSelectedRows()[0],e=new k("div.item-details-form-tmpl");a(e.getForm()).on("form-saved",function(d,f){if(void 0!==f.success&&0===f.success){var h=a("\x3cdiv/\x3e");
a(h).attr("title",g.getErrorHeader());a(h).append("\x3cp\x3e\x3c/p\x3e").append(document.createTextNode(f.errorMsg));a(h).dialog({resizable:!1,height:250,closeText:"",modal:!0,buttons:[{text:"Ok",click:function(){a(this).dialog("destroy")}}]})}else c.invalidateRow(b),c.getData()[b]=f,c.render(),a(e.el).remove()});e.populate(c.getDataItem(b));e.enableForm();e.show()});a(g).on("row-saved",function(b,e,d){0===e.success?(b=a("\x3cdiv/\x3e"),a(b).attr("title",g.getErrorHeader()),a(b).append("\x3cp\x3e\x3c/p\x3e").append(document.createTextNode(e.errorMsg)),
a(b).dialog({resizable:!1,height:250,closeText:"",modal:!0,buttons:[{text:"Ok",click:function(){a(this).dialog("destroy")}}]})):(c.invalidateRow(d),c.getData()[d]=e,c.render());return!1});c=new m("#myGrid",f.data,g.getColumns(),g.getOptions());c.onViewportChanged.subscribe(function(a,e){var d=c.getViewport();f.ensureData(d.top,d.bottom)});c.onSort.subscribe(function(a,e){f.setSort(e.sortCols);var d=c.getViewport();f.ensureData(d.top,d.bottom)});f.onDataLoading.subscribe(function(){h||(h=a("\x3cspan class\x3d'loading-indicator'\x3e\x3clabel\x3e"+
g.getBufferText()+"\x3c/label\x3e\x3c/span\x3e").appendTo(document.body),a("#myGrid"),a(h).position({postition:"center",of:"#myGrid"}));h.show()});f.onDataLoaded.subscribe(function(a,e){for(var d=e.from;d<=e.to;d++)c.invalidateRow(d);c.updateRowCount();c.render();c.resizeCanvas();h.fadeOut()});c.setSelectionModel(new n);headerMenuPlugin=new p;headerMenuPlugin.onCommand.subscribe(function(a,e){f.setSort([{sortAsc:"sort-asc"==e.command,sortCol:{field:e.column.field}}]);var d=c.getViewport();f.ensureData(d.top,
d.bottom)});c.registerPlugin(headerMenuPlugin);f.setSearch("","t1.id");f.setSort([{field:"username",sortAsc:!0}]);c.setSortColumn("id",!1);c.setSortColumn("username",!1);c.onViewportChanged.notify();c.updateRowCount();a("#txtSearch").keyup(function(b){13==b.which&&(f.setSearch(a("#txtSearch").val(),a("#searchField").val()),b=c.getViewport(),f.ensureData(b.top,b.bottom))});a("#myGrid").show()}});