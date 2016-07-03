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

define(["app/i18n"],function(c){function e(a){this.el=$($(a)[0]).clone().appendTo("body").attr("class","item-details-form")}e.prototype={show:function(a){$(this.el).draggable({containment:"parent"});$(this.el).css({display:"block"});$(this.el).position({my:"center",at:"center",of:$(window)});a&&($.map($(this.el).find("input:disabled"),function(a){$(a).removeAttr("disabled")}),void 0!=this.selector&&this.makeSelector($(this.el).find("div.multiple")[0],this.selector),void 0!=this.selector2&&this.makeSelector($(this.el).find("div.multiple")[2],
this.selector2))},enableForm:function(){var a=this;$(this.el).find("[data-action\x3dsave]").click(function(){a.save(a.getPostData(),a.getSaveUrl());return!1});$(this.el).find("[data-action\x3dcancel]").click(function(){$(a.el).remove();return!1})},getForm:function(){return $(this.el).find("form")[0]},makeSelector:function(a,b,c){var e=b.displayField,g=b.valueField,d=b.txt,f;f={url:b.url,dataType:"json",quietMillis:100,data:function(a,b){return{q:a,page_limit:10,page:b}},results:function(a,b){return{results:a.results,
more:10*b<a.total}}};d={multiple:b.multiple,placeholder:d,minimumInputLength:1,formatResult:function(a){return a[e]},formatSelection:function(a){return a[e]},id:function(a){return a[g]}};void 0!==b.url&&void 0==b.data?d.ajax=f:(d.minimumInputLength=0,d.data=b.data);$(a).select2(d);void 0!==c&&$(a).select2("data",c);return a},save:function(a,b){form=$(this.el).find("form")[0];$.ajax({method:"post",url:b,data:$(form).serialize()+a,success:function(a){$(form).trigger("form-saved",[$.parseJSON(a)])},
statusCode:{403:function(){dialog=$("\x3cdiv/\x3e");$(dialog).attr("title",c.gettext("An error occured"));$(dialog).append("\x3cp/\x3e"+c.gettext("Permission denied")+"\x3c/p\x3e");$(dialog).dialog({resizable:!1,height:250,closeText:"",modal:!0,buttons:[{text:"Ok",click:function(){$("body").remove($(dialog));$(this).dialog("destroy")}}]})},404:function(){dialog=$("\x3cdiv/\x3e");$(dialog).attr("title",c.gettext("An error occured"));$(dialog).append("\x3cp\x3e"+c.gettext("Invalid paramters")+"\x3c/p\x3e");
$(dialog).dialog({resizable:!1,height:250,closeText:"",modal:!0,buttons:[{text:"Ok",click:function(){$(this).dialog("destroy")}}]})}}});return!1},getDialogText:function(){return c.getttext("Delete domain")}};return e});