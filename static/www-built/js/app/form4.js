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

define(["app/aliasgrid","app/Baseform"],function(c,e){function b(a){this.selector={url:"/ajax/accounts",valueField:"id",displayField:"username",root:c.getSelectorText(),multiple:!1};this.selector2={url:"/ajax/domains?all\x3dtrue",valueField:"id",displayField:"domain_name",root:c.getSelectorText(2),multiple:!1};e.call(this,a);return this}b.prototype=Object.create(e.prototype);b.prototype.populate=function(a){var b=$(this.el);$.each(a,function(a,d){"alias"===a&&(d=d.split("@")[0]);var c=$(b).find("input[name\x3d"+
a+"]");1==c.length&&$(c[0]).val(d)});newRecord={};newRecord.domain_name=a.alias_domain.domain_name;newRecord.id=a.alias_domain.id;this.makeSelector($(this.el).find("div.multiple")[1],this.selector2,newRecord);newRecord={};newRecord.username=a.dest;newRecord.id=a.user.id;a=this.makeSelector($(this.el).find("div.multiple")[0],this.selector,newRecord);$(a).select2("disable")};b.prototype.getPostData=function(){var a="";"none"!=$($(this.el).find("div.multiple")[0]).css("display")&&(a="\x26user_id\x3d"+
$($(this.el).find("div.multiple")[0]).select2("val"));"none"!=$($(this.el).find("div.multiple")[2]).css("display")&&(a=a+"\x26domain_id\x3d"+$($(this.el).find("div.multiple")[2]).select2("val"));return a};b.prototype.getSaveUrl=function(){return"/ajax/aliases"};return b});