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

define(["slick.editors","app/Formatter","app/grid3","app/i18n"],function(b,e,g,a){var f=new g({columns:[{id:"id",name:"id",field:"id",sortable:!0,focusable:!0,editable:!1},{id:"username",name:a.gettext("Account"),field:"username",sortable:!0,focusable:!0,editor:!1},{id:"quota",name:a.gettext("Quota"),formatter:e.quotaFormat,field:"quota",sortable:!1,focusable:!0,editable:!0,editor:b.FileSizeEditor,searchable:!1},{id:"quota_used",name:a.gettext("Quota used"),formatter:e.quotaFormat,field:"quota_used",
sortable:!1,focusable:!0,editable:!1,searchable:!1},{id:"quota_percentage",name:a.gettext("Quota percentage"),field:"quota_percentage",sortable:!1,focusable:!0,editable:!1,searchable:!1},{id:"aliases",name:a.gettext("Number of aliases"),field:"aliases_count",sortable:!1,focusable:!0,editor:!1,searchable:!1},{id:"max aliases",name:a.gettext("Max number of aliases"),field:"max_aliases",sortable:!1,focusable:!0,editable:!0,editor:b.Integer,searchable:!1}],options:{rowHeight:24,editable:!0,autoEdit:!1,
fullWidthRows:!1,enableAddRow:!1,forceFitColumns:!0,multiSelect:!1,multiColumnSort:!0,enableCellNavigation:!0,editCommandHandler:function(a,b,c){c.execute();var d={};d[b.field]=a[b.field];d.id=a.id;$.ajax({url:"/ajax/accounts",context:c,method:"post",error:c.undo,success:function(a){0===$.parseJSON(a).success&&c.undo();$(f).trigger("row-saved",[$.parseJSON(a),this.row])},data:d})}},url:"/ajax/accounts"});return f});