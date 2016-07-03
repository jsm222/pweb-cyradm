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

define(["app/grid4","app/i18n"],function(b,a){return new b({columns:[{id:"id",name:"id",field:"id",sortable:!0,focusable:!0,editable:!1},{id:"alias",name:a.gettext("Alias"),field:"alias",sortable:!0,focusable:!0,editable:!1},{id:"username",name:a.gettext("Account"),field:"dest",sortable:!0,focusable:!0,editable:!1},{id:"userid",name:a.gettext("User id"),field:"user",sortable:!1,focusable:!0,searchable:!1,editable:!1,formatter:function(a,e,c,d,b){return b.user.id}}],options:{rowHeight:24,editable:!0,
autoEdit:!1,fullWidthRows:!1,enableAddRow:!1,forceFitColumns:!0,multiSelect:!1,multiColumnSort:!0,enableCellNavigation:!0,editCommandHandler:function(a,b,c){c.execute();var d={};d[b.field]=a[b.field];d.id=a.id;$.ajax({url:"/ajax/aliases",context:c,method:"post",error:c.undo,data:d})}},url:"/ajax/aliases"})});