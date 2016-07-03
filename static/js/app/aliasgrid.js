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


define(['app/grid4','app/i18n'], function (grid4,i18n) {
  
    var m4 = new grid4(
   {columns : [
    {id: "id", name: "id", field: "id",sortable:true,focusable:true,editable:false},
    {id: "alias", name: i18n.gettext("Alias"), field:"alias",sortable:true,focusable:true,editable:false},
    {id: "username", name: i18n.gettext("Account"), field:"dest",sortable:true,focusable:true,editable: false},
    {id: "userid", name: i18n.gettext("User id"), field:"user",sortable:false,focusable:true,searchable:false,editable: false,formatter:function(row, cell, value, columnDef, dataContext) {
	return dataContext.user.id;
}}    
  ],
    options : {
    rowHeight: 24,
    editable: true,
    autoEdit:false,
    fullWidthRows:false,	
    enableAddRow: false,
    forceFitColumns:true,
    multiSelect:false,
    multiColumnSort: true,	
    enableCellNavigation: true,
    editCommandHandler:function(item,column,editCommand) {
editCommand.execute();
var data={};
data[column.field]=item[column.field];
data.id=item.id;
$.ajax({url:'/ajax/aliases',
	context:editCommand,
	method:'post',
	error:editCommand.undo,
	data:data});




}},url:'/ajax/aliases'});
	
    return m4;
});
