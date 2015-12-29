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

define(["slick.editors","app/Gridconfig","app/i18n"],function(e,d,c){function b(a){d.call(this,a);return this}b.prototype=Object.create(d.prototype);b.prototype.getDialogText=function(a){return"Delete alias "+a.alias+" for "+a.dest+"?"};b.prototype.getDeleteText=function(a){return c.gettext("Delete alias?")};b.prototype.getDialogText=function(a){return c.sprintf(c.gettext("Delete alias %s ?"),a.alias)};b.prototype.getErrorHeader=function(){return c.gettext("An error occured")};b.prototype.getSelectorText=
function(a){return void 0==a?c.gettext("Search for an account"):2===a?c.gettext("Search for a domain"):""};return b});