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

require(["./common"],function(c){require(["app/main4"])});define("../page4",function(){});
define("app/Gridconfig",["app/i18n"],function(c){function d(b){this.columns=b.columns;this.options=b.options;this.url=b.url;this.selector=b.selector;this.deleteText=b.deleteText;this.deleteKey=b.deleteKey}d.prototype={getColumns:function(){return this.columns},getOptions:function(){return this.options},getBufferText:function(){return c.gettext("Buffering...")},getUrl:function(){return this.url},initHeaderMenu:function(){for(var b=this.columns.length,a=0;a<b;a++)0!=this.columns[a].sortable&&(this.columns[a].header=
{menu:{items:[{iconImage:"../static/css/images/sort-asc.png",title:c.gettext("Sort ascending"),command:"sort-asc"},{iconImage:"../static/css/images/sort-desc.png",title:c.gettext("Sort descending"),command:"sort-desc"}]}})}};return d});
define("app/grid4",["slick.editors","app/Gridconfig","app/i18n"],function(c,d,b){function a(a){d.call(this,a);return this}a.prototype=Object.create(d.prototype);a.prototype.getDialogText=function(a){return"Delete alias "+a.alias+" for "+a.dest+"?"};a.prototype.getDeleteText=function(a){return b.gettext("Delete alias?")};a.prototype.getDialogText=function(a){return b.sprintf(b.gettext("Delete alias %s ?"),a.alias)};a.prototype.getErrorHeader=function(){return b.gettext("An error occured")};a.prototype.getSelectorText=
function(a){return void 0==a?b.gettext("Search for an account"):2===a?b.gettext("Search for a domain"):""};return a});
define("app/aliasgrid",["app/grid4","app/i18n"],function(c,d){return new c({columns:[{id:"id",name:"id",field:"id",sortable:!0,focusable:!0,editable:!1},{id:"alias",name:d.gettext("Alias"),field:"alias",sortable:!0,focusable:!0,editable:!1},{id:"username",name:d.gettext("Account"),field:"dest",sortable:!0,focusable:!0,editable:!1},{id:"userid",name:d.gettext("User id"),field:"user",sortable:!1,focusable:!0,searchable:!1,editable:!1,formatter:function(b,a,c,d,f){return f.user.id}}],options:{rowHeight:24,
editable:!0,autoEdit:!1,fullWidthRows:!1,enableAddRow:!1,forceFitColumns:!0,multiSelect:!1,multiColumnSort:!0,enableCellNavigation:!0,editCommandHandler:function(b,a,c){c.execute();var d={};d[a.field]=b[a.field];d.id=b.id;$.ajax({url:"/ajax/aliases",context:c,method:"post",error:c.undo,data:d})}},url:"/ajax/aliases"})});
define("app/Baseform",["app/i18n"],function(c){function d(b){this.el=$($(b)[0]).clone().appendTo("body").attr("class","item-details-form")}d.prototype={show:function(b){$(this.el).draggable({containment:"parent"});$(this.el).css({display:"block"});$(this.el).position({my:"center",at:"center",of:$(window)});b&&($.map($(this.el).find("input:disabled"),function(a){$(a).removeAttr("disabled")}),void 0!=this.selector&&this.makeSelector($(this.el).find("div.multiple")[0],this.selector),void 0!=this.selector2&&
this.makeSelector($(this.el).find("div.multiple")[2],this.selector2))},enableForm:function(){var b=this;$(this.el).find("[data-action\x3dsave]").click(function(){b.save(b.getPostData(),b.getSaveUrl());return!1});$(this.el).find("[data-action\x3dcancel]").click(function(){$(b.el).remove();return!1})},getForm:function(){return $(this.el).find("form")[0]},makeSelector:function(b,a,c){var d=a.displayField,f=a.valueField,e=a.txt,g;g={url:a.url,dataType:"json",quietMillis:100,data:function(a,b){return{q:a,
page_limit:10,page:b}},results:function(a,b){return{results:a.results,more:10*b<a.total}}};e={multiple:a.multiple,placeholder:e,minimumInputLength:1,formatResult:function(a){return a[d]},formatSelection:function(a){return a[d]},id:function(a){return a[f]}};void 0!==a.url&&void 0==a.data?e.ajax=g:(e.minimumInputLength=0,e.data=a.data);$(b).select2(e);void 0!==c&&$(b).select2("data",c);return b},save:function(b,a){form=$(this.el).find("form")[0];$.ajax({method:"post",url:a,data:$(form).serialize()+
b,success:function(a){$(form).trigger("form-saved",[$.parseJSON(a)])},statusCode:{403:function(){dialog=$("\x3cdiv/\x3e");$(dialog).attr("title",c.gettext("An error occured"));$(dialog).append("\x3cp/\x3e"+c.gettext("Permission denied")+"\x3c/p\x3e");$(dialog).dialog({resizable:!1,height:250,closeText:"",modal:!0,buttons:[{text:"Ok",click:function(){$("body").remove($(dialog));$(this).dialog("destroy")}}]})},404:function(){dialog=$("\x3cdiv/\x3e");$(dialog).attr("title",c.gettext("An error occured"));
$(dialog).append("\x3cp\x3e"+c.gettext("Invalid paramters")+"\x3c/p\x3e");$(dialog).dialog({resizable:!1,height:250,closeText:"",modal:!0,buttons:[{text:"Ok",click:function(){$(this).dialog("destroy")}}]})}}});return!1},getDialogText:function(){return c.getttext("Delete domain")}};return d});
define("app/form4",["app/aliasgrid","app/Baseform"],function(c,d){function b(a){this.selector={url:"/ajax/accounts",valueField:"id",displayField:"username",root:c.getSelectorText(),multiple:!1};this.selector2={url:"/ajax/domains?all\x3dtrue",valueField:"id",displayField:"domain_name",root:c.getSelectorText(2),multiple:!1};d.call(this,a);return this}b.prototype=Object.create(d.prototype);b.prototype.populate=function(a){var b=$(this.el);$.each(a,function(a,c){"alias"===a&&(c=c.split("@")[0]);var d=
$(b).find("input[name\x3d"+a+"]");1==d.length&&$(d[0]).val(c)});newRecord={};newRecord.domain_name=a.alias_domain.domain_name;newRecord.id=a.alias_domain.id;this.makeSelector($(this.el).find("div.multiple")[1],this.selector2,newRecord);newRecord={};newRecord.username=a.dest;newRecord.id=a.user.id;a=this.makeSelector($(this.el).find("div.multiple")[0],this.selector,newRecord);$(a).select2("disable")};b.prototype.getPostData=function(){var a="";"none"!=$($(this.el).find("div.multiple")[0]).css("display")&&
(a="\x26user_id\x3d"+$($(this.el).find("div.multiple")[0]).select2("val"));"none"!=$($(this.el).find("div.multiple")[2]).css("display")&&(a=a+"\x26domain_id\x3d"+$($(this.el).find("div.multiple")[2]).select2("val"));return a};b.prototype.getSaveUrl=function(){return"/ajax/aliases"};return b});define("app/main4",["jquery","jqueryui","app/aliasgrid","app/form4","app/Basegrid"],function(c,d,b,a,h){c(function(){new h(c,b,a)})});