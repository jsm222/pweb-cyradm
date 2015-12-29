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


define(['slick.editors','app/Formatter','app/grid3','app/i18n'], function (editor,formatter,Grid3,i18n) {
  
    var m3 = new Grid3(
   {columns : [
    {id: "id", name: "id", field: "id",sortable:true,focusable:true,editable:false},
    {id: "username", name: i18n.gettext("Account"), field:"username",sortable:true,focusable:true,editor: false},
    {id: "quota", name: i18n.gettext("Quota"),formatter:formatter.quotaFormat ,field:"quota",sortable:false,focusable:true,editable:true,editor:editor.FileSizeEditor,searchable:false},
    {id: "quota_used", name:  i18n.gettext("Quota used"), formatter:formatter.quotaFormat,field:"quota_used",sortable:false,focusable:true,editable:false,searchable:false},
    {id: "quota_percentage", name:  i18n.gettext("Quota percentage"), field:"quota_percentage",sortable:false,focusable:true,editable: false,searchable:false},
    {id: "aliases", name: i18n.gettext("Number of aliases"), field:"aliases_count",sortable:false,focusable:true,editor: false,searchable:false},
    {id: "max aliases",name: i18n.gettext("Max number of aliases"), field:"max_aliases",sortable:false,focusable:true,editable:true,editor:editor.Integer,searchable:false }
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
$.ajax({url:'/ajax/accounts',
	context:editCommand,
	method:'post',
	error:editCommand.undo,
	success:function(resp) {
	    	if($.parseJSON(resp).success===0) {
	 editCommand.undo();
	} 
	    $(m3).trigger("row-saved",[$.parseJSON(resp),this.row]); },
data:data});




}},url:'/ajax/accounts'});
    return m3;
});
