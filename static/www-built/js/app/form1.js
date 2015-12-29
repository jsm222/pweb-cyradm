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

define(["app/grid1","app/Baseform"],function(f,b){function a(a){this.selector={url:"/ajax/domains?all\x3dtrue",valueField:"id",displayField:"domain_name",root:"domains",multiple:!0};b.call(this,a);return this}a.prototype=Object.create(b.prototype);a.prototype.populate=function(d){this.sel1=this.makeSelector($(this.el).find("div.multiple")[0],this.selector,d.domains);var b=this;$.ajax({url:"/ajax/authitems",method:"post",success:function(c){b.sel2=b.makeSelector($(e).find("div.authitem")[0],{data:{results:$.parseJSON(c).results,
text:"auth_item"},valueField:"id",displayField:"auth_item",txt:"Role",root:"authitems",multiple:!1},d.authitem)}});var e=$(this.el);$.each(d,function(c,a){if("is_alias_domain"===c)a?$("#is_alias_domain").attr("checked","checked"):$("#is_alias_domain").removeAttr("checked");else{var b=$(e).find("input[name\x3d"+c+"]");1==b.length&&$(b[0]).val(a)}});a.prototype.getPostData=function(){var a="";$.map($(this.sel1).select2("val"),function(b){a=a+"\x26domain_id\x3d"+b});return a=a+"\x26role_id\x3d"+$(this.sel2).select2("val")};
a.prototype.getSaveUrl=function(){return"/ajax/users"}};return a});