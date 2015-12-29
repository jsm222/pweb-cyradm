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

require(["./common"],function(b){require(["app/main2"])});define("../page2",function(){});
define("app/Gridconfig",["app/i18n"],function(b){function c(a){this.columns=a.columns;this.options=a.options;this.url=a.url;this.selector=a.selector;this.deleteText=a.deleteText;this.deleteKey=a.deleteKey}c.prototype={getColumns:function(a){return this.columns},getOptions:function(){return this.options},getBufferText:function(){return b.gettext("Buffering...")},getUrl:function(){return this.url},initHeaderMenu:function(){for(var a=this.columns.length,d=0;d<a;d++)0!=this.columns[d].sortable&&(this.columns[d].header=
{menu:{items:[{iconImage:"../static/css/images/sort-asc.png",title:b.gettext("Sort ascending"),command:"sort-asc"},{iconImage:"../static/css/images/sort-desc.png",title:b.gettext("Sort descending"),command:"sort-desc"}]}})}};return c});
define("app/grid2",["app/Gridconfig","app/i18n"],function(b,c){function a(a){b.call(this,a);return this}a.prototype=Object.create(b.prototype);a.prototype.getDeleteText=function(a){return c.gettext("Delete domain?")};a.prototype.getErrorHeader=function(){return c.gettext("An error occured")};a.prototype.getDialogText=function(a){return c.sprintf(c.gettext("Delete domain %s ?"),a.domain_name)};return a});
define("app/domaingrid",["slick.editors","app/grid2","app/i18n"],function(b,c,a){var d=new c({columns:[{id:"id",name:"id",field:"id",sortable:!0,focusable:!0,editable:!1},{id:"domain_name",name:a.gettext("Domain name"),field:"domain_name",sortable:!0,focusable:!0,editor:b.Text,editable:!0},{id:"alias_domain",name:a.gettext("Alias domain"),field:"is_alias_domain",sortable:!0,focusable:!0,editable:!1,formatter:function(k,d,b,c,g){return"1"===b||1===b?a.gettext("Yes"):a.gettext("No")}},{id:"max_accounts_per_domain",
name:a.gettext("Max accounts"),field:"max_accounts_per_domain",sortable:!0,focusable:!0,editor:b.Integer,editable:!0},{id:"max_quota_per_account",name:a.gettext("Max quota pr. account"),formatter:function(a,b,d,c,g){a=g.max_quota_per_account;b="";a=Number(a);b=["KB","MB","GB","TB","PB"];d=0;if(0==a)return"0 KB";if(1024>a)return b=Number(a)+" "+b[d];for(;1024<=a;)d++,a/=1024;return b=Number(a)+" "+b[d]},field:"max_quota_per_account",sortable:!0,focusable:!0,editor:b.FileSizeEditor,editable:!0},{id:"max_aliases_per_account",
name:a.gettext("Max aliases pr. account"),field:"max_aliases_per_account",sortable:!0,focusable:!0,editor:b.Integer,editable:!0},{id:"managedby",name:a.gettext("Managed by"),field:"users",sfield:"username",formatter:function(a,b,d,c,g){var e="";g.users&&$.map(g.users,function(a){e=e+a.username+","});e=e.slice(0,-1);""==e&&(e="");return e},sortable:!1,editor:b.SelectOptionEditor,seloptions:{url:"/ajax/users",displayName:"username",root:"users"},editable:!0}],options:{rowHeight:24,editable:!0,autoEdit:!1,
fullWidthRows:!1,enableAddRow:!1,forceFitColumns:!0,multiSelect:!1,multiColumnSort:!0,enableCellNavigation:!0,editCommandHandler:function(a,b,c){c.execute();var f={},g=[],e=0,m=0;if("users"==b.field){m=a.users.length;for(e=0;e<m;e++)g.push(a.users[e].id);f.user_id=g}else f[b.field]=a[b.field];f.id=a.id;$.ajax({url:"/ajax/domains",context:c,method:"post",error:c.undo,success:function(a){0===$.parseJSON(a).success&&c.undo();$(d).trigger("row-saved",[$.parseJSON(a),this.row])},data:f})}},url:"/ajax/domains",
deleteText:"domain",deleteKey:"domain_name"});return d});
define("app/Baseform",["app/i18n"],function(b){function c(a){this.el=$($(a)[0]).clone().appendTo("body").attr("class","item-details-form")}c.prototype={show:function(a){$(this.el).draggable({containment:"parent"});$(this.el).css({display:"block"});$(this.el).position({my:"center",at:"center",of:$(window)});a&&($.map($(this.el).find("input:disabled"),function(a){$(a).removeAttr("disabled")}),void 0!=this.selector&&this.makeSelector($(this.el).find("div.multiple")[0],this.selector),void 0!=this.selector2&&
this.makeSelector($(this.el).find("div.multiple")[2],this.selector2))},enableForm:function(){var a=this;$(this.el).find("[data-action\x3dsave]").click(function(){a.save(a.getPostData(),a.getSaveUrl());return!1});$(this.el).find("[data-action\x3dcancel]").click(function(){$(a.el).remove();return!1})},getForm:function(){return $(this.el).find("form")[0]},makeSelector:function(a,b,c){var l=b.displayField,h=b.valueField,f=b.txt,g;g={url:b.url,dataType:"json",quietMillis:100,data:function(a,b){return{q:a,
page_limit:10,page:b}},results:function(a,b){return{results:a.results,more:10*b<a.total}}};f={multiple:b.multiple,placeholder:f,minimumInputLength:1,formatResult:function(a){return a[l]},formatSelection:function(a){return a[l]},id:function(a){return a[h]}};void 0!=b.url&&void 0==b.data?f.ajax=g:(f.minimumInputLength=0,f.data=b.data);$(a).select2(f);void 0!=c&&$(a).select2("data",c);return a},save:function(a,c){form=$(this.el).find("form")[0];$.ajax({method:"post",url:c,data:$(form).serialize()+a,
success:function(a){$(form).trigger("form-saved",[$.parseJSON(a)])},statusCode:{403:function(){dialog=$("\x3cdiv/\x3e");$(dialog).attr("title",b.gettext("An error occured"));$(dialog).append("\x3cp/\x3e"+b.gettext("Permission denied")+"\x3c/p\x3e");$(dialog).dialog({resizable:!1,height:150,closeText:"",modal:!0,buttons:[{text:"Ok",click:function(){$("body").remove($(dialog));$(this).dialog("destroy")}}]})},404:function(){dialog=$("\x3cdiv/\x3e");$(dialog).attr("title",b.gettext("An error occured"));
$(dialog).append("\x3cp\x3e"+b.gettext("Invalid paramters")+"\x3c/p\x3e");$(dialog).dialog({resizable:!1,height:150,closeText:"",modal:!0,buttons:[{text:"Ok",click:function(){$(this).dialog("destroy")}}]})}}});return!1},getDialogText:function(){return b.getttext("Delete domain")}};return c});
define("app/form2",["app/Baseform"],function(b){function c(a){this.selector={url:"/ajax/users",valueField:"id",displayField:"username",root:"users",multiple:!0};b.call(this,a);return this}c.prototype=Object.create(b.prototype);c.prototype.populate=function(a){this.makeSelector($(this.el).find("div.multiple")[0],this.selector,a.users);var b=$(this.el);$.each(a,function(a,c){var h=$(b).find("input[name\x3d"+a+"]");"is_alias_domain"===a?$(h[0]).prop("checked","1"===c||1===c):1==h.length&&$(h[0]).val(c)});
return!1};c.prototype.getPostData=function(){var a="",b=$(this.el).find("div.multiple")[0];$.map($(b).select2("val"),function(b){a=a+"\x26user_id\x3d"+b});return a};c.prototype.getSaveUrl=function(){return"/ajax/domains"};return c});define("app/main2",["jquery","jqueryui","app/domaingrid","app/form2","app/Basegrid"],function(b,c,a,d,k){b(function(){new k(b,a,d)})});