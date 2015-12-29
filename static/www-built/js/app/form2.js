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

define(["app/Baseform"],function(e){function a(b){this.selector={url:"/ajax/users",valueField:"id",displayField:"username",root:"users",multiple:!0};e.call(this,b);return this}a.prototype=Object.create(e.prototype);a.prototype.populate=function(b){this.makeSelector($(this.el).find("div.multiple")[0],this.selector,b.users);var a=$(this.el);$.each(b,function(b,c){var d=$(a).find("input[name\x3d"+b+"]");"is_alias_domain"===b?$(d[0]).prop("checked","1"===c||1===c):1==d.length&&$(d[0]).val(c)});return!1};
a.prototype.getPostData=function(){var b="",a=$(this.el).find("div.multiple")[0];$.map($(a).select2("val"),function(a){b=b+"\x26user_id\x3d"+a});return b};a.prototype.getSaveUrl=function(){return"/ajax/domains"};return a});