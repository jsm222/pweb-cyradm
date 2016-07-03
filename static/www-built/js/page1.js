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

require(["./common"],function(b){require(["app/main1"])});define("../page1",function(){});
define("app/Gridconfig",["app/i18n"],function(b){function c(a){this.columns=a.columns;this.options=a.options;this.url=a.url;this.selector=a.selector;this.deleteText=a.deleteText;this.deleteKey=a.deleteKey}c.prototype={getColumns:function(){return this.columns},getOptions:function(){return this.options},getBufferText:function(){return b.gettext("Buffering...")},getUrl:function(){return this.url},initHeaderMenu:function(){for(var a=this.columns.length,d=0;d<a;d++)0!=this.columns[d].sortable&&(this.columns[d].header=
{menu:{items:[{iconImage:"../static/css/images/sort-asc.png",title:b.gettext("Sort ascending"),command:"sort-asc"},{iconImage:"../static/css/images/sort-desc.png",title:b.gettext("Sort descending"),command:"sort-desc"}]}})}};return c});define("app/grid1",["app/Gridconfig","app/i18n"],function(b,c){function a(a){b.call(this,a);return this}a.prototype=Object.create(b.prototype);a.prototype.getErrorHeader=function(){return c.gettext("An error occured")};return a});
define("app/usergrid",["slick.editors","app/grid1","app/i18n"],function(b,c,a){var d=new c({columns:[{id:"id",name:"id",field:"id",sortable:!0,focusable:!0,editable:!1},{id:"username",name:a.gettext("Username"),field:"username",sortable:!0,focusable:!0,editable:!1},{id:"auth_item",name:a.gettext("Role"),field:"authitem",formatter:function(a,d,b,e,f){return f.authitem?f.authitem.auth_item:""},sortable:!1,editor:b.SelectOptionEditor,seloptions:{multiple:!1,options:[{auth_item:"Administrator",id:1},
{auth_item:"SuperDomainAdministrator",id:2},{auth_item:"DomainAdministrator",id:3},{auth_item:"AccountUser",id:4}],displayField:"auth_item",txt:a.gettext("Role"),valueField:"id"},editable:!0},{id:"domains",name:a.gettext("Domain(s)"),sfield:"domain_name",field:"domains",formatter:function(a,d,b,e,f){var g="";f.domains&&0<f.domains.length&&($.map(f.domains,function(a){g=g+a.domain_name+","}),g=g.slice(0,-1));""==g&&(g="N/A");return g},sortable:!1,editor:b.SelectOptionEditor,seloptions:{txt:a.gettext("Search for a domain"),
root:"domains",url:"/ajax/domains",displayName:"domain_name"},editable:!0}],options:{rowHeight:24,editable:!0,autoEdit:!1,fullWidthRows:!0,enableAddRow:!1,forceFitColumns:!0,multiSelect:!1,enableColumnReorder:!0,multiColumnSort:!0,enableCellNavigation:!0,editCommandHandler:function(a,b,h){h.execute();var e={},f=[],g=0,c=0;if("authitem"==b.field)e.role_id=a.authitem.id;else if("domains"==b.field){c=a.domains.length;for(g=0;g<c;g++)f.push(a.domains[g].id);e.domain_id=f}else e[b.field]=a[b.field];e.id=
a.id;$.ajax({url:"/ajax/users",context:h,method:"post",error:h.undo,success:function(a){0===$.parseJSON(a).success&&h.undo();$(d).trigger("row-saved",[$.parseJSON(a),this.row])},data:e})}},url:"/ajax/users"});return d});
define("app/Baseform",["app/i18n"],function(b){function c(a){this.el=$($(a)[0]).clone().appendTo("body").attr("class","item-details-form")}c.prototype={show:function(a){$(this.el).draggable({containment:"parent"});$(this.el).css({display:"block"});$(this.el).position({my:"center",at:"center",of:$(window)});a&&($.map($(this.el).find("input:disabled"),function(a){$(a).removeAttr("disabled")}),void 0!=this.selector&&this.makeSelector($(this.el).find("div.multiple")[0],this.selector),void 0!=this.selector2&&
this.makeSelector($(this.el).find("div.multiple")[2],this.selector2))},enableForm:function(){var a=this;$(this.el).find("[data-action\x3dsave]").click(function(){a.save(a.getPostData(),a.getSaveUrl());return!1});$(this.el).find("[data-action\x3dcancel]").click(function(){$(a.el).remove();return!1})},getForm:function(){return $(this.el).find("form")[0]},makeSelector:function(a,d,b){var c=d.displayField,h=d.valueField,e=d.txt,f;f={url:d.url,dataType:"json",quietMillis:100,data:function(a,b){return{q:a,
page_limit:10,page:b}},results:function(a,b){return{results:a.results,more:10*b<a.total}}};e={multiple:d.multiple,placeholder:e,minimumInputLength:1,formatResult:function(a){return a[c]},formatSelection:function(a){return a[c]},id:function(a){return a[h]}};void 0!==d.url&&void 0==d.data?e.ajax=f:(e.minimumInputLength=0,e.data=d.data);$(a).select2(e);void 0!==b&&$(a).select2("data",b);return a},save:function(a,d){form=$(this.el).find("form")[0];$.ajax({method:"post",url:d,data:$(form).serialize()+
a,success:function(a){$(form).trigger("form-saved",[$.parseJSON(a)])},statusCode:{403:function(){dialog=$("\x3cdiv/\x3e");$(dialog).attr("title",b.gettext("An error occured"));$(dialog).append("\x3cp/\x3e"+b.gettext("Permission denied")+"\x3c/p\x3e");$(dialog).dialog({resizable:!1,height:250,closeText:"",modal:!0,buttons:[{text:"Ok",click:function(){$("body").remove($(dialog));$(this).dialog("destroy")}}]})},404:function(){dialog=$("\x3cdiv/\x3e");$(dialog).attr("title",b.gettext("An error occured"));
$(dialog).append("\x3cp\x3e"+b.gettext("Invalid paramters")+"\x3c/p\x3e");$(dialog).dialog({resizable:!1,height:250,closeText:"",modal:!0,buttons:[{text:"Ok",click:function(){$(this).dialog("destroy")}}]})}}});return!1},getDialogText:function(){return b.getttext("Delete domain")}};return c});
define("app/form1",["app/grid1","app/Baseform"],function(b,c){function a(a){this.selector={url:"/ajax/domains?all\x3dtrue",valueField:"id",displayField:"domain_name",root:"domains",multiple:!0};c.call(this,a);return this}a.prototype=Object.create(c.prototype);a.prototype.populate=function(b){this.sel1=this.makeSelector($(this.el).find("div.multiple")[0],this.selector,b.domains);var c=this;$.ajax({url:"/ajax/authitems",method:"post",success:function(a){c.sel2=c.makeSelector($(k).find("div.authitem")[0],
{data:{results:$.parseJSON(a).results,text:"auth_item"},valueField:"id",displayField:"auth_item",txt:"Role",root:"authitems",multiple:!1},b.authitem)}});var k=$(this.el);$.each(b,function(a,b){if("is_alias_domain"===a)b?$("#is_alias_domain").attr("checked","checked"):$("#is_alias_domain").removeAttr("checked");else{var c=$(k).find("input[name\x3d"+a+"]");1==c.length&&$(c[0]).val(b)}});a.prototype.getPostData=function(){var a="";$.map($(this.sel1).select2("val"),function(b){a=a+"\x26domain_id\x3d"+
b});return a=a+"\x26role_id\x3d"+$(this.sel2).select2("val")};a.prototype.getSaveUrl=function(){return"/ajax/users"}};return a});define("app/main1",["jquery","jqueryui","app/usergrid","app/form1","app/Basegrid"],function(b,c,a,d,l){b(function(){new l(b,a,d)})});