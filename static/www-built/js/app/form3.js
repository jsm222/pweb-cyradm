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

define(["app/Baseform","slick.formatters"],function(c,f){function b(a){this.selector={url:"/ajax/domains",valueField:"id",displayField:"domain_name",root:"domains",multiple:!1};c.call(this,a);return this}b.prototype=Object.create(c.prototype);b.prototype.populate=function(a){$($(this.el).find("div.multiple")[0]).select2("destroy");$($(this.el).find("div.multiple")[0]).hide();$($(this.el).find("label.multiple")[0]).hide();var b=$(this.el);$.each(a,function(a,d){var e=$(b).find("input[name\x3d"+a+"]");
if("quota"===a){var c=$(b).find("input[name\x3dquota_text]")[0];$(c).val(f.FileSizeFormatter(void 0,void 0,d));$(e[0]).val(d)}else 1===e.length&&$(e[0]).val(d)})};b.prototype.getPostData=function(){$(this.getForm()).find("input[name\x3dquota]").eq(0).val(f.FileSizeParser($(this.getForm()).find("input[name\x3dquota_text]").eq(0).val()));var a="";"none"!=$($(this.el).find("div.multiple")[0]).css("display")&&(a="\x26domain_id\x3d"+$($(this.el).find("div.multiple")[0]).select2("val"));return a};b.prototype.getSaveUrl=
function(){return"/ajax/accounts"};return b});