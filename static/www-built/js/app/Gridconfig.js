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

define(["app/i18n"],function(c){function d(a){this.columns=a.columns;this.options=a.options;this.url=a.url;this.selector=a.selector;this.deleteText=a.deleteText;this.deleteKey=a.deleteKey}d.prototype={getColumns:function(){return this.columns},getOptions:function(){return this.options},getBufferText:function(){return c.gettext("Buffering...")},getUrl:function(){return this.url},initHeaderMenu:function(){for(var a=this.columns.length,b=0;b<a;b++)0!=this.columns[b].sortable&&(this.columns[b].header=
{menu:{items:[{iconImage:"../static/css/images/sort-asc.png",title:c.gettext("Sort ascending"),command:"sort-asc"},{iconImage:"../static/css/images/sort-desc.png",title:c.gettext("Sort descending"),command:"sort-desc"}]}})}};return d});